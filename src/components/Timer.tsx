type TimerProps = {
  remainingSeconds: number;
};

function formatTime(totalSeconds: number): string {
  const safe = Math.max(totalSeconds, 0);
  const minutes = Math.floor(safe / 60);
  const seconds = safe % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export function Timer({ remainingSeconds }: TimerProps) {
  return (
    <div className="timer" aria-live="polite">
      Time left: <strong>{formatTime(remainingSeconds)}</strong>
    </div>
  );
}
