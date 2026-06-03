import { useEffect, useMemo, useRef, useState } from "react";
import { AppHeader } from "./components/AppHeader";
import { ConfirmDialog } from "./components/ConfirmDialog";
import { HomeScreen } from "./components/HomeScreen";
import { LevelOverview } from "./components/LevelOverview";
import { LevelSummaryScreen } from "./components/LevelSummaryScreen";
import { MemorizationScreen } from "./components/MemorizationScreen";
import { MobileMenuDialog } from "./components/MobileMenuDialog";
import { ProblemResultScreen } from "./components/ProblemResultScreen";
import { ReconstructionScreen } from "./components/ReconstructionScreen";
import { SettingsDialog } from "./components/SettingsDialog";
import { LEVELS } from "./data/levels";
import { getRecommendedStartLevel } from "./logic/rankMapping";
import { runScoringSelfCheck, scoreProblem } from "./logic/scoring";
import { prepareStoneClickSound } from "./logic/sound";
import {
  appendSession,
  hasConsecutivePerfectDays,
  loadSettings,
  loadProgress,
  saveSettings,
  saveProgress,
  updateLevel10Streak,
} from "./logic/storage";
import {
  AppState,
  AppProgress,
  AppSettings,
  LevelConfig,
  Problem,
  ThemePreference,
  TrainingSession,
} from "./types";

function getLevelConfig(level: number): LevelConfig {
  const config = LEVELS.find((entry) => entry.level === level);
  if (!config) {
    return LEVELS[0];
  }
  return config;
}

type Route =
  | { screen: "home" }
  | { screen: "level-overview"; level: number }
  | { screen: "training"; level: number };

function getLevelNumberFromRoute(value: string | undefined): number | null {
  if (!value) {
    return null;
  }
  const level = Number(value);
  return isKnownLevel(level) ? level : null;
}

function parseRoute(): Route {
  const path = window.location.hash.replace(/^#\/?/, "");
  if (!path) {
    return { screen: "home" };
  }

  const parts = path.split("/");
  if (parts[0] === "level") {
    const level = getLevelNumberFromRoute(parts[1]);
    if (level === null) {
      return { screen: "home" };
    }
    if (parts[2] === "training") {
      return { screen: "training", level };
    }
    return { screen: "level-overview", level };
  }

  return { screen: "home" };
}

function routePath(route: Route): string {
  if (route.screen === "home") {
    return "#/";
  }
  if (route.screen === "training") {
    return `#/level/${route.level}/training`;
  }
  return `#/level/${route.level}`;
}

function pushRoute(route: Route): void {
  const next = routePath(route);
  if (window.location.hash !== next) {
    window.history.pushState(null, "", next);
  }
}

function replaceRoute(route: Route): void {
  const next = routePath(route);
  if (window.location.hash !== next) {
    window.history.replaceState(null, "", next);
  }
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

function isActiveTrainingState(appState: AppState): boolean {
  return ["memorizing", "pause", "reconstructing", "problem-result"].includes(appState);
}

function resolveThemePreference(theme: ThemePreference): "light" | "dark" {
  if (theme !== "system") {
    return theme;
  }
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

export default function App() {
  const initialProgress = useMemo(() => loadProgress(), []);
  const initialSettings = useMemo(() => loadSettings(), []);
  const initialRoute = useMemo(() => parseRoute(), []);
  const initialRank = initialProgress.lastSelectedRank ?? "15 kyu";
  const initialSessionRecommendation = getStoredSessionRecommendation(initialProgress);
  const initialSelectedLevel =
    initialRoute.screen === "home"
      ? getInitialSelectedLevel(initialProgress, initialRank)
      : initialRoute.level;
  const [progress, setProgress] = useState<AppProgress>(initialProgress);
  const [appState, setAppState] = useState<AppState>(
    initialRoute.screen === "home" ? "home" : "level-overview",
  );
  const [selectedRank, setSelectedRank] = useState<string>(initialRank);
  const [selectedLevel, setSelectedLevel] = useState<number>(initialSelectedLevel);
  const [settings, setSettings] = useState<AppSettings>(initialSettings);
  const [useSessionRecommendation, setUseSessionRecommendation] = useState(
    initialSessionRecommendation !== null,
  );
  const [session, setSession] = useState<TrainingSession | null>(null);
  const [selectedStoneColor, setSelectedStoneColor] = useState<"black" | "white">("black");
  const [pauseCountdown, setPauseCountdown] = useState(3);
  const [lastResultIndex, setLastResultIndex] = useState<number | null>(null);
  const [summarySaved, setSummarySaved] = useState(false);
  const [pendingExitRoute, setPendingExitRoute] = useState<Route | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const sessionRef = useRef<TrainingSession | null>(null);
  const appStateRef = useRef<AppState>(appState);

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
    saveSettings(settings);
  }, [settings]);

  useEffect(() => {
    prepareStoneClickSound(settings.soundVolume);
  }, [settings.soundVolume]);

  useEffect(() => {
    function applyTheme(): void {
      const resolvedTheme = resolveThemePreference(settings.theme);
      document.documentElement.classList.toggle("theme-light", resolvedTheme === "light");
      document.documentElement.classList.toggle("theme-dark", resolvedTheme === "dark");
      document.documentElement.style.colorScheme = resolvedTheme;
    }

    applyTheme();

    if (settings.theme !== "system") {
      return;
    }

    const media = window.matchMedia("(prefers-color-scheme: light)");
    media.addEventListener("change", applyTheme);
    return () => media.removeEventListener("change", applyTheme);
  }, [settings.theme]);

  useEffect(() => {
    sessionRef.current = session;
  }, [session]);

  useEffect(() => {
    appStateRef.current = appState;
  }, [appState]);

  useEffect(() => {
    if (!window.location.hash) {
      replaceRoute({ screen: "home" });
      return;
    }
    if (initialRoute.screen === "training") {
      replaceRoute({ screen: "level-overview", level: initialRoute.level });
    }
  }, [initialRoute]);

  useEffect(() => {
    function applyRoute(): void {
      const route = parseRoute();
      const activeSession = sessionRef.current;
      const leavingActiveTraining =
        activeSession !== null &&
        isActiveTrainingState(appStateRef.current) &&
        (route.screen !== "training" || route.level !== activeSession.level);

      if (leavingActiveTraining) {
        replaceRoute({ screen: "training", level: activeSession.level });
        setPendingExitRoute(route);
        return;
      }

      if (route.screen === "home") {
        setSession(null);
        setAppState("home");
        return;
      }

      setSelectedLevel(route.level);
      setProgress((current) => ({
        ...current,
        lastSelectedLevel: route.level,
      }));

      if (route.screen === "level-overview") {
        setSession(null);
        setAppState("level-overview");
        return;
      }

      setSession((current) => {
        if (current?.level === route.level) {
          return current;
        }
        replaceRoute({ screen: "level-overview", level: route.level });
        setAppState("level-overview");
        return null;
      });
    }

    window.addEventListener("popstate", applyRoute);
    window.addEventListener("hashchange", applyRoute);
    return () => {
      window.removeEventListener("popstate", applyRoute);
      window.removeEventListener("hashchange", applyRoute);
    };
  }, []);

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
    pushRoute({ screen: "level-overview", level: selectedLevel });
  }

  function startLevel(): void {
    const level = getLevelConfig(selectedLevel);
    setSession(buildSession(level));
    setSelectedStoneColor("black");
    setLastResultIndex(null);
    setSummarySaved(false);
    setAppState("memorizing");
    pushRoute({ screen: "training", level: level.level });
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
    pushRoute({ screen: "level-overview", level: levelRecommendation });
  }

  function backHome(): void {
    setMobileMenuOpen(false);
    if (session && isActiveTrainingState(appState)) {
      setPendingExitRoute({ screen: "home" });
      return;
    }
    setSession(null);
    setAppState("home");
    pushRoute({ screen: "home" });
  }

  function chooseSelectedLevel(): void {
    setMobileMenuOpen(false);
    if (session && isActiveTrainingState(appState)) {
      setPendingExitRoute({ screen: "level-overview", level: selectedLevel });
      return;
    }

    setSession(null);
    setAppState("level-overview");
    pushRoute({ screen: "level-overview", level: selectedLevel });
  }

  function cancelTrainingExit(): void {
    setPendingExitRoute(null);
    if (session && isActiveTrainingState(appState)) {
      replaceRoute({ screen: "training", level: session.level });
    }
  }

  function confirmTrainingExit(): void {
    if (!pendingExitRoute) {
      return;
    }
    const nextRoute = pendingExitRoute;
    setPendingExitRoute(null);
    setSession(null);

    if (nextRoute.screen === "home") {
      setAppState("home");
      pushRoute({ screen: "home" });
      return;
    }

    setSelectedLevel(nextRoute.level);
    setProgress((current) => ({
      ...current,
      lastSelectedLevel: nextRoute.level,
    }));
    setAppState("level-overview");
    pushRoute({ screen: "level-overview", level: nextRoute.level });
  }

  const lastSession = progress.sessions[progress.sessions.length - 1];
  const showWorldChampionshipMessage =
    session?.level === (LEVELS[LEVELS.length - 1]?.level ?? null) &&
    totalMistakes === 0 &&
    hasConsecutivePerfectDays(progress.level10PerfectDates);
  const showHeader = appState !== "pause";
  const isTrainingFlow = session !== null && isActiveTrainingState(appState);

  return (
    <div className="app-shell">
      {showHeader ? (
        <AppHeader
          isTraining={isTrainingFlow}
          selectedLevel={selectedLevel}
          onHome={backHome}
          onChooseLevel={chooseSelectedLevel}
          onOpenSettings={() => setSettingsOpen(true)}
          onOpenMenu={() => setMobileMenuOpen(true)}
        />
      ) : null}

      <main className="screen-shell">
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
            onBack={backHome}
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
            soundEnabled={settings.soundEnabled}
            soundVolume={settings.soundVolume}
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
            totalMistakes={totalMistakes}
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

      <SettingsDialog
        open={settingsOpen}
        theme={settings.theme}
        soundEnabled={settings.soundEnabled}
        soundVolume={settings.soundVolume}
        onThemeChange={(theme) => setSettings((current) => ({ ...current, theme }))}
        onSoundEnabledChange={(soundEnabled) =>
          setSettings((current) => ({ ...current, soundEnabled }))
        }
        onSoundVolumeChange={(soundVolume) =>
          setSettings((current) => ({ ...current, soundVolume }))
        }
        onClose={() => setSettingsOpen(false)}
      />
      <MobileMenuDialog
        open={mobileMenuOpen}
        selectedLevel={selectedLevel}
        onClose={() => setMobileMenuOpen(false)}
        onHome={backHome}
        onChooseLevel={chooseSelectedLevel}
        onOpenSettings={() => setSettingsOpen(true)}
      />
      <ConfirmDialog
        open={pendingExitRoute !== null}
        title="Leave training?"
        message="Your current level progress will be lost."
        cancelLabel="Stay in training"
        confirmLabel="Leave training"
        onCancel={cancelTrainingExit}
        onConfirm={confirmTrainingExit}
      />
    </div>
  );
}
