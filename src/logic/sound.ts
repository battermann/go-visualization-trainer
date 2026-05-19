const stoneSoundUrl = `${import.meta.env.BASE_URL}move.ogg`;

let loadedAudio: HTMLAudioElement | null = null;

function getStoneAudio(): HTMLAudioElement | null {
  if (typeof Audio === "undefined") {
    return null;
  }

  if (!loadedAudio) {
    loadedAudio = new Audio(stoneSoundUrl);
    loadedAudio.preload = "auto";
    loadedAudio.volume = 0.7;
  }

  return loadedAudio;
}

export function playStoneClick(): void {
  const audio = getStoneAudio();
  if (!audio) {
    return;
  }

  const player = audio.cloneNode(true) as HTMLAudioElement;
  player.volume = audio.volume;
  player.play().catch(() => {
    // Ignore browser/device audio failures. The board interaction should never fail.
  });
}
