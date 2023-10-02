import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLoaderData } from 'react-router-dom';
import { getPostsAll } from '../../api/postsApi';
import EmptyState from '../../components/empty-state/EmptyState';
import { t } from '../../i18n/translate';
import { formatPosts } from '../../services/postService';
import store from '../../store';
import { auxActions } from '../../store/aux-store/auxStore';
import ForumContainer from './structure/ForumContainer';
import ForumContent from './structure/ForumContent';

function ForumHomePage() {
  const dispatch = useDispatch();
  const postsLoader = useLoaderData();

  const [posts, setPosts] = useState(postsLoader);

  const formattedPosts = formatPosts(posts);

  async function reloadPosts() {
    try {
      dispatch(auxActions.setLoading(true));
      const posts = await loader();
      setPosts(posts);
      setShowPostForm(false);
    } catch (e) {
      console.error(e);
    } finally {
      dispatch(auxActions.setLoading(false));
    }
  }

  return (
    <ForumContainer>
      <h2 className="mt-4 ms-4">{t('HOME')}</h2>
      <ForumContent posts={formattedPosts} reloadPosts={reloadPosts} />
      {!formattedPosts?.length && (
        <EmptyState message={t('EMPTY_STATE.COMMUNITY_HOME')} />
      )}
    </ForumContainer>
  );
}

export default ForumHomePage;

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
