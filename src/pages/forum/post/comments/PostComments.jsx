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
    </div>
  );
}

export default PostComments;
