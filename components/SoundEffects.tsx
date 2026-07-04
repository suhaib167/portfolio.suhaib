'use client';

import { useEffect } from 'react';
import { useSound } from '@/hooks/useSound';

export function SoundEffects() {
  const { play } = useSound();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"]')) {
        play('click');
      }
    };
    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-cursor-hover]')) {
        play('hover');
      }
    };

    window.addEventListener('click', handleClick);
    window.addEventListener('mouseover', handleHover);
    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('mouseover', handleHover);
    };
  }, [play]);

  return null; // invisible component
}