import api from '../utils/api';

async function postCommunity(body) {
  const response = await api.post('/api/v1/communities', body);

  return response;
}

async function putCommunity(body) {
  const response = await api.put('/api/v1/communities', body);

  return response;
}

async function getCommunityByName(communityName) {
  const response = await api.get(
    `/api/v1/communities/community/${communityName}`
  );

  return response;
}

export { getCommunityByName, postCommunity, putCommunity };
