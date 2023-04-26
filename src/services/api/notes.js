import api from "../../utils/api";

async function getNotes() {
  const response = await api.get('/api/v1/note');
  console.log('getNotes', response);
  return response;
}


async function createNote(body) {
  const response = await api.post('/api/v1/note', body);
  console.log('createNote', response);
  return response;
}


async function editNote(noteId, body) {
  const response = await api.patch(`/api/v1/note/${noteId}`, body);
  console.log('editNote', response);
  return response;
}


async function deleteNote(noteId) {
  const response = await api.patch(`/api/v1/note/${noteId}`);
  console.log('deleteNote', response);
  return response;
}

export {
  getNotes,
  createNote,
  editNote,
  deleteNote,
}