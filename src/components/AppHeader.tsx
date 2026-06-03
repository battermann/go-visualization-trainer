import { FaBars, FaCog, FaHome, FaLayerGroup } from "react-icons/fa";

type AppHeaderProps = {
  isTraining: boolean;
  selectedLevel: number;
  onHome: () => void;
  onChooseLevel: () => void;
  onOpenSettings: () => void;
  onOpenMenu: () => void;
};

export function AppHeader({
  isTraining,
  selectedLevel,
  onHome,
  onChooseLevel,
  onOpenSettings,
  onOpenMenu,
}: AppHeaderProps) {
  return (
    <header className="app-header">
      <nav className="app-nav desktop-nav" aria-label="App navigation">
        {!isTraining ? (
          <>
            <button type="button" className="nav-button btn-with-icon" onClick={onHome}>
              <FaHome aria-hidden="true" />
              Home
            </button>
            <button type="button" className="nav-button btn-with-icon" onClick={onChooseLevel}>
              <FaLayerGroup aria-hidden="true" />
              Level {selectedLevel}
            </button>
          </>
        ) : null}
      </nav>

      <nav className="app-nav desktop-nav desktop-nav-secondary" aria-label="App settings">
        <button
          type="button"
          className="nav-icon-button"
          onClick={onOpenSettings}
          aria-label="Open settings"
        >
          <FaCog aria-hidden="true" />
        </button>
      </nav>

      <div className="mobile-nav">
        {isTraining ? (
          <button
            type="button"
            className="nav-icon-button"
            onClick={onOpenSettings}
            aria-label="Open settings"
          >
            <FaCog aria-hidden="true" />
          </button>
        ) : (
          <button
            type="button"
            className="nav-icon-button"
            onClick={onOpenMenu}
            aria-label="Open menu"
          >
            <FaBars aria-hidden="true" />
          </button>
        )}
      </div>
    </header>
  );
}
