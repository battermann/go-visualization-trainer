import { AppProgress, AppSettings, SessionResult } from "../types";

const STORAGE_KEY = "go-visualization-trainer-progress-v1";
const SETTINGS_STORAGE_KEY = "go-visualization-trainer-settings-v1";

const EMPTY_PROGRESS: AppProgress = {
  sessions: [],
  level10PerfectDates: [],
};

const DEFAULT_SETTINGS: AppSettings = {
  theme: "dark",
  soundEnabled: true,
  soundVolume: 0.7,
};

function normalizeVolume(value: unknown): number {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return DEFAULT_SETTINGS.soundVolume;
  }
  return Math.min(1, Math.max(0, value));
}

export function loadProgress(): AppProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { ...EMPTY_PROGRESS };
    }
    const parsed = JSON.parse(raw) as Partial<AppProgress>;
    return {
      lastSelectedRank: parsed.lastSelectedRank,
      lastSelectedLevel: parsed.lastSelectedLevel,
      sessions: Array.isArray(parsed.sessions) ? parsed.sessions : [],
      level10PerfectDates: Array.isArray(parsed.level10PerfectDates)
        ? parsed.level10PerfectDates
        : [],
    };
  } catch {
    return { ...EMPTY_PROGRESS };
  }
}

export function saveProgress(progress: AppProgress): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function loadSettings(): AppSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!raw) {
      return { ...DEFAULT_SETTINGS };
    }
    const parsed = JSON.parse(raw) as Partial<AppSettings>;
    return {
      theme:
        parsed.theme === "light" || parsed.theme === "dark" || parsed.theme === "system"
          ? parsed.theme
          : DEFAULT_SETTINGS.theme,
      soundEnabled:
        typeof parsed.soundEnabled === "boolean"
          ? parsed.soundEnabled
          : DEFAULT_SETTINGS.soundEnabled,
      soundVolume: normalizeVolume(parsed.soundVolume),
    };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

export function saveSettings(settings: AppSettings): void {
  localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
}

export function appendSession(progress: AppProgress, session: SessionResult): AppProgress {
  return {
    ...progress,
    sessions: [...progress.sessions, session],
  };
}

export function updateLevel10Streak(
  progress: AppProgress,
  level: number,
  totalMistakes: number,
  date: string,
): AppProgress {
  if (level !== 10) {
    return progress;
  }
  if (totalMistakes !== 0) {
    return {
      ...progress,
      level10PerfectDates: [],
    };
  }

  const dates = new Set(progress.level10PerfectDates);
  dates.add(date);
  return {
    ...progress,
    level10PerfectDates: Array.from(dates).sort(),
  };
}

function toDayNumber(date: string): number {
  const d = new Date(`${date}T00:00:00Z`);
  return Math.floor(d.getTime() / 86400000);
}

export function hasConsecutivePerfectDays(dates: string[], requiredDays = 7): boolean {
  if (dates.length < requiredDays) {
    return false;
  }
  const dayNumbers = Array.from(new Set(dates.map(toDayNumber))).sort((a, b) => a - b);
  let streak = 1;
  let best = 1;

  for (let i = 1; i < dayNumbers.length; i += 1) {
    if (dayNumbers[i] === dayNumbers[i - 1] + 1) {
      streak += 1;
      best = Math.max(best, streak);
    } else {
      streak = 1;
    }
  }
  return best >= requiredDays;
}
