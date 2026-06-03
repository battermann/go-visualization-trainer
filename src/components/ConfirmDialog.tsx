import { FaTimes } from "react-icons/fa";
import { useModalDismiss } from "../hooks/useModalDismiss";

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const { handleBackdropClick } = useModalDismiss(open, onCancel);

  if (!open) {
    return null;
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={handleBackdropClick}>
      <section
        className="modal-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
      >
        <button
          type="button"
          className="modal-close"
          onClick={onCancel}
          aria-label="Close dialog"
        >
          <FaTimes aria-hidden="true" />
        </button>
        <h2 id="confirm-dialog-title">{title}</h2>
        <p>{message}</p>
        <div className="button-row modal-actions">
          <button type="button" onClick={onCancel}>
            {cancelLabel}
          </button>
          <button type="button" className="primary" onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </section>
    </div>
  );
}
