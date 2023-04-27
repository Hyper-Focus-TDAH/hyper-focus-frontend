import { Form, Button } from 'react-bootstrap';

import { useState } from 'react';

import { useT } from '../i18n/translate';

import { BsPlus } from 'react-icons/bs';

import Note from '../components/notes/Note';

import { useLoaderData } from 'react-router-dom';
import {
  createNote,
  getNotes,
  deleteNote,
  editNote,
} from '../services/api/notes';

function Notes() {
  const notesLoader = useLoaderData();
  const t = useT();

  const [noteText, setNoteText] = useState('');
  const [notes, setNotes] = useState(notesLoader);

  function handleNoteTextChange(event) {
    setNoteText(event.target.value);
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      addNote();
    }
  }

  async function addNote() {
    if (noteText.length === 0) {
      return;
    }

    try {
      const { data: newNote } = await createNote({
        text: noteText,
        color: 'lightblue',
      });

      setNotes((oldNotes) => {
        const newNotes = [newNote, ...oldNotes];
        return newNotes;
      });

      setNoteText('');
    } catch (e) {
      console.error(e);
    }
  }

  async function removeNote(id) {
    try {
      await deleteNote(id);

      setNotes(notes.filter((note) => note.id !== id));
    } catch (e) {
      console.error(e);
    }
  }

  async function updateNote(newNote) {
    await editNote(newNote.id, {
      text: newNote.text,
      color: newNote.color,
    });

    setNotes((oldNotes) => {
      const newNotes = [...oldNotes];
      const indexOfNote = newNotes.map((note) => note.id).indexOf(newNote.id);
      newNotes[indexOfNote] = newNote;
      return newNotes;
    });
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center m-1 py-3 ">
        <Form.Control
          value={noteText}
          onChange={handleNoteTextChange}
          onKeyDown={handleKeyDown}
          placeholder={t('EXAMPLE_ADD_NOTE')}
        />
        <Button
          className="d-flex justify-content-center align-items-center ms-2"
          onClick={addNote}
        >
          <BsPlus style={{ fontSize: '25px' }} />
        </Button>
      </div>
      <div className="d-flex flex-wrap justify-content-start align-items-start">
        {notes.map((note) => (
          <Note
            key={note.id}
            id={note.id}
            text={note.text}
            color={note.color}
            onRemove={removeNote}
            onChange={updateNote}
          />
        ))}
      </div>
    </>
  );
}

export default Notes;

export async function loader() {
  try {
    const response = await getNotes();
    return response.data;
  } catch (e) {
    console.error('error', e);
  }
  return [];
}
