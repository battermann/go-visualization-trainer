import { Problem } from "../types";
import { GoBoard } from "./GoBoard";
import { Timer } from "./Timer";

type MemorizationScreenProps = {
  problem: Problem;
  problemIndex: number;
  problemCount: number;
  remainingSeconds: number;
  onMemorized: () => void;
  onBackHome: () => void;
};

export function MemorizationScreen({
  problem,
  problemIndex,
  problemCount,
  remainingSeconds,
  onMemorized,
  onBackHome,
}: MemorizationScreenProps) {
  return (
    <section className="panel">
      <h1>
        Problem {problemIndex + 1} of {problemCount}
      </h1>
      <Timer remainingSeconds={remainingSeconds} />
      <GoBoard size={problem.boardSize} stones={problem.stones} title="Target position" />
      <div className="button-row">
        <button type="button" className="primary" onClick={onMemorized}>
          I memorized it
        </button>
        <button type="button" onClick={onBackHome}>
          &lt; Home
        </button>
      </div>
    </section>
  );
}
