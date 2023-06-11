import { Button, Modal } from 'react-bootstrap';

function Dialog({
  children,
  show,
  onHide,
  title,
  subtitle,
  closeButton,
  cancelLabel,
  onCancel,
  confirmLabel,
  onConfirm,
  confirmColor = 'primary',
  escDismiss,
  size,
  centered,
}) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      backdrop="static"
      keyboard={escDismiss}
      size={size}
      centered={centered}
    >
      <Modal.Header
        closeButton={closeButton}
        className="d-flex flex-column align-items-start"
      >
        <Modal.Title>{title}</Modal.Title>
        <h6>{subtitle}</h6>
      </Modal.Header>
      {children && <Modal.Body>{children}</Modal.Body>}
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onCancel}>
          {cancelLabel}
        </Button>
        <Button variant={confirmColor} onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Dialog;
