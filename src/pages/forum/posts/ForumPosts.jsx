import ForumPost from './ForumPost';
import styles from './ForumPosts.module.css';

function ForumPosts({ posts }) {
  return (
    <div className={styles.posts}>
      {posts.map((post, index) => (
        <ForumPost key={index} post={post} />
      ))}
    </div>
  );
}

export default ForumPosts;
