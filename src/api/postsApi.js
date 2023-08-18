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

async function getPosts() {
  const response = await api.get('api/v1/posts');

  return response;
}

async function postPost(body) {
  const state = store.getState();

  const pictureApi = axios.create({
    baseURL: import.meta.env.VITE_API_KEY,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer ' + state.auth.accessToken,
    },
  });

  const response = await pictureApi.post('api/v1/posts', body);

  return response;
}

async function patchPostReactions(postId, body) {
  const response = await api.patch(`api/v1/posts/reactions/${postId}`, body);

  return response;
}

export { getPostById, getPosts, getPostsAll, patchPostReactions, postPost };
