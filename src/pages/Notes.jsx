import { Card, Form, CloseButton, Button } from "react-bootstrap";

import { useState } from "react";

import { useT } from "../i18n/translate";

import { IconContext } from "react-icons";
import { BsPlus } from "react-icons/bs";

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
      <div className="p-3 d-flex justify-content-between align-items-center">
        <Form.Control
          value={noteText}
          onChange={handleNoteTextChange}
          onKeyDown={handleKeyDown}
          placeholder={t("EXAMPLE_ADD_NOTE")}
        />
        <Button className="d-flex justify-content-center align-items-center ms-2" onClick={addNote}>
          <BsPlus style={{fontSize: '25px'}} />
        </Button>
      </div>
      <div className="d-flex flex-wrap">
        {notes.map((note) => (
          <Card className="m-1 p-2" key={note.id}>
            {note.text}
            <CloseButton onClick={() => removeNote(note.id)} />
          </Card>
        ))}
      </div>
    </>
  );
}

export default Notes;
