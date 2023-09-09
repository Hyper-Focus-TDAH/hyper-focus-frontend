import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLoaderData } from 'react-router-dom';
import { getPostsAll } from '../../api/postsApi';
import RouteNames from '../../router/RouteNames';
import { formatPosts } from '../../services/postService';
import store from '../../store';
import { auxActions } from '../../store/aux/auxStore';
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
    <ForumContainer initialSelectedPage={RouteNames.FORUM_HOME}>
      <ForumContent posts={formattedPosts} reloadPosts={reloadPosts} />
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
