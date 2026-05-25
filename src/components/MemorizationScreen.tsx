import { Problem } from "../types";
import { GoBoard } from "./GoBoard";
import { Timer } from "./Timer";
import { FaDoorOpen, FaEyeSlash } from "react-icons/fa";

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
      <div className="action-bar board-action-bar">
        <div className="action-group">
          <button type="button" className="btn-with-icon" onClick={onBackHome}>
            <FaDoorOpen aria-hidden="true" />
            Exit training
          </button>
        </div>
        <div className="action-group action-group-primary">
          <button type="button" className="primary btn-with-icon" onClick={onMemorized}>
            <FaEyeSlash aria-hidden="true" />
            I memorized it
          </button>
        </div>
      </div>
    </section>
  );
}
