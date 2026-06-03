import { FaDesktop, FaMoon, FaSun, FaTimes, FaVolumeUp } from "react-icons/fa";
import { GoBoard } from "./GoBoard";
import { playStoneClickWithSettings } from "../logic/sound";
import { BoardStylePreference, ThemePreference } from "../types";

type SettingsDialogProps = {
  open: boolean;
  theme: ThemePreference;
  soundEnabled: boolean;
  soundVolume: number;
  boardStyle: BoardStylePreference;
  onThemeChange: (theme: ThemePreference) => void;
  onSoundEnabledChange: (enabled: boolean) => void;
  onSoundVolumeChange: (volume: number) => void;
  onBoardStyleChange: (style: BoardStylePreference) => void;
  onClose: () => void;
};

export function SettingsDialog({
  open,
  theme,
  soundEnabled,
  soundVolume,
  boardStyle,
  onThemeChange,
  onSoundEnabledChange,
  onSoundVolumeChange,
  onBoardStyleChange,
  onClose,
}: SettingsDialogProps) {
  if (!open) {
    return null;
  }

  const safeSoundEnabled = typeof soundEnabled === "boolean" ? soundEnabled : true;
  const safeSoundVolume =
    typeof soundVolume === "number" && Number.isFinite(soundVolume)
      ? Math.min(1, Math.max(0, soundVolume))
      : 0.7;

  function themeButtonClass(value: ThemePreference, extraClass = ""): string {
    return [theme === value ? "active" : "", extraClass].filter(Boolean).join(" ");
  }

  function boardStyleButtonClass(value: BoardStylePreference): string {
    return ["board-style-option", boardStyle === value ? "active" : ""]
      .filter(Boolean)
      .join(" ");
  }

  const previewStones = [
    { x: 0, y: 0, color: "black" as const },
    { x: 2, y: 1, color: "white" as const },
    { x: 3, y: 0, color: "black" as const },
    { x: 1, y: 3, color: "white" as const },
  ];

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
            <button
              type="button"
              className={boardStyleButtonClass("current")}
              aria-pressed={boardStyle === "current"}
              onClick={() => onBoardStyleChange("current")}
            >
              <span className="board-style-preview board-style-current-preview" aria-hidden="true">
                <GoBoard size={4} stones={previewStones} />
              </span>
              <span>Polished Wood</span>
            </button>
            <button
              type="button"
              className={boardStyleButtonClass("original")}
              aria-pressed={boardStyle === "original"}
              onClick={() => onBoardStyleChange("original")}
            >
              <span className="board-style-preview board-style-original-preview" aria-hidden="true">
                <GoBoard size={4} stones={previewStones} />
              </span>
              <span>Classic Flat</span>
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
            <input
              type="checkbox"
              checked={safeSoundEnabled}
              onChange={(event) => onSoundEnabledChange(event.currentTarget.checked)}
            />
          </label>
          <label className="volume-control">
            <span>Volume {Math.round(safeSoundVolume * 100)}%</span>
            <input
              type="range"
              min="0"
              max="100"
              value={Math.round(safeSoundVolume * 100)}
              disabled={!safeSoundEnabled}
              onChange={(event) => onSoundVolumeChange(Number(event.currentTarget.value) / 100)}
            />
          </label>
          <button
            type="button"
            className="sound-test-button btn-with-icon"
            disabled={!safeSoundEnabled}
            onClick={() => playStoneClickWithSettings(safeSoundEnabled, safeSoundVolume)}
          >
            <FaVolumeUp aria-hidden="true" />
            Test sound
          </button>
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
