import { useRef, useState } from 'react';

import { Card, CloseButton } from 'react-bootstrap';

import { ContentState, EditorState } from 'draft-js';
import HTMLReactParser from 'html-react-parser';
import htmlToDraft from 'html-to-draftjs';
import Draggable from 'react-draggable';
import { BsPencil } from 'react-icons/bs';
import { patchNote } from '../../../api/notesApi.js';
import IconButton from '../../../components/buttons/icon-button/IconButton.jsx';
import Dialog from '../../../components/dialog/Dialog.jsx';
import TextEditor from '../../../components/text-editor/TextEditor.jsx';
import { t } from '../../../i18n/translate.jsx';
import NoteColorPicker from '../note-color-picker/NoteColorPicker.jsx';
import styles from './Note.module.css';

function Note({ id, boardId, text, color, placement, onRemove, onChange }) {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] = useState(false);
  const [selectedColor, setSelectedColor] = useState(color ?? '');
  const [editingText, setEditingText] = useState(text);
  const [position, setPosition] = useState(placement ?? { x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const [textEditorState, setTextEditorState] = useState(
    EditorState.createWithContent(
      ContentState.createFromBlockArray(htmlToDraft(text))
    )
  );
  const textEditorRef = useRef(null);

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

    await patchNote(boardId, id, body);
  }

  const handleEvent = (event) => {
    if (event.type === 'mousedown') {
      setIsDragging(true);
    } else {
      setIsDragging(false);
    }
  };

  return (
    <>
      <Draggable
        bounds="parent"
        onDrag={handleDrag}
        onStop={updateNote}
        defaultPosition={position}
        handle=".hyper-focus-note-handle"
      >
        <Card
          bg={color}
          className={`hyper-focus-note ${styles.note}`}
          key={id}
          style={{ minWidth: '150px', maxWidth: '300px' }}
        >
          <div onMouseDown={handleEvent} onMouseUp={handleEvent}>
            <Card.Header
              style={{ padding: '10px' }}
              className={`hyper-focus-note-handle ${styles.header}  ${
                isDragging ? styles.grabbing : styles.grab
              }`}
            >
              <IconButton
                icon={<BsPencil />}
                style={{
                  padding: '0',
                }}
                onClick={() => setShowEditDialog(true)}
              />
              <CloseButton onClick={() => setShowConfirmDeleteDialog(true)} />
            </Card.Header>
          </div>
          <Card.Body style={{ padding: '10px' }}>
            {HTMLReactParser(text)}
          </Card.Body>
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
        <TextEditor
          ref={textEditorRef}
          editorState={textEditorState}
          onEditorStateChange={setTextEditorState}
          editorClassName={styles['editor-class']}
          wrapperClassName={styles['wrapper-class']}
          onChange={setEditingText}
          toolbarHidden
        />
        <h6 className="mt-3">{t('PICK_A_COLOR')}</h6>
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
