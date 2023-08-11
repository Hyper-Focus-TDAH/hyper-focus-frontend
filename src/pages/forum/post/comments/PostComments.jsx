import PostComment from './PostComment';
import styles from './PostComments.module.css';

function PostComments({ post, comments }) {
  return (
    <div className={styles.container}>
      {comments.map((comment, index) => (
        <PostComment key={index} post={post} comment={comment} />
      ))}
    </div>
  );
}

export default PostComments;
