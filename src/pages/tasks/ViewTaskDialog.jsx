import React from 'react';
import { Modal } from 'react-bootstrap';
import { t } from '../../i18n/translate';

function ViewTaskDialog({ task, isShow, onClose }) {
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
            <span>{task?.status ? 'To Do' : 'Done'}</span>
          </p>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default ViewTaskDialog;
