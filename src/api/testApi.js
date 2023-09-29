import api from '../utils/api';

async function getTests() {
  const response = await api.get('/api/v1/tests');

  return response;
}

async function postTest(body) {
  const response = await api.post('/api/v1/tests', body);

  return response;
}

export { getTests, postTest };
