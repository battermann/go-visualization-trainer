import { Stone, StoneColor } from "../types";
import { GoBoard } from "./GoBoard";
import { Timer } from "./Timer";
import { FaCheck, FaDoorOpen, FaEraser, FaUndoAlt } from "react-icons/fa";

type ReconstructionScreenProps = {
  boardSize: number;
  problemIndex: number;
  problemCount: number;
  remainingSeconds: number;
  timeExpired: boolean;
  stones: Stone[];
  selectedColor: StoneColor;
  onSelectedColorChange: (color: StoneColor) => void;
  onStonesChange: (stones: Stone[]) => void;
  onUndo: () => void;
  onClear: () => void;
  onSubmit: () => void;
  onBackHome: () => void;
};

export function ReconstructionScreen({
  boardSize,
  problemIndex,
  problemCount,
  remainingSeconds,
  timeExpired,
  stones,
  selectedColor,
  onSelectedColorChange,
  onStonesChange,
  onUndo,
  onClear,
  onSubmit,
  onBackHome,
}: ReconstructionScreenProps) {
  return (
    <section className="panel">
      <h1>
        Recreate Problem {problemIndex + 1} of {problemCount}
      </h1>
      <Timer remainingSeconds={remainingSeconds} />
      {timeExpired ? <p className="warning">Time is over. You can still submit this problem.</p> : null}

      <div className="color-toggle" role="radiogroup" aria-label="Current stone color">
        <button
          type="button"
          className={selectedColor === "black" ? "active" : ""}
          onClick={() => onSelectedColorChange("black")}
          aria-pressed={selectedColor === "black"}
        >
          <span className="color-chip black" aria-hidden="true" />
          Black
        </button>
        <button
          type="button"
          className={selectedColor === "white" ? "active" : ""}
          onClick={() => onSelectedColorChange("white")}
          aria-pressed={selectedColor === "white"}
        >
          <span className="color-chip white" aria-hidden="true" />
          White
        </button>
      </div>

      <GoBoard
        size={boardSize}
        stones={stones}
        editable
        selectedColor={selectedColor}
        onChange={onStonesChange}
        title="Your reconstruction"
      />

      <div className="action-bar board-action-bar">
        <div className="action-group">
          <button type="button" className="btn-with-icon" onClick={onUndo}>
            <FaUndoAlt aria-hidden="true" />
            Undo
          </button>
          <button type="button" className="btn-with-icon" onClick={onClear}>
            <FaEraser aria-hidden="true" />
            Clear board
          </button>
        </div>
        <div className="action-group action-group-primary">
          <button type="button" className="btn-with-icon" onClick={onBackHome}>
            <FaDoorOpen aria-hidden="true" />
            Exit training
          </button>
          <button type="button" className="primary btn-with-icon" onClick={onSubmit}>
            <FaCheck aria-hidden="true" />
            Submit
          </button>
        </div>
      </div>
    </section>
  );
}
