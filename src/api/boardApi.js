import api from '../utils/api';

async function postBoard(body) {
  const response = await api.post('/api/v1/boards', body);

  return response;
}

async function patchBoard(boardId, body) {
  const response = await api.patch(`/api/v1/boards/${boardId}`, body);

  return response;
}

async function getBoards() {
  const response = await api.get('/api/v1/boards');

  return response;
}

async function deleteBoard(boardId) {
  const response = await api.delete(`/api/v1/boards/${boardId}`);

  return response;
}

export { deleteBoard, getBoards, patchBoard, postBoard };
