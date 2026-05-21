import { LEVELS, RANK_OPTIONS } from "../data/levels";
import { SessionResult, Stone } from "../types";
import { GoBoard } from "./GoBoard";
import { FaBookOpen, FaPlay } from "react-icons/fa";

type HomeScreenProps = {
  selectedRank: string;
  recommendedLevel: number;
  selectedLevel: number;
  levelCount: number;
  sessionCount: number;
  lastSession?: SessionResult;
  onRankChange: (rank: string) => void;
  onLevelChange: (level: number) => void;
  onStart: () => void;
};

const homePreviewPositions: Stone[][] = [
  [
    { x: 4, y: 4, color: "black" },
    { x: 6, y: 5, color: "white" },
    { x: 6, y: 3, color: "black" },
    { x: 2, y: 3, color: "white" },
    { x: 5, y: 6, color: "black" },
    { x: 7, y: 3, color: "white" },
    { x: 7, y: 2, color: "black" },
    { x: 6, y: 6, color: "white" },
    { x: 2, y: 1, color: "black" },
    { x: 2, y: 6, color: "white" },
  ],
  [
    { x: 6, y: 2, color: "black" },
    { x: 3, y: 4, color: "white" },
    { x: 5, y: 5, color: "black" },
    { x: 3, y: 6, color: "white" },
    { x: 3, y: 2, color: "black" },
    { x: 2, y: 2, color: "white" },
    { x: 2, y: 1, color: "black" },
    { x: 2, y: 3, color: "white" },
    { x: 4, y: 6, color: "black" },
    { x: 3, y: 7, color: "white" },
  ],
  [
    { x: 6, y: 3, color: "black" },
    { x: 3, y: 2, color: "white" },
    { x: 2, y: 5, color: "black" },
    { x: 4, y: 5, color: "white" },
    { x: 6, y: 6, color: "black" },
    { x: 6, y: 5, color: "white" },
    { x: 7, y: 5, color: "black" },
    { x: 2, y: 6, color: "white" },
    { x: 1, y: 6, color: "black" },
    { x: 3, y: 6, color: "white" },
  ],
];

export function HomeScreen({
  selectedRank,
  recommendedLevel,
  selectedLevel,
  levelCount,
  sessionCount,
  lastSession,
  onRankChange,
  onLevelChange,
  onStart,
}: HomeScreenProps) {
  const homePreviewStones = homePreviewPositions[sessionCount % homePreviewPositions.length];

  return (
    <div className="home-screen">
      <section className="panel home-hero">
        <div className="home-hero-copy">
          <h1>Go Visualization Trainer</h1>
          <p className="home-subtitle">
            Train board memory by studying, hiding, and rebuilding Go positions.
          </p>
          <p className="source-credit">
            Based on visualization exercises by{" "}
            <a href="https://go-welticke.com/exercises" target="_blank" rel="noreferrer">
              Jonas Welticke
            </a>.
          </p>
        </div>
        <div className="home-board-preview" aria-hidden="true">
          <GoBoard size={9} stones={homePreviewStones} />
        </div>
      </section>

      <section className="panel home-start-panel">
        <div>
          <h2>Start training</h2>
          <p className="home-section-note">Choose a rank, then start at the suggested level or override it.</p>
        </div>

        <div className="home-start-grid">
          <div className="field-row">
            <label htmlFor="rank-select">Approximate rank</label>
            <select
              id="rank-select"
              value={selectedRank}
              onChange={(event) => onRankChange(event.target.value)}
            >
              {RANK_OPTIONS.map((rank) => (
                <option key={rank} value={rank}>
                  {rank}
                </option>
              ))}
            </select>
          </div>

          <div className="field-row">
            <label htmlFor="level-select">Start at level</label>
            <select
              id="level-select"
              value={selectedLevel}
              onChange={(event) => onLevelChange(Number(event.target.value))}
            >
              {Array.from({ length: levelCount }, (_, index) => index + 1).map((level) => (
                <option key={level} value={level}>
                  Level {level}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="home-start-actions">
          <span className="recommended-badge">Recommended: Level {recommendedLevel}</span>
          <button type="button" onClick={onStart} className="primary btn-with-icon home-start-button">
            <FaPlay aria-hidden="true" />
            Start
          </button>
        </div>
      </section>

      <section className="home-progress" aria-label="Progress summary">
        <div className="progress-tile">
          <span className="progress-label">Sessions</span>
          <strong>{sessionCount}</strong>
        </div>
        <div className="progress-tile">
          <span className="progress-label">Last level</span>
          <strong>{lastSession ? `Level ${lastSession.level}` : "-"}</strong>
        </div>
        <div className="progress-tile">
          <span className="progress-label">Last score</span>
          <strong>{lastSession ? lastSession.totalMistakes : "-"}</strong>
        </div>
      </section>

      <details className="rules-box home-rules">
        <summary>
          <FaBookOpen aria-hidden="true" />
          How it works
        </summary>
        <div className="rules-content">
          <p>
            Start with the exercise that is two levels below the first level where your rank
            appears. The app suggests this automatically, but you can choose another level.
          </p>
          <ul>
            <li>Set out to finish all problems of the level within the listed time.</li>
            <li>Memorize each position from top left to bottom right as well as you can.</li>
            <li>When you think you have it, hide the board, close your eyes for three seconds, then rebuild it from memory.</li>
            <li>Repeat this until you have finished all problems of that level.</li>
          </ul>
          <p>Count your mistakes:</p>
          <ul>
            <li>1 point if a stone is one intersection away from the correct spot, not diagonal.</li>
            <li>1 point if a stone is on the correct spot but has the wrong color.</li>
            <li>2 points for each remaining missing, extra, or otherwise misplaced stone.</li>
          </ul>
          <p>
            After the level, compare your total mistakes with the table. A low score lets you
            level up; a high score means you should try a lower level next time.
          </p>
          <div className="rules-table-wrap">
            <table className="rules-table">
              <thead>
                <tr>
                  <th>Level</th>
                  <th>Rank</th>
                  <th>Time</th>
                  <th>Level up</th>
                  <th>Level down</th>
                </tr>
              </thead>
              <tbody>
                {LEVELS.map((level) => (
                  <tr key={level.level}>
                    <td>{level.level}</td>
                    <td>{level.rank}</td>
                    <td>{level.timeLimitMinutes} min</td>
                    <td>&lt;{level.levelUpBelow}</td>
                    <td>
                      {level.levelDownAbove === null ? "/" : `>${level.levelDownAbove}`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </details>
    </div>
  );
}
