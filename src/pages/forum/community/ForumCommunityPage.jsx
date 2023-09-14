import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLoaderData, useParams } from 'react-router-dom';
import { getCommunityByName } from '../../../api/communitiesApi';
import { getPostsByCommunityName } from '../../../api/postsApi';
import { formatPosts } from '../../../services/postService';
import store from '../../../store';
import { auxActions } from '../../../store/aux/auxStore';
import ForumContainer from '../structure/ForumContainer';
import ForumContent from '../structure/ForumContent';
import ForumCommunityHeader from './ForumCommunityHeader';

function ForumCommunityPage() {
  const { name } = useParams();

  const dispatch = useDispatch();

  const { community: communityInitialState, posts: postsInitialState } =
    useLoaderData();
  const [posts, setPosts] = useState(postsInitialState);
  const [community, setCommunity] = useState(communityInitialState);

  const formattedPosts = formatPosts(posts);

  useEffect(() => {
    setCommunity(communityInitialState);
    setPosts(postsInitialState);
  }, [name]);

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
      <ForumCommunityHeader
        community={community}
        onUpdateCommunity={(updatedCommunity) =>
          setCommunity({ ...community, ...updatedCommunity })
        }
      />
      <ForumContent
        posts={formattedPosts}
        reloadPosts={reloadPosts}
        communityId={community.id}
      />
    </ForumContainer>
  );
}

export default ForumCommunityPage;

export async function loader({ params }) {
  try {
    store.dispatch(auxActions.setLoading(true));

    const community = (await getCommunityByName(params.name)).data;
    const posts = (await getPostsByCommunityName(params.name)).data;

    return { community: community, posts: posts };
  } catch (e) {
    console.error(e);
  } finally {
    store.dispatch(auxActions.setLoading(false));
  }
  return [];
}
