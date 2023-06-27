import api from '../../utils/api';

async function getNotes() {
  const response = await api.get('/api/v1/notes');

  return response;
}

async function createNote(body) {
  const response = await api.post('/api/v1/notes', body);

  return response;
}

async function editNote(noteId, body) {
  const response = await api.patch(`/api/v1/notes/${noteId}`, body);

  return response;
}

async function deleteNote(noteId) {
  const response = await api.delete(`/api/v1/notes/${noteId}`);

  return response;
}

export { createNote, deleteNote, editNote, getNotes };
