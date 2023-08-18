import { useEffect, useState } from 'react';
import { Card, Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useLoaderData, useParams } from 'react-router-dom';
import { getCommentsByPostId } from '../../../api/commentsApi';
import { getPostById } from '../../../api/postsApi';
import { useT } from '../../../i18n/translate';
import { formatComments } from '../../../services/commentService';
import store from '../../../store';
import { auxActions } from '../../../store/aux/auxStore';
import ForumSearch from '../ForumSearch';
import ForumPostActions from '../posts/ForumPostActions';
import ForumPostVote from '../posts/ForumPostVote';

import { postActions } from '../../../store/misc/postStore';
import Commentator from './Commentator';
import styles from './PostPage.module.css';
import PostComments from './comments/PostComments';

function PostPage() {
  const t = useT();

  const { id } = useParams();
  const dispatch = useDispatch();

  const { post: initialPostState, comments: initialCommentsState } =
    useLoaderData();

  const [post, setPost] = useState(initialPostState);
  const [comments, setComments] = useState(initialCommentsState);

  const formattedComments = formatComments(comments);

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
    setPost(post);
    dispatch(auxActions.setLoading(false));
  }

  return (
    <div className={styles.container}>
      <ForumSearch />
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
                <div className={styles.section}>
                  {post.forum ?? 'f/forum'} • {t('POSTED_BY')}{' '}
                  {post.user.username}
                </div>
                <div className={styles.body}>
                  <span className="h4 mb-0">{post.title}</span>
                  <span className="h6">{post.content}</span>
                </div>
                <div className={styles.section}>
                  <ForumPostActions numComments={+comments.length} />
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
    </div>
  );
}

export default PostPage;

export async function loader({ params }) {
  const postId = params.id;

  try {
    store.dispatch(auxActions.setLoading(true));

    const { data: post } = await getPostById(postId);

    const comments = await _loadComments(post.id);

    const response = {
      post: post,
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
