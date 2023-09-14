import api from '../utils/api';

async function getTasks() {
  const response = await api.get('/api/v1/tasks');

  return response;
}

async function createTask(body) {
  const response = await api.post('/api/v1/tasks', body);

  return response;
}

async function editTask(taskId, body) {
  const _body = {
    date: body.date,
    description: body.description,
    status: body.status,
    time: body.time,
    title: body.title,
  };

  const response = await api.patch(`/api/v1/tasks/${taskId}`, _body);

  return response;
}

async function deleteTask(taskId) {
  const response = await api.delete(`/api/v1/tasks/${taskId}`);

  return response;
}

export { createTask, deleteTask, editTask, getTasks };
