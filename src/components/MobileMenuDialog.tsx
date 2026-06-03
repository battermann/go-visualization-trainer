import { FaCog, FaHome, FaLayerGroup, FaTimes } from "react-icons/fa";

type MobileMenuDialogProps = {
  open: boolean;
  selectedLevel: number;
  onClose: () => void;
  onHome: () => void;
  onChooseLevel: () => void;
  onOpenSettings: () => void;
};

export function MobileMenuDialog({
  open,
  selectedLevel,
  onClose,
  onHome,
  onChooseLevel,
  onOpenSettings,
}: MobileMenuDialogProps) {
  if (!open) {
    return null;
  }

  function handleHome(): void {
    onClose();
    onHome();
  }

  function handleChooseLevel(): void {
    onClose();
    onChooseLevel();
  }

  function handleSettings(): void {
    onClose();
    onOpenSettings();
  }

  return (
    <div className="modal-backdrop" role="presentation">
      <section
        className="modal-dialog mobile-menu-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-menu-title"
      >
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Close menu"
        >
          <FaTimes aria-hidden="true" />
        </button>

        <h2 id="mobile-menu-title">Menu</h2>

        <div className="mobile-menu-actions">
          <button type="button" className="btn-with-icon" onClick={handleHome}>
            <FaHome aria-hidden="true" />
            Home
          </button>
          <button type="button" className="btn-with-icon" onClick={handleChooseLevel}>
            <FaLayerGroup aria-hidden="true" />
            Level {selectedLevel}
          </button>
          <button type="button" className="btn-with-icon" onClick={handleSettings}>
            <FaCog aria-hidden="true" />
            Settings
          </button>
        </div>
      </section>
    </div>
  );
}
