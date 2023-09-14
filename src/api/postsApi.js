import axios from 'axios';
import store from '../store';
import api from '../utils/api';

async function getPostById(postId) {
  const response = await api.get(`api/v1/posts/${postId}`);

  return response;
}

async function getPostsAll() {
  const response = await api.get('api/v1/posts/all');

  return response;
}

async function getFollowingPosts() {
  const response = await api.get('api/v1/posts/following-posts');

  return response;
}

async function getPostsByUsername(username) {
  const response = await api.get(`api/v1/posts/username/${username}`);

  return response;
}

async function getPostsByCommunityName(communityName) {
  const response = await api.get(
    `api/v1/posts/community-name/${communityName}`
  );

  return response;
}

async function getPosts() {
  const response = await api.get('api/v1/posts');

  return response;
}

async function patchPost(postId, body) {
  const state = store.getState();

  const pictureApi = axios.create({
    baseURL: import.meta.env.VITE_API_KEY,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer ' + state.auth.accessToken,
    },
  });

  const response = await pictureApi.patch(`api/v1/posts/${postId}`, body);

  return response;
}

async function postPost(body, communityId) {
  const state = store.getState();

  const pictureApi = axios.create({
    baseURL: import.meta.env.VITE_API_KEY,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer ' + state.auth.accessToken,
    },
  });

  let response;
  if (communityId) {
    response = await pictureApi.post(`api/v1/posts/${communityId}`, body);
  } else {
    response = await pictureApi.post('api/v1/posts', body);
  }

  return response;
}

async function patchPostReactions(postId, body) {
  const response = await api.patch(`api/v1/posts/reactions/${postId}`, body);

  return response;
}

async function deletePost(postId) {
  const response = api.delete(`api/v1/posts/${postId}`);

  return response;
}

export {
  deletePost,
  getFollowingPosts,
  getPostById,
  getPosts,
  getPostsAll,
  getPostsByCommunityName,
  getPostsByUsername,
  patchPost,
  patchPostReactions,
  postPost,
};
