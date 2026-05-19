import { LEVELS, RANK_OPTIONS } from "../data/levels";
import { FaBookOpen, FaPlay } from "react-icons/fa";

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
      <p className="source-credit">
        Based on visualization exercises by{" "}
        <a href="https://go-welticke.com/exercises" target="_blank" rel="noreferrer">
          Jonas Welticke
        </a>.
      </p>

      <details className="rules-box">
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
