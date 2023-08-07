import api from '../../utils/api';

async function getPosts() {
  const response = await api.get('api/v1/posts');

  return response;
}

export { getPosts };
