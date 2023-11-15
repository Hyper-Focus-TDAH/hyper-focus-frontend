import { useEffect, useState } from 'react';
import { Card, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { getCommentsByPostId } from '../../../api/commentsApi';
import { getPostById } from '../../../api/postsApi';
import { useT } from '../../../i18n/translate';
import { formatComments } from '../../../services/commentService';
import store from '../../../store';
import { auxActions } from '../../../store/aux-store/auxStore';

import RouteNames from '../../../router/RouteNames';
import { formatPost } from '../../../services/postService';
import { postActions } from '../../../store/misc/postStore';
import ForumPostVote from '../posts/post-vote/ForumPostVote';
import ForumContainer from '../structure/forum-container/ForumContainer';
import styles from './PostPage.module.css';
import Commentator from './commentator/Commentator';
import PostComments from './comments/PostComments';

function PostPage() {
  const t = useT();

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = useSelector((state) => state.user.id);

  const { post: initialPostState, comments: initialCommentsState } =
    useLoaderData();

  const [post, setPost] = useState(initialPostState);
  const [comments, setComments] = useState(initialCommentsState);

  const formattedComments = formatComments(comments);

  const isLoggedUser = post.user.id === userId;

  useEffect(() => {
    return () => {
      dispatch(postActions.reset());
    };
  }, []);

  async function reloadComments() {
    dispatch(auxActions.setLoading(true));
    const comments = await _loadComments(id);
    setComments(comments);
    dispatch(auxActions.setLoading(false));
  }

  async function reloadPost() {
    dispatch(auxActions.setLoading(true));
    const { data: post } = await getPostById(initialPostState.id);
    setPost(formatPost(post));
    dispatch(auxActions.setLoading(false));
  }

  function goToUserProfile(username) {
    navigate(`${RouteNames.PROFILE}/${username}`);
  }

  function goToCommunity(communityName) {
    navigate(`${RouteNames.FORUM}/${communityName}`);
  }

  return (
    <ForumContainer>
      <div className={styles['page-content']}>
        <Container className="container-margin-bottom">
          <Card className={styles.card}>
            <div className={styles.post}>
              <ForumPostVote
                postId={post.id}
                upvotes={post.reaction.like}
                downvotes={post.reaction.dislike}
                onUpdate={async () => await reloadPost()}
              />
              <div className={styles.content}>
                <div
                  className={`${styles.section} ${styles['section-header']}`}
                >
                  {post?.community?.name && (
                    <>
                      <span
                        className="clickable-text me-1"
                        onClick={() => goToCommunity(post.community.name)}
                      >
                        {post.community.name}
                      </span>
                      {` • `}
                    </>
                  )}
                  {t('POSTED_BY')}
                  <span
                    className="clickable-text ms-1"
                    onClick={() => goToUserProfile(post.user.username)}
                  >
                    {post.user.username}
                  </span>
                </div>

                <div className={styles.body}>
                  <span className="h4 mb-2">{post.title}</span>
                  {post.image && (
                    <div className={styles['post-image-container']}>
                      <img className={styles['post-image']} src={post.image} />
                    </div>
                  )}
                  <span className="h6">{post.parsedContent}</span>
                </div>
              </div>
            </div>
            <div className={styles.comments}>
              <Commentator
                post={post}
                onSubmit={async () => await reloadComments()}
              />
              <PostComments
                post={post}
                comments={formattedComments}
                onReply={async () => await reloadComments()}
                onUpdate={async () => await reloadComments()}
              />
            </div>
          </Card>
        </Container>
      </div>
    </ForumContainer>
  );
}

export default PostPage;

export async function loader({ params }) {
  const postId = params.id;

  try {
    store.dispatch(auxActions.setLoading(true));

    const { data: post } = await getPostById(postId);

    const formattedPost = formatPost(post);

    const comments = await _loadComments(post.id);

    const response = {
      post: formattedPost,
      comments: comments,
    };

    return response;
  } catch (e) {
    console.error(e);
  } finally {
    store.dispatch(auxActions.setLoading(false));
  }

  return [];
}

async function _loadComments(postId) {
  try {
    const res = await getCommentsByPostId(postId);
    return res.data;
  } catch (e) {
    if (e.status == 404) {
      return [];
    }
    console.error(`Error while loading comments => ${e}`);
  }
}
