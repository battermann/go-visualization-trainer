import { BoardHighlight, Problem, ProblemScoreResult } from "../types";
import { GoBoard } from "./GoBoard";
import { Timer } from "./Timer";
import { FaArrowRight, FaHome } from "react-icons/fa";

type ProblemResultScreenProps = {
  problem: Problem;
  problemIndex: number;
  problemCount: number;
  result: ProblemScoreResult;
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
  remainingSeconds,
  onContinue,
  onBackHome,
}: ProblemResultScreenProps) {
  return (
    <section className="panel">
      <h1>
        Problem {problemIndex + 1} of {problemCount} Result
      </h1>
      <Timer remainingSeconds={remainingSeconds} />
      <p>
        Mistake score: <strong>{result.mistakePoints}</strong>
      </p>

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
        <p>No mistakes on this problem.</p>
      ) : (
        <ul>
          {result.scoreResult.mistakes.map((mistake, index) => (
            <li key={`${mistake.type}-${index}`}>
              {mistake.message}: {mistake.points} point{mistake.points === 1 ? "" : "s"}
            </li>
          ))}
        </ul>
      )}

      <div className="button-row">
        <button type="button" className="primary btn-with-icon" onClick={onContinue}>
          <FaArrowRight aria-hidden="true" />
          Continue
        </button>
        <button type="button" className="btn-with-icon" onClick={onBackHome}>
          <FaHome aria-hidden="true" />
          Home
        </button>
      </div>
    </section>
  );
}
