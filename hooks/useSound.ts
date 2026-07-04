'use client';

import { useCallback, useRef } from 'react';

const soundCache = new Map<string, HTMLAudioElement>();

const SOUNDS = {
  hover: 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=',
  click: 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=',
  success: 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=',
};

export function useSound() {
  const enabled = useRef(true);

  const play = useCallback((sound: keyof typeof SOUNDS) => {
    if (!enabled.current || typeof window === 'undefined') return;
    try {
      if (!soundCache.has(sound)) {
        const audio = new Audio(SOUNDS[sound]);
        audio.volume = 0.15;
        soundCache.set(sound, audio);
      }
      const audio = soundCache.get(sound)!;
      audio.currentTime = 0;
      audio.play().catch(() => {});
    } catch {}
  }, []);

  const toggle = useCallback(() => {
    enabled.current = !enabled.current;
    return enabled.current;
  }, []);

  return { play, toggle, enabled };
}