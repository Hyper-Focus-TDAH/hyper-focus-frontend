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
  hideActions,
  fullscreen,
  style,
}) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      backdrop="static"
      keyboard={escDismiss}
      size={size}
      centered={centered}
      fullscreen={fullscreen}
      style={style}
    >
      <Modal.Header
        closeButton={closeButton}
        className="d-flex flex-column align-items-start"
      >
        <Modal.Title>{title}</Modal.Title>
        {subtitle && <h6>{subtitle}</h6>}
      </Modal.Header>
      {children && <Modal.Body>{children}</Modal.Body>}
      {!hideActions && (
        <Modal.Footer>
          {cancelLabel && (
            <Button variant="outline-secondary" onClick={onCancel}>
              {cancelLabel}
            </Button>
          )}
          {confirmLabel && (
            <Button variant={confirmColor} onClick={onConfirm}>
              {confirmLabel}
            </Button>
          )}
        </Modal.Footer>
      )}
    </Modal>
  );
}

export default Dialog;
