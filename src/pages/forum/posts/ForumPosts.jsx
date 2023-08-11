import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useNavigate } from 'react-router-dom';
import RouteNames from '../../../router/RouteNames';
import ForumPost from './ForumPost';
import styles from './ForumPosts.module.css';

function ForumPosts({ posts }) {
  const navigate = useNavigate();

  return (
    <div className={styles.posts}>
      {posts.map((post, index) => (
        <ForumPost
          key={index}
          upvotes={0}
          downvotes={0}
          forum="f/forum"
          user={post.userId}
          title={post.title}
          description={post.content}
          onClick={() => {
            navigate(`${RouteNames.POST}/${post.id}`);
          }}
        />
      ))}
    </div>
  );
}

export default ForumPosts;
