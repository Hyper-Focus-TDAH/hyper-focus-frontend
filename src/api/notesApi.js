import api from '../utils/api';

async function getNotes(boardId) {
  const response = await api.get(`/api/v1/notes/${boardId}`);

  return response;
}

async function createNote(boardId, body) {
  const response = await api.post(`/api/v1/notes/${boardId}`, body);

  return response;
}

async function editNote(boardId, noteId, body) {
  const response = await api.patch(`/api/v1/notes/${boardId}/${noteId}`, body);

  return response;
}

async function deleteNote(boardId, noteId) {
  const response = await api.delete(`/api/v1/notes/${boardId}/${noteId}`);

  return response;
}

export { createNote, deleteNote, editNote, getNotes };
