import styles from './ForumPage.module.css';

import { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { getPosts } from '../../api/postsApi';
import { useT } from '../../i18n/translate';
import store from '../../store';
import { auxActions } from '../../store/aux/auxStore';
import ForumHeader from './forum-header/ForumHeader';
import PostForm from './post-form/PostForm';
import ForumPosts from './posts/ForumPosts';

function ForumPage({ posts, reloadPosts, initialSelectedPage }) {
  const t = useT();

  const [showPostForm, setShowPostForm] = useState(false);

  return (
    <div className={styles.container}>
      <ForumHeader initialSelectedPage={initialSelectedPage} />
      <div className={styles.content}>
        <Container className="container-margin-bottom">
          {!showPostForm && (
            <div className={styles['create-post']}>
              <Button
                className={styles['create-post-button']}
                onClick={() => setShowPostForm(true)}
              >
                {t('CREATE_POST')}
              </Button>
            </div>
          )}
          {showPostForm && (
            <PostForm
              onSubmit={async () => {
                if (reloadPosts) {
                  await reloadPosts();
                }
              }}
              onCancel={() => setShowPostForm(false)}
            />
          )}
          <ForumPosts
            posts={posts}
            onUpdate={async () => {
              if (reloadPosts) {
                await reloadPosts();
              }
            }}
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
