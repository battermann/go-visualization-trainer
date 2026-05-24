import { useEffect, useMemo, useState } from "react";
import { HomeScreen } from "./components/HomeScreen";
import { LevelOverview } from "./components/LevelOverview";
import { LevelSummaryScreen } from "./components/LevelSummaryScreen";
import { MemorizationScreen } from "./components/MemorizationScreen";
import { ProblemResultScreen } from "./components/ProblemResultScreen";
import { ReconstructionScreen } from "./components/ReconstructionScreen";
import { LEVELS } from "./data/levels";
import { getRecommendedStartLevel } from "./logic/rankMapping";
import { runScoringSelfCheck, scoreProblem } from "./logic/scoring";
import {
  appendSession,
  hasConsecutivePerfectDays,
  loadProgress,
  saveProgress,
  updateLevel10Streak,
} from "./logic/storage";
import { AppState, AppProgress, LevelConfig, Problem, TrainingSession } from "./types";

function getLevelConfig(level: number): LevelConfig {
  const config = LEVELS.find((entry) => entry.level === level);
  if (!config) {
    return LEVELS[0];
  }
  return config;
}

function nowDateISO(): string {
  return new Date().toISOString().slice(0, 10);
}

function buildSession(levelConfig: LevelConfig): TrainingSession {
  return {
    level: levelConfig.level,
    problems: levelConfig.problems,
    currentProblemIndex: 0,
    startedAt: Date.now(),
    remainingSeconds: levelConfig.timeLimitMinutes * 60,
    userStones: [],
    userHistory: [],
    results: [],
    timeExpired: false,
  };
}

function getRecommendation(levelConfig: LevelConfig, totalMistakes: number): number {
  const maxLevel = LEVELS[LEVELS.length - 1]?.level ?? levelConfig.level;

  if (levelConfig.level === maxLevel) {
    if (
      levelConfig.levelDownAbove !== null &&
      totalMistakes > levelConfig.levelDownAbove
    ) {
      return Math.max(1, levelConfig.level - 1);
    }
    return levelConfig.level;
  }

  if (totalMistakes < levelConfig.levelUpBelow) {
    return Math.min(maxLevel, levelConfig.level + 1);
  }
  if (
    levelConfig.levelDownAbove !== null &&
    totalMistakes > levelConfig.levelDownAbove
  ) {
    return Math.max(1, levelConfig.level - 1);
  }
  return levelConfig.level;
}

function getStoredSessionRecommendation(progress: AppProgress): number | null {
  const lastSession = progress.sessions[progress.sessions.length - 1];
  if (!lastSession) {
    return null;
  }

  const levelConfig = LEVELS.find((entry) => entry.level === lastSession.level);
  if (!levelConfig) {
    return null;
  }

  return getRecommendation(levelConfig, lastSession.totalMistakes);
}

function isKnownLevel(level: number | undefined): level is number {
  return typeof level === "number" && LEVELS.some((entry) => entry.level === level);
}

function getInitialSelectedLevel(progress: AppProgress, selectedRank: string): number {
  const sessionRecommendation = getStoredSessionRecommendation(progress);
  if (sessionRecommendation !== null) {
    return sessionRecommendation;
  }

  if (isKnownLevel(progress.lastSelectedLevel)) {
    return progress.lastSelectedLevel;
  }

  return getRecommendedStartLevel(selectedRank);
}

function getRecommendationLabel(
  levelConfig: LevelConfig,
  recommendedLevel: number,
  totalMistakes: number,
) {
  const maxLevel = LEVELS[LEVELS.length - 1]?.level ?? levelConfig.level;
  if (levelConfig.level === maxLevel && totalMistakes === 0) {
    return "Perfect Level 10" as const;
  }
  if (recommendedLevel > levelConfig.level) {
    return "Level up" as const;
  }
  if (recommendedLevel < levelConfig.level) {
    return "Level down" as const;
  }
  return "Stay on same level" as const;
}

export default function App() {
  const initialProgress = useMemo(() => loadProgress(), []);
  const initialRank = initialProgress.lastSelectedRank ?? "15 kyu";
  const initialSessionRecommendation = getStoredSessionRecommendation(initialProgress);
  const [progress, setProgress] = useState<AppProgress>(initialProgress);
  const [appState, setAppState] = useState<AppState>("home");
  const [selectedRank, setSelectedRank] = useState<string>(initialRank);
  const [selectedLevel, setSelectedLevel] = useState<number>(
    getInitialSelectedLevel(initialProgress, initialRank),
  );
  const [useSessionRecommendation, setUseSessionRecommendation] = useState(
    initialSessionRecommendation !== null,
  );
  const [session, setSession] = useState<TrainingSession | null>(null);
  const [selectedStoneColor, setSelectedStoneColor] = useState<"black" | "white">("black");
  const [pauseCountdown, setPauseCountdown] = useState(3);
  const [lastResultIndex, setLastResultIndex] = useState<number | null>(null);
  const [summarySaved, setSummarySaved] = useState(false);

  useEffect(() => {
    const failures = runScoringSelfCheck();
    if (failures.length > 0) {
      console.error("Scoring self-check failures:", failures);
    }
  }, []);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  useEffect(() => {
    if (!session) {
      return;
    }
    if (!["memorizing", "pause", "reconstructing", "problem-result"].includes(appState)) {
      return;
    }

    const timer = window.setInterval(() => {
      setSession((current) => {
        if (!current) {
          return current;
        }
        if (current.remainingSeconds <= 0) {
          return { ...current, remainingSeconds: 0, timeExpired: true };
        }
        const next = current.remainingSeconds - 1;
        return {
          ...current,
          remainingSeconds: next,
          timeExpired: next <= 0,
        };
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [appState, session]);

  useEffect(() => {
    if (appState !== "pause") {
      return;
    }
    setPauseCountdown(3);
    const timer = window.setInterval(() => {
      setPauseCountdown((current) => {
        if (current <= 1) {
          window.clearInterval(timer);
          setAppState("reconstructing");
          return 0;
        }
        return current - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [appState]);

  const rankRecommendedLevel = useMemo(
    () => getRecommendedStartLevel(selectedRank),
    [selectedRank],
  );

  const storedSessionRecommendation = useMemo(
    () => getStoredSessionRecommendation(progress),
    [progress],
  );

  const recommendedLevel =
    useSessionRecommendation && storedSessionRecommendation !== null
      ? storedSessionRecommendation
      : rankRecommendedLevel;

  const currentLevelConfig = useMemo(
    () => getLevelConfig(selectedLevel),
    [selectedLevel],
  );

  const currentProblem: Problem | null =
    session && session.currentProblemIndex < session.problems.length
      ? session.problems[session.currentProblemIndex]
      : null;

  const totalMistakes = session
    ? session.results.reduce((sum, result) => sum + result.mistakePoints, 0)
    : 0;

  const timeUsedSeconds = session
    ? currentLevelConfig.timeLimitMinutes * 60 - session.remainingSeconds
    : 0;

  const levelRecommendation = getRecommendation(currentLevelConfig, totalMistakes);
  const recommendationLabel = getRecommendationLabel(
    currentLevelConfig,
    levelRecommendation,
    totalMistakes,
  );

  function handleRankChange(rank: string): void {
    setSelectedRank(rank);
    const recommended = getRecommendedStartLevel(rank);
    setUseSessionRecommendation(false);
    setSelectedLevel(recommended);
    setProgress((current) => ({
      ...current,
      lastSelectedRank: rank,
      lastSelectedLevel: recommended,
    }));
  }

  function handleLevelChange(level: number): void {
    setSelectedLevel(level);
    setProgress((current) => ({
      ...current,
      lastSelectedLevel: level,
    }));
  }

  function startOverview(): void {
    setAppState("level-overview");
  }

  function startLevel(): void {
    const level = getLevelConfig(selectedLevel);
    setSession(buildSession(level));
    setSelectedStoneColor("black");
    setLastResultIndex(null);
    setSummarySaved(false);
    setAppState("memorizing");
  }

  function handleMemorized(): void {
    setAppState("pause");
  }

  function handleUserStonesChange(nextStones: TrainingSession["userStones"]): void {
    setSession((current) => {
      if (!current) {
        return current;
      }
      return {
        ...current,
        userHistory: [...current.userHistory, current.userStones],
        userStones: nextStones,
      };
    });
  }

  function handleUndo(): void {
    setSession((current) => {
      if (!current || current.userHistory.length === 0) {
        return current;
      }
      const previous = current.userHistory[current.userHistory.length - 1];
      return {
        ...current,
        userStones: previous,
        userHistory: current.userHistory.slice(0, -1),
      };
    });
  }

  function handleClear(): void {
    setSession((current) => {
      if (!current) {
        return current;
      }
      return {
        ...current,
        userHistory: [...current.userHistory, current.userStones],
        userStones: [],
      };
    });
  }

  function handleSubmitProblem(): void {
    if (!session || !currentProblem) {
      return;
    }

    const scored = scoreProblem(currentProblem.stones, session.userStones);
    const result = {
      problemId: currentProblem.id,
      mistakePoints: scored.points,
      scoreResult: scored,
      targetStones: currentProblem.stones,
      userStones: session.userStones,
    };

    setSession((current) => {
      if (!current) {
        return current;
      }
      return {
        ...current,
        results: [...current.results, result],
      };
    });
    setLastResultIndex(session.results.length);
    setAppState("problem-result");
  }

  function saveSummaryIfNeeded(nextSession: TrainingSession): void {
    if (summarySaved) {
      return;
    }
    const date = nowDateISO();
    const totalSessionMistakes = nextSession.results.reduce(
      (sum, result) => sum + result.mistakePoints,
      0,
    );
    const sessionResult = {
      id: `${nextSession.level}-${nextSession.startedAt}`,
      date,
      level: nextSession.level,
      totalMistakes: totalSessionMistakes,
      timeUsedSeconds: currentLevelConfig.timeLimitMinutes * 60 - nextSession.remainingSeconds,
      problemResults: nextSession.results.map((result) => ({
        problemId: result.problemId,
        mistakePoints: result.mistakePoints,
      })),
    };

    setProgress((current) => {
      return updateLevel10Streak(
        appendSession(current, sessionResult),
        nextSession.level,
        totalSessionMistakes,
        date,
      );
    });
    setSummarySaved(true);
  }

  function handleContinueFromResult(): void {
    setSession((current) => {
      if (!current) {
        return current;
      }
      const nextIndex = current.currentProblemIndex + 1;
      const nextSession = {
        ...current,
        currentProblemIndex: nextIndex,
        userStones: [],
        userHistory: [],
      };
      if (nextIndex >= current.problems.length) {
        saveSummaryIfNeeded(nextSession);
        setAppState("level-summary");
      } else {
        setAppState("memorizing");
      }
      return nextSession;
    });
  }

  function retrySameLevel(): void {
    startLevel();
  }

  function goRecommendedLevel(): void {
    setSelectedLevel(levelRecommendation);
    setProgress((current) => ({ ...current, lastSelectedLevel: levelRecommendation }));
    setAppState("level-overview");
  }

  function backHome(): void {
    setSession(null);
    setAppState("home");
  }

  const lastSession = progress.sessions[progress.sessions.length - 1];
  const showWorldChampionshipMessage =
    session?.level === (LEVELS[LEVELS.length - 1]?.level ?? null) &&
    totalMistakes === 0 &&
    hasConsecutivePerfectDays(progress.level10PerfectDates);

  return (
    <main className="app-shell">
      {appState === "home" ? (
        <HomeScreen
          selectedRank={selectedRank}
          recommendedLevel={recommendedLevel}
          selectedLevel={selectedLevel}
          levelCount={LEVELS.length}
          sessionCount={progress.sessions.length}
          lastSession={lastSession}
          onRankChange={handleRankChange}
          onLevelChange={handleLevelChange}
          onStart={startOverview}
        />
      ) : null}

      {appState === "level-overview" ? (
        <LevelOverview
          level={currentLevelConfig}
          onStartTraining={startLevel}
          onBack={() => setAppState("home")}
        />
      ) : null}

      {appState === "memorizing" && currentProblem && session ? (
        <MemorizationScreen
          problem={currentProblem}
          problemIndex={session.currentProblemIndex}
          problemCount={session.problems.length}
          remainingSeconds={session.remainingSeconds}
          onMemorized={handleMemorized}
          onBackHome={backHome}
        />
      ) : null}

      {appState === "pause" ? (
        <section className="panel pause-panel">
          <h1>Close your eyes</h1>
          <p key={pauseCountdown} className="pause-count">
            {pauseCountdown}
          </p>
        </section>
      ) : null}

      {appState === "reconstructing" && currentProblem && session ? (
        <ReconstructionScreen
          boardSize={currentProblem.boardSize}
          problemIndex={session.currentProblemIndex}
          problemCount={session.problems.length}
          remainingSeconds={session.remainingSeconds}
          timeExpired={session.timeExpired}
          stones={session.userStones}
          selectedColor={selectedStoneColor}
          onSelectedColorChange={setSelectedStoneColor}
          onStonesChange={handleUserStonesChange}
          onUndo={handleUndo}
          onClear={handleClear}
          onSubmit={handleSubmitProblem}
          onBackHome={backHome}
        />
      ) : null}

      {appState === "problem-result" && session && lastResultIndex !== null ? (
        <ProblemResultScreen
          problem={session.problems[lastResultIndex]}
          problemIndex={lastResultIndex}
          problemCount={session.problems.length}
          result={session.results[lastResultIndex]}
          remainingSeconds={session.remainingSeconds}
          onContinue={handleContinueFromResult}
          onBackHome={backHome}
        />
      ) : null}

      {appState === "level-summary" && session ? (
        <LevelSummaryScreen
          level={currentLevelConfig}
          totalMistakes={totalMistakes}
          timeUsedSeconds={timeUsedSeconds}
          problemCount={session.problems.length}
          recommendedLevel={levelRecommendation}
          recommendationLabel={recommendationLabel}
          remainingSeconds={session.remainingSeconds}
          showWorldChampionshipMessage={showWorldChampionshipMessage}
          onRetry={retrySameLevel}
          onGoRecommended={goRecommendedLevel}
          onBackHome={backHome}
        />
      ) : null}
    </main>
  );
}
