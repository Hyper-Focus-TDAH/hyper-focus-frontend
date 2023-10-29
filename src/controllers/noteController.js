import { deleteBoard, getBoards } from '../api/boardApi';
import { deleteNote, getNotes, patchNote, postNote } from '../api/notesApi';
import store from '../store';
import { auxActions } from '../store/aux-store/auxStore';

async function loadNotesByBoards(boards) {
  let notes = [];

  for (let i = 0; i < boards.length; i++) {
    try {
      const board = boards[i];
      const response = await getNotes(board.id);
      const boardNotes = response?.data ?? [];
      notes = [...notes, ...boardNotes];
    } catch (e) {
      console.error(e);
    }
  }

  return notes;
}

async function loadBoards() {
  try {
    store.dispatch(auxActions.setLoading(true));

    const response = await getBoards();

    return response.data;
  } catch (e) {
    console.error(e);
  } finally {
    store.dispatch(auxActions.setLoading(false));
  }
}

async function createNote(boardId, note) {
  try {
    store.dispatch(auxActions.setLoading(true));

    const { data: newNote } = await postNote(boardId, note);

    return newNote;
  } catch (e) {
    console.error(e);
  } finally {
    store.dispatch(auxActions.setLoading(false));
  }
}

async function removeNote(boardId, noteId) {
  try {
    store.dispatch(auxActions.setLoading(true));

    const response = await deleteNote(boardId, noteId);

    if (response.status >= 200 && response.status < 300) {
      return true;
    }
    return false;
  } catch (e) {
    console.error(e);
  } finally {
    store.dispatch(auxActions.setLoading(false));
  }
}

async function updateNote(boardId, note) {
  try {
    store.dispatch(auxActions.setLoading(true));

    const response = await patchNote(boardId, note.id, {
      text: note.text,
      color: note.color,
    });

    if (response.status >= 200 && response.status < 300) {
      return true;
    }
    return false;
  } catch (e) {
    console.error(e);
  } finally {
    store.dispatch(auxActions.setLoading(false));
  }
}

async function removeBoard(boardId) {
  try {
    store.dispatch(auxActions.setLoading(true));

    const response = await deleteBoard(boardId);

    if (response.status >= 200 && response.status < 300) {
      return true;
    }
    return false;
  } catch (e) {
    console.error(e);
  } finally {
    store.dispatch(auxActions.setLoading(false));
  }
}

export default {
  createNote,
  removeNote,
  updateNote,
  loadBoards,
  removeBoard,
  loadNotesByBoards,
};
