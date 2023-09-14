import { getCommunities, getFollowingCommunities } from '../api/communitiesApi';

async function loadCommunities() {
  let userCommunities = [];
  let followedCommunities = [];

  try {
    userCommunities = (await getCommunities()).data;
  } catch (e) {
    console.error(e);
  }

  try {
    followedCommunities = (await getFollowingCommunities()).data;
  } catch (e) {
    console.error(e);
  }

  return [...userCommunities, ...followedCommunities];
}

export { loadCommunities };
