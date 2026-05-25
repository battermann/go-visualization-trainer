import { BoardHighlight, Problem, ProblemScoreResult } from "../types";
import { GoBoard } from "./GoBoard";
import { Timer } from "./Timer";
import { FaArrowRight, FaDoorOpen } from "react-icons/fa";

type ProblemResultScreenProps = {
  problem: Problem;
  problemIndex: number;
  problemCount: number;
  result: ProblemScoreResult;
  totalMistakes: number;
  remainingSeconds: number;
  onContinue: () => void;
  onBackHome: () => void;
};

function buildTargetHighlights(result: ProblemScoreResult): BoardHighlight[] {
  return [];
}

function buildUserHighlights(result: ProblemScoreResult): BoardHighlight[] {
  const highlights: BoardHighlight[] = [];
  for (const mistake of result.scoreResult.mistakes) {
    if (mistake.type === "missing" && mistake.targetStone) {
      highlights.push({
        x: mistake.targetStone.x,
        y: mistake.targetStone.y,
        kind: "missing",
        label: "2",
      });
      continue;
    }

    if (!mistake.userStone) {
      continue;
    }

    highlights.push({
      x: mistake.userStone.x,
      y: mistake.userStone.y,
      kind: mistake.points === 1 ? "one-point" : "two-point",
      label: String(mistake.points),
    });
  }
  return highlights;
}

export function ProblemResultScreen({
  problem,
  problemIndex,
  problemCount,
  result,
  totalMistakes,
  remainingSeconds,
  onContinue,
  onBackHome,
}: ProblemResultScreenProps) {
  return (
    <section className="panel">
      <h1>
        Problem {problemIndex + 1} of {problemCount} Result
      </h1>
      <div className="status-row">
        <Timer remainingSeconds={remainingSeconds} />
        <p className="score-callout">
          Problem score <strong>{result.mistakePoints}</strong>
        </p>
        <p className="score-callout">
          Total score <strong>{totalMistakes}</strong>
        </p>
      </div>

      <div className="result-grid">
        <GoBoard
          size={problem.boardSize}
          stones={result.targetStones}
          highlights={buildTargetHighlights(result)}
          title="Target board"
        />
        <GoBoard
          size={problem.boardSize}
          stones={result.userStones}
          highlights={buildUserHighlights(result)}
          title="Your board"
        />
      </div>

      <h2>Mistakes</h2>
      {result.scoreResult.mistakes.length === 0 ? (
        <p className="empty-state">No mistakes on this problem.</p>
      ) : (
        <ul className="mistake-list">
          {result.scoreResult.mistakes.map((mistake, index) => (
            <li key={`${mistake.type}-${index}`}>
              {mistake.message}: {mistake.points} point{mistake.points === 1 ? "" : "s"}
            </li>
          ))}
        </ul>
      )}

      <div className="action-bar">
        <div className="action-group">
          <button type="button" className="btn-with-icon" onClick={onBackHome}>
            <FaDoorOpen aria-hidden="true" />
            Exit training
          </button>
        </div>
        <div className="action-group action-group-primary">
          <button type="button" className="primary btn-with-icon" onClick={onContinue}>
            <FaArrowRight aria-hidden="true" />
            Continue
          </button>
        </div>
      </div>
    </section>
  );
}
