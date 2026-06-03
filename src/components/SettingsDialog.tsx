import { FaDesktop, FaMoon, FaSun, FaTimes, FaVolumeUp } from "react-icons/fa";
import { ThemePreference } from "../types";

type SettingsDialogProps = {
  open: boolean;
  theme: ThemePreference;
  onThemeChange: (theme: ThemePreference) => void;
  onClose: () => void;
};

export function SettingsDialog({
  open,
  theme,
  onThemeChange,
  onClose,
}: SettingsDialogProps) {
  if (!open) {
    return null;
  }

  function themeButtonClass(value: ThemePreference, extraClass = ""): string {
    return [theme === value ? "active" : "", extraClass].filter(Boolean).join(" ");
  }

  return (
    <div className="modal-backdrop" role="presentation">
      <section
        className="modal-dialog settings-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-dialog-title"
      >
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Close settings"
        >
          <FaTimes aria-hidden="true" />
        </button>

        <h2 id="settings-dialog-title">Settings</h2>

        <div className="settings-section">
          <h3>Appearance</h3>
          <div className="segmented-control" aria-label="Theme">
            <button
              type="button"
              className={themeButtonClass("light", "btn-with-icon")}
              aria-pressed={theme === "light"}
              onClick={() => onThemeChange("light")}
            >
              <FaSun aria-hidden="true" />
              Light
            </button>
            <button
              type="button"
              className={themeButtonClass("dark", "btn-with-icon")}
              aria-pressed={theme === "dark"}
              onClick={() => onThemeChange("dark")}
            >
              <FaMoon aria-hidden="true" />
              Dark
            </button>
            <button
              type="button"
              className={themeButtonClass("system", "btn-with-icon")}
              aria-pressed={theme === "system"}
              onClick={() => onThemeChange("system")}
            >
              <FaDesktop aria-hidden="true" />
              System
            </button>
          </div>
        </div>

        <div className="settings-section">
          <h3>Board style</h3>
          <div className="board-style-grid">
            <button type="button" className="board-style-option active">
              <span className="board-style-swatch board-style-classic" aria-hidden="true">
                <span />
              </span>
              <span>Classic wood</span>
            </button>
            <button type="button" className="board-style-option">
              <span className="board-style-swatch board-style-night" aria-hidden="true">
                <span />
              </span>
              <span>Night wood</span>
            </button>
            <button type="button" className="board-style-option">
              <span className="board-style-swatch board-style-paper" aria-hidden="true">
                <span />
              </span>
              <span>Paper</span>
            </button>
          </div>
        </div>

        <div className="settings-section">
          <h3>Sound</h3>
          <label className="setting-toggle">
            <span className="setting-toggle-copy">
              <span className="btn-with-icon">
                <FaVolumeUp aria-hidden="true" />
                Move sound
              </span>
              <small>Play a short sound when a stone is placed.</small>
            </span>
            <input type="checkbox" defaultChecked />
          </label>
          <label className="volume-control">
            <span>Volume</span>
            <input type="range" min="0" max="100" defaultValue="70" />
          </label>
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
