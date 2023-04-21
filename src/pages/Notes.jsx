import { Form, Button } from 'react-bootstrap';

import { useState } from 'react';

import { useT } from '../i18n/translate';

import { BsPlus } from 'react-icons/bs';

import Note from '../components/notes/Note';

function Notes() {
  const t = useT();

  const [noteText, setNoteText] = useState('');
  const [notes, setNotes] = useState([]);

  function handleNoteTextChange(event) {
    setNoteText(event.target.value);
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      addNote();
    }
  }

  function addNote() {
    if (noteText.length === 0) {
      return;
    }

    const newNote = {
      id: Math.random().toString(),
      text: noteText,
      color: 'lightblue',
    };

    setNotes((oldNotes) => {
      const newNotes = [newNote, ...oldNotes];
      return newNotes;
    });

    setNoteText('');
  }

  function removeNote(id) {
    setNotes(notes.filter((note) => note.id !== id));
  }

  function changeNoteText(id, text) {
    const note = notes.find((note) => note.id === id);
    note.text = text;;
    setNotes((oldNotes) => {
      const newNotes = [...oldNotes];
      const indexOfNote = newNotes.map((note) => note.id).indexOf(id);
      newNotes[indexOfNote] = note;
      return newNotes;
    });
  }

  function changeNoteColor(id, color) {
    const note = notes.find((note) => note.id === id);
    note.color = color;
    setNotes((oldNotes) => {
      const newNotes = [...oldNotes];
      const indexOfNote = newNotes.map((note) => note.id).indexOf(id);
      newNotes[indexOfNote] = note;
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
            onChangeText={changeNoteText}
            onChangeColor={changeNoteColor}
          />
        ))}
      </div>
    </>
  );
}

export default Notes;
