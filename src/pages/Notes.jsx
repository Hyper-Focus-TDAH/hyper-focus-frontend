import { Card, Form } from "react-bootstrap";

import { useState } from "react";

import { t } from "../i18n/translate";

function Notes() {
  const [noteText, setNoteText] = useState("");
  const [notes, setNotes] = useState([]);

  function handleNoteTextChange(event) {
    setNoteText(event.target.value);
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      const newNote = { id: Math.random().toString(), text: noteText };
      setNoteText("");
      setNotes((oldNotes) => {
        return [newNote, ...oldNotes];
      });
    }
  };

  return (
    <>
      <p>{t("NOTES")}</p>
      <Form.Control
        value={noteText}
        onChange={handleNoteTextChange}
        onKeyDown={handleKeyDown}
      />
      <div className="d-flex flex-wrap">
        {notes.map((note) => (
          <Card className='m-1 p-2' key={note.id}>{note.text}</Card>
        ))}
      </div>
    </>
  );
}

export default Notes;
