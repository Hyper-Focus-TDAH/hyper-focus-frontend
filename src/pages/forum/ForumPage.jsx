import styles from './ForumPage.module.css';

import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useLoaderData } from 'react-router-dom';
import { getPosts } from '../../api/postsApi';
import { useT } from '../../i18n/translate';
import { formatPosts } from '../../services/postService';
import store from '../../store';
import { auxActions } from '../../store/auxStore';
import ForumActions from './ForumActions';
import ForumCreatePost from './ForumCreatePost';
import ForumSearch from './ForumSearch';
import ForumPosts from './posts/ForumPosts';

function ForumPage() {
  const postsLoader = useLoaderData();
  const t = useT();

  const dispatch = useDispatch();

  const [posts, setPosts] = useState(postsLoader);

  const formattedPosts = formatPosts(posts);

  async function reloadPosts() {
    try {
      dispatch(auxActions.setLoading(true));
      const response = await getPosts();
      setPosts(formatPosts(response.data));
    } catch (e) {
      console.error(e);
    } finally {
      dispatch(auxActions.setLoading(false));
    }
  }

  return (
    <div className={styles.container}>
      <ForumSearch />
      <div className={styles.content}>
        <Container className="container-margin-bottom">
          <ForumCreatePost />
          <ForumActions />
          <ForumPosts
            posts={formattedPosts}
            onUpdate={async () => await reloadPosts()}
          />
        </Container>
      </div>
    </div>
  );
}

export default ForumPage;

export async function loader() {
  try {
    store.dispatch(auxActions.setLoading(true));

    const response = await getPosts();

    return response.data;
  } catch (e) {
    console.error(e);
  } finally {
    store.dispatch(auxActions.setLoading(false));
  }
  return [];
}
