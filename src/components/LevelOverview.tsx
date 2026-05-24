import { useState } from "react";
import { FaEye, FaEyeSlash, FaHome, FaPlay } from "react-icons/fa";
import { LevelConfig } from "../types";
import { GoBoard } from "./GoBoard";

type LevelOverviewProps = {
  level: LevelConfig;
  onStartTraining: () => void;
  onBack: () => void;
};

function levelUpText(level: LevelConfig): string {
  return level.levelUpBelow === 0 ? "0" : `<${level.levelUpBelow}`;
}

export function LevelOverview({ level, onStartTraining, onBack }: LevelOverviewProps) {
  const [showAllBoards, setShowAllBoards] = useState(false);

  return (
    <section className="panel">
      <h1>Level {level.level}</h1>
      <dl className="screen-facts">
        <div>
          <dt>Rank</dt>
          <dd>{level.rank}</dd>
        </div>
        <div>
          <dt>Problems</dt>
          <dd>{level.problems.length}</dd>
        </div>
        <div>
          <dt>Time</dt>
          <dd>{level.timeLimitMinutes} min</dd>
        </div>
        <div>
          <dt>Level up</dt>
          <dd>{levelUpText(level)}</dd>
        </div>
        <div>
          <dt>Level down</dt>
          <dd>{level.levelDownAbove === null ? "None" : `>${level.levelDownAbove}`}</dd>
        </div>
      </dl>

      <div className="button-row">
        <button type="button" className="primary btn-with-icon" onClick={onStartTraining}>
          <FaPlay aria-hidden="true" />
          Start training
        </button>
        <button
          type="button"
          className="btn-with-icon"
          onClick={() => setShowAllBoards((current) => !current)}
        >
          {showAllBoards ? <FaEyeSlash aria-hidden="true" /> : <FaEye aria-hidden="true" />}
          {showAllBoards ? "Hide all boards" : "Show all boards"}
        </button>
        <button type="button" className="btn-with-icon" onClick={onBack}>
          <FaHome aria-hidden="true" />
          Home
        </button>
      </div>

      {showAllBoards ? (
        <div className="level-preview-grid">
          {level.problems.map((problem, index) => (
            <div key={problem.id} className="level-preview-item">
              <h3>Problem {index + 1}</h3>
              <GoBoard size={problem.boardSize} stones={problem.stones} />
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}
