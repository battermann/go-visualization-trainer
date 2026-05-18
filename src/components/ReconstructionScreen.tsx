import { Stone, StoneColor } from "../types";
import { GoBoard } from "./GoBoard";
import { Timer } from "./Timer";

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
          Black
        </button>
        <button
          type="button"
          className={selectedColor === "white" ? "active" : ""}
          onClick={() => onSelectedColorChange("white")}
          aria-pressed={selectedColor === "white"}
        >
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

      <div className="button-row">
        <button type="button" onClick={onUndo}>
          Undo
        </button>
        <button type="button" onClick={onClear}>
          Clear board
        </button>
        <button type="button" className="primary" onClick={onSubmit}>
          Submit
        </button>
        <button type="button" onClick={onBackHome}>
          &lt; Home
        </button>
      </div>
    </section>
  );
}
