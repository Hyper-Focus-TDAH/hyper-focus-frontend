import { Form, Button } from "react-bootstrap";

import { useState } from "react";

import { useT } from "../i18n/translate";

import { BsPlus } from "react-icons/bs";

import Note from "../components/Note";

function Notes() {
  const t = useT();

  const [noteText, setNoteText] = useState("");
  const [notes, setNotes] = useState([]);

  function handleNoteTextChange(event) {
    setNoteText(event.target.value);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      addNote();
    }
  }

  function addNote() {
    if (noteText.length === 0) {
      return;
    }

    const newNote = { id: Math.random().toString(), text: noteText };

    setNotes((oldNotes) => {
      const newNotes = [newNote, ...oldNotes];
      return newNotes;
    });

    setNoteText("");
  }

  function removeNote(id) {
    setNotes(notes.filter((note) => note.id !== id));
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center m-1 py-3 ">
        <Form.Control
          value={noteText}
          onChange={handleNoteTextChange}
          onKeyDown={handleKeyDown}
          placeholder={t("EXAMPLE_ADD_NOTE")}
        />
        <Button
          className="d-flex justify-content-center align-items-center ms-2"
          onClick={addNote}
        >
          <BsPlus style={{ fontSize: "25px" }} />
        </Button>
      </div>
      <div className="d-flex flex-wrap justify-content-start align-items-start">
        {notes.map((note) => (
          <Note
            key={note.id}
            id={note.id}
            text={note.text}
            color="lightblue"
            remove={removeNote}
          />
        ))}
      </div>
    </>
  );
}

export default Notes;
