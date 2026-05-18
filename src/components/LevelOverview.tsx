import { LevelConfig } from "../types";

type LevelOverviewProps = {
  level: LevelConfig;
  onStartTraining: () => void;
  onBack: () => void;
};

export function LevelOverview({ level, onStartTraining, onBack }: LevelOverviewProps) {
  return (
    <section className="panel">
      <h1>Level {level.level}</h1>
      <p>Approximate rank: {level.rank}</p>
      <p>Problems: {level.problems.length}</p>
      <p>Time limit: {level.timeLimitMinutes} minutes</p>
      <p>Level up if total mistakes are below {level.levelUpBelow}.</p>
      <p>
        {level.levelDownAbove === null
          ? "No level-down threshold."
          : `Level down if total mistakes are above ${level.levelDownAbove}.`}
      </p>

      <div className="button-row">
        <button type="button" className="primary" onClick={onStartTraining}>
          Start training
        </button>
        <button type="button" onClick={onBack}>
          &lt; Home
        </button>
      </div>
    </section>
  );
}
