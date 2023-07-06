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
          post={post}
          onClick={() => {
            navigate(RouteNames.POST);
          }}
        />
      ))}
    </div>
  );
}

export default ForumPosts;
