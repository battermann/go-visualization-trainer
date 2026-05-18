import { Problem } from "../types";
import { GoBoard } from "./GoBoard";
import { Timer } from "./Timer";
import { FaEyeSlash, FaHome } from "react-icons/fa";

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
        <button type="button" className="primary btn-with-icon" onClick={onMemorized}>
          <FaEyeSlash aria-hidden="true" />
          I memorized it
        </button>
        <button type="button" className="btn-with-icon" onClick={onBackHome}>
          <FaHome aria-hidden="true" />
          Home
        </button>
      </div>
    </section>
  );
}
