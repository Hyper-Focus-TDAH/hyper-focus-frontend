import styles from './ForumPage.module.css';

import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useLoaderData } from 'react-router-dom';
import { useT } from '../../i18n/translate';
import { getPostsAll } from '../../services/api/postsApi';
import store from '../../store';
import { auxActions } from '../../store/auxStore';
import ForumActions from './ForumActions';
import ForumCreatePost from './ForumCreatePost';
import ForumSearch from './ForumSearch';
import ForumPosts from './posts/ForumPosts';

function ForumPage() {
  const postsLoader = useLoaderData();
  const t = useT();

  const [posts, setPosts] = useState(postsLoader);

  return (
    <div className={styles.container}>
      <ForumSearch />
      <div className={styles.content}>
        <Container className="container-margin-bottom">
          <ForumCreatePost />
          <ForumActions />
          <ForumPosts posts={posts} />
        </Container>
      </div>
    </div>
  );
}

export default ForumPage;

export async function loader() {
  try {
    store.dispatch(auxActions.setLoading(true));

    const response = await getPostsAll();

    return response.data;
  } catch (e) {
    console.error(e);
  } finally {
    store.dispatch(auxActions.setLoading(false));
  }
  return [];
}
