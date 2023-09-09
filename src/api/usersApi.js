import axios from 'axios';
import store from '../store';
import api from '../utils/api';

async function getUserData() {
  const response = await api.get('api/v1/users');

  return response;
}

async function updateUserData(body) {
  const response = await api.patch('api/v1/users', body);
  return response;
}

async function updatePasswordByToken(body) {
  const response = await api.put('api/v1/users/password-recovery', body);

  return response;
}

async function getUserById(userId) {
  const response = await api.get(`api/v1/users/${userId}`);

  return response;
}

async function getUserByUsername(username) {
  const response = await api.get(`api/v1/users/username/${username}`);

  return response;
}

async function followCommunityByCommunityId(communityId) {
  const response = await api.patch(
    `/api/v1/users/follow/community/${communityId}`
  );

  return response;
}

async function followUserById(userId) {
  const response = await api.patch(`api/v1/users/follow/user/${userId}`);

  return response;
}

async function updateProfileImage(body) {
  const state = store.getState();

  const pictureApi = axios.create({
    baseURL: import.meta.env.VITE_API_KEY,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer ' + state.auth.accessToken,
    },
  });

  const response = await pictureApi.patch('api/v1/users', body);

  return response;
}

export {
  followCommunityByCommunityId,
  followUserById,
  getUserById,
  getUserByUsername,
  getUserData,
  updatePasswordByToken,
  updateProfileImage,
  updateUserData,
};
