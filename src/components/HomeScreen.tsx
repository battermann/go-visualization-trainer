import { RANK_OPTIONS } from "../data/levels";
import { FaPlay } from "react-icons/fa";

type HomeScreenProps = {
  selectedRank: string;
  recommendedLevel: number;
  selectedLevel: number;
  levelCount: number;
  sessionCount: number;
  lastSessionSummary?: string;
  onRankChange: (rank: string) => void;
  onLevelChange: (level: number) => void;
  onStart: () => void;
};

export function HomeScreen({
  selectedRank,
  recommendedLevel,
  selectedLevel,
  levelCount,
  sessionCount,
  lastSessionSummary,
  onRankChange,
  onLevelChange,
  onStart,
}: HomeScreenProps) {
  return (
    <section className="panel">
      <h1>Go Visualization Trainer</h1>
      <p>
        Study each board position, hide it, and recreate the stones from memory on an empty
        board.
      </p>

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

      <p className="recommended">Recommended start: Level {recommendedLevel}</p>

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

      <button type="button" onClick={onStart} className="primary btn-with-icon">
        <FaPlay aria-hidden="true" />
        Start
      </button>

      <div className="summary-box">
        <h2>Progress</h2>
        <p>Sessions completed: {sessionCount}</p>
        {lastSessionSummary ? <p>{lastSessionSummary}</p> : <p>No sessions yet.</p>}
      </div>
    </section>
  );
}
