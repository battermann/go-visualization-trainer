import { useState } from "react";
import { LevelConfig } from "../types";
import { GoBoard } from "./GoBoard";

type LevelOverviewProps = {
  level: LevelConfig;
  onStartTraining: () => void;
  onBack: () => void;
};

export function LevelOverview({ level, onStartTraining, onBack }: LevelOverviewProps) {
  const [showAllBoards, setShowAllBoards] = useState(false);

  return (
    <section className="panel">
      <h1>Level {level.level}</h1>
      <p>Approximate rank: {level.rank}</p>
      <p>Problems: {level.problems.length}</p>
      <p>Time limit: {level.timeLimitMinutes} minutes</p>
      <p>
        {level.level === 10
          ? "Level up threshold: perfect score (0 mistakes)."
          : `Level up if total mistakes are below ${level.levelUpBelow}.`}
      </p>
      <p>
        {level.levelDownAbove === null
          ? "No level-down threshold."
          : `Level down if total mistakes are above ${level.levelDownAbove}.`}
      </p>

      <div className="button-row">
        <button type="button" className="primary" onClick={onStartTraining}>
          Start training
        </button>
        <button type="button" onClick={() => setShowAllBoards((current) => !current)}>
          {showAllBoards ? "Hide all boards" : "Show all boards"}
        </button>
        <button type="button" onClick={onBack}>
          &lt; Home
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
