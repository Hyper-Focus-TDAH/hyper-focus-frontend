import { useState } from 'react';

import { Card, CloseButton } from 'react-bootstrap';

import { t } from '../../i18n/translate';
import TextField from '../core/TextField';
import ColorPicker from './ColorPicker';
import Dialog from '../core/Dialog.jsx';
import OptionsButton from '../core/OptionsButton';

function Note({ id, text, color, onRemove, onChange }) {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const [editingText, setEditingText] = useState(text);

  function handleSave() {
    onChange({
      id: id,
      text: editingText,
      color: selectedColor,
    })
    setShowEditDialog(false);
  }

  function handleDelete() {
    onRemove(id);
  }

  const options = [
    {
      id: 'edit',
      content: 'Edit',
      onClick: () => setShowEditDialog(true),
    },
    {
      id: 'delete',
      content: 'Delete',
      onClick: () => setShowConfirmDeleteDialog(true),
    },
  ];

  return (
    <>
      <Card
        border={color}
        className="m-1"
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

      <Dialog
        show={showEditDialog}
        onHide={() => setShowEditDialog(false)}
        title={t('EDIT_NOTE')}
        cancelLabel={t('CANCEL')}
        onCancel={() => setShowEditDialog(false)}
        confirmLabel={t('SAVE')}
        onConfirm={handleSave}
      >
        <h6>{t('TEXT')}</h6>
        <TextField
          id="text"
          intlKey="TEXT"
          value={editingText}
          onChange={(e) => setEditingText(e.target.value)}
        />
        <h6>{t('PICK_A_COLOR')}</h6>
        <ColorPicker
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
      />
    </>
  );
}

export default Note;
