import api from '../../utils/api';

async function getCommentsByPostId(postId) {
  const response = await api.get(`api/v1/comments/${postId}`);

  return response;
}

async function getCommentsAll() {
  const response = await api.get('api/v1/comments/all');

  return response;
}

async function postComment(postId, parentCommentId, body) {
  let request = `/api/v1/comments/${postId}`;

  if (parentCommentId) {
    request += `/${parentCommentId}`;
  }

  const response = await api.post(request, body);

  return response;
}

export { getCommentsAll, getCommentsByPostId, postComment };
