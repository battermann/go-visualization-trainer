import { FaTimes } from "react-icons/fa";
import { useModalDismiss } from "../hooks/useModalDismiss";

type PrivacyDialogProps = {
  open: boolean;
  onClose: () => void;
};

export function PrivacyDialog({ open, onClose }: PrivacyDialogProps) {
  const { handleBackdropClick } = useModalDismiss(open, onClose);

  if (!open) {
    return null;
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={handleBackdropClick}>
      <section
        className="modal-dialog privacy-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="privacy-dialog-title"
      >
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Close privacy notice"
        >
          <FaTimes aria-hidden="true" />
        </button>

        <h2 id="privacy-dialog-title">Privacy / Datenschutz</h2>

        <div className="privacy-content">
          <p>
            This app is a static GitHub Pages site. It has no account system, no backend,
            no advertising, and no analytics.
          </p>

          <h3>Local data</h3>
          <p>
            Training progress and settings are stored only in your browser via
            localStorage. They are not sent to this app&apos;s developer.
          </p>

          <h3>Hosting</h3>
          <p>
            The site is hosted by GitHub Pages. When you open it, GitHub may process
            technical data such as IP address, browser information, request time, and
            requested files to deliver and secure the site.
          </p>

          <h3>Contact</h3>
          <p>
            Responsible: Leif Battermann. Contact is available through the{" "}
            <a
              href="https://github.com/battermann/go-visualization-trainer"
              target="_blank"
              rel="noreferrer"
            >
              GitHub repository
            </a>
            .
          </p>
        </div>

        <div className="button-row modal-actions">
          <button type="button" className="primary" onClick={onClose}>
            Done
          </button>
        </div>
      </section>
    </div>
  );
}
