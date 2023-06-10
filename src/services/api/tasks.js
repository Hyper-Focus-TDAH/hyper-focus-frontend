import api from '../../utils/api';

async function getTasks() {
  const response = await api.get('/api/v1/task');

  return response;
}

async function createTask(body) {
  console.log('creating task', body);
  const response = await api.post('/api/v1/task', body);

  return response;
}

async function editTask(taskId, body) {
  const response = await api.patch(`/api/v1/task/${taskId}`, body);

  return response;
}

async function deleteTask(taskId) {
  const response = await api.delete(`/api/v1/task/${taskId}`);

  return response;
}

export { createTask, deleteTask, editTask, getTasks };
