export type StoneColor = "black" | "white";

export type ThemePreference = "light" | "dark" | "system";
export type BoardStylePreference = "current" | "original";

export type AppSettings = {
  theme: ThemePreference;
  soundEnabled: boolean;
  soundVolume: number;
  boardStyle: BoardStylePreference;
};

export type Stone = {
  x: number;
  y: number;
  color: StoneColor;
};

export type Problem = {
  id: string;
  boardSize: number;
  stones: Stone[];
};

export type LevelConfig = {
  level: number;
  rank: string;
  timeLimitMinutes: number;
  levelUpBelow: number;
  levelDownAbove: number | null;
  problems: Problem[];
};

export type Mistake = {
  type: "missing" | "extra" | "wrong-color" | "near-miss" | "wrong-position";
  points: number;
  targetStone?: Stone;
  userStone?: Stone;
  message: string;
};

export type ScoreResult = {
  points: number;
  mistakes: Mistake[];
};

export type BoardHighlight = {
  x: number;
  y: number;
  kind: "one-point" | "two-point" | "missing";
  label: string;
};

export type AppState =
  | "home"
  | "level-overview"
  | "training"
  | "memorizing"
  | "pause"
  | "reconstructing"
  | "problem-result"
  | "level-summary";

export type ProblemScoreResult = {
  problemId: string;
  mistakePoints: number;
  scoreResult: ScoreResult;
  targetStones: Stone[];
  userStones: Stone[];
};

export type TrainingSession = {
  level: number;
  problems: Problem[];
  currentProblemIndex: number;
  startedAt: number;
  remainingSeconds: number;
  userStones: Stone[];
  userHistory: Stone[][];
  results: ProblemScoreResult[];
  timeExpired: boolean;
};

export type SessionResult = {
  id: string;
  date: string;
  level: number;
  totalMistakes: number;
  timeUsedSeconds: number;
  problemResults: {
    problemId: string;
    mistakePoints: number;
  }[];
};

export type AppProgress = {
  lastSelectedRank?: string;
  lastSelectedLevel?: number;
  sessions: SessionResult[];
  level10PerfectDates: string[];
};
