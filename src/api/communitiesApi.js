import api from '../utils/api';

async function getCommunities() {
  const response = await api.get('/api/v1/communities');

  return response;
}

async function getFollowingCommunities() {
  const response = await api.get('/api/v1/communities/following-communities');

  return response;
}

async function postCommunity(body) {
  const response = await api.post('/api/v1/communities', body);

  return response;
}

async function patchCommunity(communityId, body) {
  const response = await api.patch(`/api/v1/communities/${communityId}`, body);

  return response;
}

async function deleteCommunity(communityId) {
  const response = await api.delete(`/api/v1/communities/${communityId}`);

  return response;
}

async function getCommunityByName(communityName) {
  const response = await api.get(
    `/api/v1/communities/community/${communityName}`
  );

  return response;
}

export {
  deleteCommunity,
  getCommunities,
  getCommunityByName,
  getFollowingCommunities,
  patchCommunity,
  postCommunity,
};
