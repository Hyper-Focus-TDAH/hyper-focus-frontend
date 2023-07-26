import PostComment from './PostComment';
import styles from './PostComments.module.css';

function PostComments({ comments }) {
  return (
    <div className={styles.container}>
      {comments.map((comment, index) => (
        <PostComment key={index} comment={comment} />
      ))}
    </div>
  );
}

export default PostComments;
