import { useCallback, useMemo } from 'react';

// Create audio objects once and reuse them
const clickAudio = typeof Audio !== 'undefined' ? new Audio('/sounds/click.mp3') : null;
if (clickAudio) clickAudio.volume = 0.5;

const hoverAudio = typeof Audio !== 'undefined' ? new Audio('/sounds/hover.mp3') : null;
if (hoverAudio) hoverAudio.volume = 0.2;

export const useSound = () => {
  const playClick = useCallback(() => {
    if (clickAudio) {
      clickAudio.currentTime = 0;
      clickAudio.play().catch(() => {});
    }
  }, []);

  const playHover = useCallback(() => {
    if (hoverAudio) {
      hoverAudio.currentTime = 0;
      hoverAudio.play().catch(() => {});
    }
  }, []);

  return { playClick, playHover };
};