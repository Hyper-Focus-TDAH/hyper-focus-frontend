import React from 'react';
import { Modal } from 'react-bootstrap';
import { BsPencil, BsTrash3 } from 'react-icons/bs';
import IconButton from '../../components/buttons/icon-button/IconButton';
import { t } from '../../i18n/translate';

function ViewTaskDialog({ task, isShow, onClose, onEdit, onDelete }) {
  return (
    <Modal
      show={isShow}
      onHide={onClose}
      dialogClassName="modal-90w"
      aria-labelledby="example-custom-modal-styling-title"
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-custom-modal-styling-title">
          {task?.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {task?.description && (
          <p className="mb-1">
            <b>{t('DESCRIPTION')}: </b>
            <span>{task?.description}</span>
          </p>
        )}
        {task?.date?.start && (
          <p className="mb-1">
            <b>{t('START_DATE')}: </b>
            <span>
              {task?.date?.start} {task?.time?.start}
            </span>
          </p>
        )}
        {task?.date?.end && (
          <p className="mb-1">
            <b>{t('END_DATE')}: </b>
            <span>
              {task?.date?.end} {task?.time?.end}
            </span>
          </p>
        )}
        {task?.status && (
          <p className="mb-1">
            <b>{t('STATUS')}: </b>
            <span>{task?.status}</span>
          </p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <IconButton
          icon={<BsPencil />}
          style={{ fontSize: '20px', padding: '6px', marginLeft: '12px' }}
          onClick={() => onEdit(task)}
        />
        <IconButton
          icon={<BsTrash3 />}
          style={{ fontSize: '20px', padding: '6px', marginLeft: '4px' }}
          onClick={() => onDelete(task)}
        />
      </Modal.Footer>
    </Modal>
  );
}

export default ViewTaskDialog;
