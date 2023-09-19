import { Button, Container } from 'react-bootstrap';

import { useRef, useState } from 'react';

import { useT } from '../../i18n/translate';

import { useDispatch } from 'react-redux';
import { useLoaderData } from 'react-router-dom';
import { getBoards } from '../../api/boardApi';
import { createNote, deleteNote, editNote, getNotes } from '../../api/notesApi';
import Dialog from '../../components/dialog/Dialog';
import EmptyState from '../../components/empty-state/EmptyState';
import QuickCreateInput from '../../components/quick-create-input/QuickCreateInput';
import store from '../../store';
import { auxActions } from '../../store/aux/auxStore';
import styles from './NotesPage.module.css';
import BoardForm from './board-form/BoardForm';
import Board from './board/Board';
import SelectBoard from './select-board/SelectBoard';

function NotesPage() {
  const { notes: notesInitialState, boards: boardsInitialState } =
    useLoaderData();
  const t = useT();
  const dispatch = useDispatch();

  const [noteText, setNoteText] = useState('');
  const [notes, setNotes] = useState(notesInitialState);
  const [boards, setBoards] = useState(boardsInitialState);

  const [selectedBoard, setSelectedBoard] = useState(
    boards?.length ? boards[0] : null
  );
  const selectedNotes =
    notes.filter((note) => note.board.id === selectedBoard?.id) ?? [];

  const [isBoardFormDialogOpen, setIsBoardFormDialogOpen] = useState(false);
  const [editingBoard, setEditingBoard] = useState(null);

  const boardFormRef = useRef(null);

  function handleNoteTextChange(event) {
    setNoteText(event.target.value);
  }

  async function load() {
    try {
      dispatch(auxActions.setLoading(true));
      const response = await getBoards();
      setBoards(response.data);

      if (boards?.length) {
        const isSelectedBoard = !!boards.find(
          (board) => selectedBoard?.id === board.id
        );
        if (!isSelectedBoard) {
          setSelectedBoard(boards[0]);
        }

        const notes = await getAllNotes(boards);

        setNotes(notes);
      } else {
        setSelectedBoard(null);
      }
    } catch (e) {
      console.error(e);
    } finally {
      dispatch(auxActions.setLoading(false));
    }
  }

  async function addNote() {
    if (noteText.length === 0) {
      return;
    }

    try {
      dispatch(auxActions.setLoading(true));

      const { data: newNote } = await createNote(selectedBoard?.id, {
        text: noteText,
        color: 'lightblue',
        placement: { x: 0, y: 0 },
      });

      setNotes((oldNotes) => {
        const newNotes = [newNote, ...oldNotes];
        return newNotes;
      });

      setNoteText('');
    } catch (e) {
      console.error(e);
    } finally {
      dispatch(auxActions.setLoading(false));
    }
  }

  async function removeNote(id) {
    try {
      dispatch(auxActions.setLoading(true));

      await deleteNote(selectedBoard?.id, id);

      setNotes(notes.filter((note) => note.id !== id));
    } catch (e) {
      console.error(e);
    } finally {
      dispatch(auxActions.setLoading(false));
    }
  }

  async function updateNote(newNote) {
    try {
      dispatch(auxActions.setLoading(true));

      await editNote(selectedBoard?.id, newNote.id, {
        text: newNote.text,
        color: newNote.color,
      });

      await load();
    } catch (e) {
      console.error(e);
    } finally {
      dispatch(auxActions.setLoading(false));
    }
  }

  return (
    <Container className={`${styles.container} container-margin-bottom`}>
      <div className={styles.header}>
        <QuickCreateInput
          value={noteText}
          onChange={handleNoteTextChange}
          onEnterPress={async () => await addNote()}
          onClick={addNote}
          placeholder={t('EXAMPLE_ADD_NOTE')}
          disabled={!selectedBoard?.id}
        />
        <Button
          className={styles['create-board-button']}
          onClick={() => setIsBoardFormDialogOpen(true)}
        >
          {t('CREATE_BOARD')}
        </Button>
      </div>
      {!selectedBoard?.id && <EmptyState message={t('EMPTY_STATE.BOARDS')} />}
      {selectedBoard?.id && (
        <div className={styles['board-container']}>
          <Board
            board={selectedBoard}
            notes={selectedNotes}
            removeNote={removeNote}
            updateNote={updateNote}
          />
        </div>
      )}

      <SelectBoard
        boards={boards}
        onSelect={async (board) => {
          setSelectedBoard(board);
          await load();
        }}
        selected={selectedBoard}
        editBoard={(board) => {
          setEditingBoard(board);
          setIsBoardFormDialogOpen(true);
        }}
      />

      <Dialog
        show={isBoardFormDialogOpen}
        onHide={() => setIsBoardFormDialogOpen(false)}
        title={t('CREATE_BOARD')}
        onCancel={() => {
          setIsBoardFormDialogOpen(false);
          setEditingBoard(null);
        }}
        cancelLabel={t('CANCEL')}
        onConfirm={() => {
          boardFormRef.current.handleSubmit();
        }}
        confirmLabel={editingBoard?.id ? t('EDIT') : t('CREATE')}
        onDelete={true}
        size="lg"
        centered
      >
        <BoardForm
          ref={boardFormRef}
          initialState={editingBoard}
          onSubmit={async () => {
            await load();
            setIsBoardFormDialogOpen(false);
            setEditingBoard(null);
          }}
        />
      </Dialog>
    </Container>
  );
}

export default NotesPage;

export async function loader() {
  try {
    store.dispatch(auxActions.setLoading(true));

    let boards;
    let notes;

    try {
      const response = await getBoards();
      boards = response.data;
    } catch (e) {
      boards = [];
    }

    try {
      notes = await getAllNotes(boards);
    } catch (e) {
      console.error(e);
      notes = [];
    }

    return {
      notes: notes,
      boards: boards,
    };
  } catch (e) {
    if (e?.status !== 404) {
      console.error(e);
    }
  } finally {
    store.dispatch(auxActions.setLoading(false));
  }
  return [];
}

async function getAllNotes(boards) {
  let notes = [];
  for (let i = 0; i < boards.length; i++) {
    const board = boards[i];
    const response = await getNotes(board.id);
    const boardNotes = response?.data ?? [];
    notes = [...notes, ...boardNotes];
  }

  return notes;
}
