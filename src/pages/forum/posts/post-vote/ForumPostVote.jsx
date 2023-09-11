import {
  BiDownvote,
  BiSolidDownvote,
  BiSolidUpvote,
  BiUpvote,
} from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { patchCommentReactions } from '../../../../api/commentsApi';
import { patchPostReactions } from '../../../../api/postsApi';
import IconButton from '../../../../components/buttons/IconButton';
import store from '../../../../store';
import { auxActions } from '../../../../store/aux/auxStore';
import styles from './ForumPostVote.module.css';

function ForumPostVote({
  postId,
  commentId,
  upvotes,
  downvotes,
  className,
  onUpdate,
}) {
  const { id: userId } = store.getState().user;

  const isUpvoted = upvotes.includes(userId);
  const isDownvoted = downvotes.includes(userId);

  const dispatch = useDispatch();

  async function handleUpvote() {
    try {
      dispatch(auxActions.setLoading(true));
      const body = {
        value: true,
      };
      if (commentId) {
        await patchCommentReactions(postId, commentId, body);
      } else {
        await patchPostReactions(postId, body);
      }
      await update();
    } catch (e) {
      console.error(e);
    } finally {
      dispatch(auxActions.setLoading(false));
    }
  }

  async function update() {
    if (onUpdate) {
      await onUpdate();
    }
  }

  async function handleDownvote() {
    try {
      dispatch(auxActions.setLoading(true));
      const body = {
        value: false,
      };
      if (commentId) {
        await patchCommentReactions(postId, commentId, body);
      } else {
        await patchPostReactions(postId, body);
      }
      await update();
    } catch (e) {
      console.error(e);
    } finally {
      dispatch(auxActions.setLoading(false));
    }
  }

  return (
    <div
      className={`${styles.vote} ${className}`}
      style={{ flexDirection: commentId ? 'row' : 'column' }}
    >
      <IconButton
        style={{ fontSize: '22px', padding: '0px' }}
        icon={isUpvoted ? <BiSolidUpvote /> : <BiUpvote />}
        onClick={handleUpvote}
      />
      {upvotes.length - downvotes.length}
      <IconButton
        style={{ fontSize: '22px', padding: '0px' }}
        icon={isDownvoted ? <BiSolidDownvote /> : <BiDownvote />}
        onClick={handleDownvote}
      />
    </div>
  );
}

export default ForumPostVote;
