import { useState } from 'react';

import { Card, CloseButton } from 'react-bootstrap';

import Draggable from 'react-draggable';
import { editNote } from '../../api/notesApi.js';
import OptionsButton from '../../components/buttons/options-button/OptionsButton.jsx';
import Dialog from '../../components/dialog/Dialog.jsx';
import TextField from '../../components/text-field/TextField';
import { t } from '../../i18n/translate';
import styles from './Note.module.css';
import NoteColorPicker from './note-color-picker/NoteColorPicker.jsx';

function Note({ id, boardId, text, color, placement, onRemove, onChange }) {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const [editingText, setEditingText] = useState(text);
  const [position, setPosition] = useState(placement ?? { x: 0, y: 0 });

  function handleSave() {
    onChange({
      id: id,
      text: editingText,
      color: selectedColor,
    });
    setShowEditDialog(false);
  }

  function handleDelete() {
    onRemove(id);
  }

  const options = [
    {
      id: 'edit',
      content: t('EDIT'),
      onClick: () => setShowEditDialog(true),
    },
    {
      id: 'delete',
      content: t('DELETE'),
      onClick: () => setShowConfirmDeleteDialog(true),
    },
  ];

  const handleDrag = async (e, ui) => {
    const x = ui.x;
    const y = ui.y;

    setPosition({ x, y });
  };

  async function updateNote() {
    const body = {
      text: text,
      color: color,
      placement: position,
    };

    await editNote(boardId, id, body);
  }

  return (
    <>
      <Draggable
        bounds="parent"
        onDrag={handleDrag}
        onStop={updateNote}
        defaultPosition={position}
      >
        <Card
          border={color}
          className={`hyper-focus-note ${styles.note}`}
          key={id}
          style={{ minWidth: '150px', maxWidth: '300px' }}
        >
          <Card.Header
            style={{ padding: '10px' }}
            className="d-flex justify-content-between align-items-center"
          >
            <OptionsButton options={options} />
            <CloseButton onClick={() => setShowConfirmDeleteDialog(true)} />
          </Card.Header>
          <Card.Body style={{ padding: '10px' }}>{text}</Card.Body>
        </Card>
      </Draggable>

      <Dialog
        show={showEditDialog}
        onHide={() => setShowEditDialog(false)}
        title={t('EDIT_NOTE')}
        cancelLabel={t('CANCEL')}
        onCancel={() => setShowEditDialog(false)}
        confirmLabel={t('SAVE')}
        onConfirm={handleSave}
        centered
      >
        <h6>{t('TEXT')}</h6>
        <TextField
          id="text"
          intlKey="TEXT"
          value={editingText}
          onChange={(e) => setEditingText(e.target.value)}
        />
        <h6>{t('PICK_A_COLOR')}</h6>
        <NoteColorPicker
          selectedColor={selectedColor}
          onSelectColor={(color) => setSelectedColor(color)}
        />
      </Dialog>

      <Dialog
        show={showConfirmDeleteDialog}
        onHide={() => setShowConfirmDeleteDialog(false)}
        title={t('CONFIRM_DELETE_NOTE')}
        subtitle={t('THIS_ACTION_CANNOT_BE_UNDONE')}
        cancelLabel={t('CANCEL')}
        onCancel={() => setShowConfirmDeleteDialog(false)}
        confirmLabel={t('DELETE')}
        confirmColor="danger"
        onConfirm={handleDelete}
        escDismiss
        centered
      />
    </>
  );
}

export default Note;
