import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useNavigate } from 'react-router-dom';
import RouteNames from '../../../router/RouteNames';
import ForumPost from './ForumPost';
import styles from './ForumPosts.module.css';

function ForumPosts({ posts, onUpdate }) {
  const navigate = useNavigate();

  return (
    <div className={styles.posts}>
      {posts.map((post) => (
        <ForumPost
          key={post.id}
          postId={post.id}
          upvotes={post.reaction.like}
          downvotes={post.reaction.dislike}
          forum="f/forum"
          user={post.user}
          title={post.title}
          description={post.parsedContent}
          createdAt={post.created_at}
          onClick={() => {
            navigate(`${RouteNames.POST}/${post.id}`);
          }}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
}

export default ForumPosts;
