const stoneSoundUrl = `${import.meta.env.BASE_URL}move.ogg`;

let audioPool: HTMLAudioElement[] = [];
let nextAudioIndex = 0;

function safeVolume(value: number): number {
  return Math.min(1, Math.max(0, Number.isFinite(value) ? value : 0.7));
}

function createStoneAudio(volume: number): HTMLAudioElement {
  const audio = new Audio(stoneSoundUrl);
  audio.preload = "auto";
  audio.volume = safeVolume(volume);
  audio.load();
  return audio;
}

function getStoneAudioPool(volume: number): HTMLAudioElement[] {
  if (typeof Audio === "undefined") {
    return [];
  }

  if (audioPool.length === 0) {
    audioPool = Array.from({ length: 4 }, () => createStoneAudio(volume));
  }

  return audioPool;
}

export function prepareStoneClickSound(volume = 0.7): void {
  const pool = getStoneAudioPool(volume);
  for (const audio of pool) {
    audio.volume = safeVolume(volume);
  }
}

export function playStoneClick(): void {
  playStoneClickWithSettings(true, 0.7);
}

export function playStoneClickWithSettings(enabled: boolean, volume: number): void {
  if (!enabled) {
    return;
  }

  const pool = getStoneAudioPool(volume);
  if (pool.length === 0) {
    return;
  }

  const player = pool[nextAudioIndex % pool.length];
  nextAudioIndex += 1;
  player.pause();
  player.currentTime = 0;
  player.volume = safeVolume(volume);
  player.play().catch(() => {
    // Ignore browser/device audio failures. The board interaction should never fail.
  });
}
