import { Card, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useLoaderData, useParams } from 'react-router-dom';
import { useT } from '../../../i18n/translate';
import { getCommentsByPostId } from '../../../services/api/commentsApi';
import { getPostById } from '../../../services/api/postsApi';
import store from '../../../store';
import { auxActions } from '../../../store/auxStore';
import ForumSearch from '../ForumSearch';
import ForumPostActions from '../posts/ForumPostActions';
import ForumPostVote from '../posts/ForumPostVote';
import Commentator from './Commentator';
import styles from './PostPage.module.css';
import PostComments from './comments/PostComments';

function PostPage() {
  const t = useT();
  const userData = useSelector((state) => state.user);

  const { post, comments } = useLoaderData();

  // const { comments, setComments } = useState(commentsInitialState);

  const { id } = useParams();

  // async function reloadComments() {
  //   setComments(await getComments(id));
  // }

  return (
    <div className={styles.container}>
      <ForumSearch />
      <div className={styles['page-content']}>
        <Container className="container-margin-bottom">
          <Card className={styles.card}>
            <div className={styles.post}>
              <ForumPostVote
                upvotes={+post.reaction?.like?.length}
                downvotes={+post.reaction?.deslike?.length}
              />
              <div className={styles.content}>
                <div className={styles.section}>
                  {post.forum} • {t('POSTED_BY')} {post.user}
                </div>
                <div className={styles.body}>
                  <span className="h4 mb-0">{post.title}</span>
                  <span className="h6">{post.content}</span>
                </div>
                <div className={styles.section}>
                  <ForumPostActions />
                </div>
              </div>
            </div>
            <div className={styles.comments}>
              <Commentator post={post} />
              <PostComments post={post} comments={comments} />
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

    const comments = await getComments(postId);

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

async function getComments(postId) {
  let comments;

  try {
    const res = await getCommentsByPostId(postId);
    comments = res.data;
  } catch (e) {
    if (e.status == 404) {
      comments = [];
    }
  }

  return _remmapComments(comments);
}

function _remmapComments(comments) {
  const _comments = [];
  for (let i = 0; i < comments.length; i++) {
    const comment = comments[i];
    comment.comments = [];
    if (comment.parentCommentId) {
      const index = _comments.findIndex(
        (c) => c.id === comment.parentCommentId
      );
      _comments[index].comments.push(comment);
    } else {
      _comments.push(comment);
    }
  }
  return _comments;
}
