import { BoardHighlight, Problem, ProblemScoreResult } from "../types";
import { GoBoard } from "./GoBoard";
import { Timer } from "./Timer";

type ProblemResultScreenProps = {
  problem: Problem;
  result: ProblemScoreResult;
  remainingSeconds: number;
  onContinue: () => void;
  onBackHome: () => void;
};

function buildTargetHighlights(result: ProblemScoreResult): BoardHighlight[] {
  const highlights: BoardHighlight[] = [];
  for (const mistake of result.scoreResult.mistakes) {
    if (!mistake.targetStone) {
      continue;
    }
    if (mistake.type === "missing") {
      highlights.push({
        x: mistake.targetStone.x,
        y: mistake.targetStone.y,
        kind: "missing",
        label: "M",
      });
    }
    if (mistake.type === "wrong-color") {
      highlights.push({
        x: mistake.targetStone.x,
        y: mistake.targetStone.y,
        kind: "wrong-color",
        label: "C",
      });
    }
    if (mistake.type === "near-miss") {
      highlights.push({
        x: mistake.targetStone.x,
        y: mistake.targetStone.y,
        kind: "near-miss",
        label: "N",
      });
    }
  }
  return highlights;
}

function buildUserHighlights(result: ProblemScoreResult): BoardHighlight[] {
  const highlights: BoardHighlight[] = [];
  for (const mistake of result.scoreResult.mistakes) {
    if (!mistake.userStone) {
      continue;
    }
    if (mistake.type === "extra") {
      highlights.push({
        x: mistake.userStone.x,
        y: mistake.userStone.y,
        kind: "extra",
        label: "E",
      });
    }
    if (mistake.type === "wrong-color") {
      highlights.push({
        x: mistake.userStone.x,
        y: mistake.userStone.y,
        kind: "wrong-color",
        label: "C",
      });
    }
    if (mistake.type === "near-miss") {
      highlights.push({
        x: mistake.userStone.x,
        y: mistake.userStone.y,
        kind: "near-miss",
        label: "N",
      });
    }
  }
  return highlights;
}

export function ProblemResultScreen({
  problem,
  result,
  remainingSeconds,
  onContinue,
  onBackHome,
}: ProblemResultScreenProps) {
  return (
    <section className="panel">
      <h1>Problem Result</h1>
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
        <button type="button" className="primary" onClick={onContinue}>
          Continue
        </button>
        <button type="button" onClick={onBackHome}>
          &lt; Home
        </button>
      </div>
    </section>
  );
}
