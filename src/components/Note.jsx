import { useState } from 'react';

import { Card, CloseButton } from 'react-bootstrap';

import { t } from '../i18n/translate';

import CInput from './core/CInput';
import CColorPicker from './core/CColorPicker.jsx';
import CModal from './core/CModal.jsx';
import COptionsButton from './core/COptionsButton.jsx';

function Note({ id, text, color, onRemove, onChangeText, onChangeColor }) {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const [editingText, setEditingText] = useState(text);

  function handleSave() {
    onChangeColor(id, selectedColor);
    onChangeText(id, editingText);
    setShowEditDialog(false);
  }

  function handleDelete() {
    onRemove(id)
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
    // {
    //   id: "teste1",
    //   content: "teste1",
    //   options: [
    //     {
    //       id: "teste2",
    //       content: "teste2",
    //       options: [{ id: "teste3", content: "teste3", options: [
    //         { id: "teste3.1", content: "teste3.1" },
    //         { id: "teste3.2", content: "teste3.2" },
    //         { id: "teste3.3", content: "teste3.3" },
    //       ] }],
    //     },
    //   ],
    // },
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
          <COptionsButton options={options} />
          <CloseButton onClick={() => setShowConfirmDeleteDialog(true)} />
        </Card.Header>
        <Card.Body style={{ padding: '10px' }}>{text}</Card.Body>
      </Card>

      <CModal
        show={showEditDialog}
        onHide={() => setShowEditDialog(false)}
        title={t('EDIT_NOTE')}
        cancelLabel={t('CANCEL')}
        onCancel={() => setShowEditDialog(false)}
        confirmLabel={t('SAVE')}
        onConfirm={handleSave}
      >
        <h6>{t('TEXT')}</h6>
        <CInput
          id="text"
          intlKey="TEXT"
          value={editingText}
          onChange={(e) => setEditingText(e.target.value)}
        />
        <h6>{t('PICK_A_COLOR')}</h6>
        <CColorPicker
          selectedColor={selectedColor}
          onSelectColor={(color) => setSelectedColor(color)}
        />
      </CModal>

      <CModal
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
