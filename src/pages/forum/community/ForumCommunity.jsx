import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLoaderData, useParams } from 'react-router-dom';
import { getCommunityByName } from '../../../api/communitiesApi';
import RouteNames from '../../../router/RouteNames';
import store from '../../../store';
import { auxActions } from '../../../store/aux/auxStore';
import ForumPage from '../ForumPage';

function ForumCommunity() {
  const dispatch = useDispatch();
  const community = useLoaderData();
  const { name } = useParams();

  const [showPostForm, setShowPostForm] = useState(false);

  const formattedPosts = []; //formatPosts(posts);

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
    <ForumPage
      posts={formattedPosts}
      reloadPosts={reloadPosts}
      initialSelectedPage={`${RouteNames.FORUM}/${community.name}`}
    />
  );
}

export default ForumCommunity;

export async function loader({ params }) {
  try {
    store.dispatch(auxActions.setLoading(true));

    const response = await getCommunityByName(params.name);

    return response.data;
  } catch (e) {
    console.error(e);
  } finally {
    store.dispatch(auxActions.setLoading(false));
  }
  return [];
}
