import PostComment from './PostComment';
import styles from './PostComments.module.css';

function PostComments({ post, comments = [], onReply }) {
  return (
    <div className={styles.container}>
      {comments.map((comment, index) => (
        <PostComment
          key={comment.id}
          post={post}
          comment={comment}
          onReply={onReply}
        />
      ))}
    </div>
  );
}

export default PostComments;
