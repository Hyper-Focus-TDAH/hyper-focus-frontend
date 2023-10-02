import styles from './ForumContent.module.css';

import { useState } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getPosts } from '../../../api/postsApi';
import { useT } from '../../../i18n/translate';
import RouteNames from '../../../router/RouteNames';
import store from '../../../store';
import { auxActions } from '../../../store/aux-store/auxStore';
import PostForm from '../post/post-form/PostForm';
import ForumPosts from '../posts/ForumPosts';

function ForumContent({
  posts,
  reloadPosts,
  initialSelectedPage,
  communityId,
}) {
  const t = useT();

  const [showPostForm, setShowPostForm] = useState(false);

  const navigate = useNavigate();

  return (
    <div className={styles.container}>
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
            <Card styles={{ margin: '10px' }}>
              <Card.Body>
                <PostForm
                  communityId={communityId}
                  onSubmit={async (response) => {
                    const postId = response.data.id;
                    if (postId) {
                      navigate(`${RouteNames.POST}/${postId}`);
                    } else {
                      if (reloadPosts) {
                        await reloadPosts();
                      }
                      setShowPostForm(false);
                    }
                  }}
                  onCancel={() => setShowPostForm(false)}
                />
              </Card.Body>
            </Card>
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

export default ForumContent;

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
