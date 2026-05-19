import { LevelConfig } from "../types";
import { Timer } from "./Timer";
import { FaArrowRight, FaHome, FaRedoAlt } from "react-icons/fa";

type LevelSummaryScreenProps = {
  level: LevelConfig;
  totalMistakes: number;
  timeUsedSeconds: number;
  problemCount: number;
  recommendedLevel: number;
  recommendationLabel: "Level up" | "Stay on same level" | "Level down";
  remainingSeconds: number;
  showWorldChampionshipMessage: boolean;
  onRetry: () => void;
  onGoRecommended: () => void;
  onBackHome: () => void;
};

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}m ${secs}s`;
}

export function LevelSummaryScreen({
  level,
  totalMistakes,
  timeUsedSeconds,
  problemCount,
  recommendedLevel,
  recommendationLabel,
  remainingSeconds,
  showWorldChampionshipMessage,
  onRetry,
  onGoRecommended,
  onBackHome,
}: LevelSummaryScreenProps) {
  const average = problemCount === 0 ? 0 : totalMistakes / problemCount;

  return (
    <section className="panel">
      <h1>Level {level.level} completed</h1>
      <Timer remainingSeconds={remainingSeconds} />
      <p>Total mistakes: {totalMistakes}</p>
      <p>Time used: {formatDuration(timeUsedSeconds)}</p>
      <p>Problems: {problemCount}</p>
      <p>Average mistakes/problem: {average.toFixed(2)}</p>
      <p>
        Recommendation: <strong>{recommendationLabel}</strong>
      </p>
      <p>Recommended next level: Level {recommendedLevel}</p>
      {showWorldChampionshipMessage ? (
        <p className="success">World Championship Mode unlocked. Congratulations.</p>
      ) : null}

      <div className="button-row wrap">
        <button type="button" className="btn-with-icon" onClick={onRetry}>
          <FaRedoAlt aria-hidden="true" />
          Retry same level
        </button>
        <button type="button" className="primary btn-with-icon" onClick={onGoRecommended}>
          <FaArrowRight aria-hidden="true" />
          Go to recommended level
        </button>
        <button type="button" className="btn-with-icon" onClick={onBackHome}>
          <FaHome aria-hidden="true" />
          Home
        </button>
      </div>
    </section>
  );
}
