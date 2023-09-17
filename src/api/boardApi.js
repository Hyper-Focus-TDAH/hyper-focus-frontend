import api from '../utils/api';

async function postBoard(body) {
  const response = await api.post('/api/v1/boards', body);

  return response;
}

async function getBoards() {
  const response = await api.get('/api/v1/boards');

  return response;
}

export { getBoards, postBoard };
