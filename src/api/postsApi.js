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

export { getPostById, getPosts, getPostsAll };
