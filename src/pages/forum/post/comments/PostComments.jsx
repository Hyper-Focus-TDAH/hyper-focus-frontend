import EmptyState from '../../../../components/EmptyState';
import { t } from '../../../../i18n/translate';
import PostComment from './PostComment';
import styles from './PostComments.module.css';

function PostComments({ post, comments = [], onReply, onUpdate }) {
  return (
    <div className={styles.container}>
      {comments.map((comment) => (
        <PostComment
          key={comment.id}
          post={post}
          comment={comment}
          onReply={onReply}
          onUpdate={onUpdate}
        />
      ))}
      {!comments?.length && <EmptyState message={t('EMPTY_STATE.COMMENTS')} />}
    </div>
  );
}

export default PostComments;
