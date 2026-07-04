'use client';

import { useEffect, useRef, useCallback } from 'react';

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  const handleClick = useCallback((e: MouseEvent) => {
    const ring = document.createElement('div');
    ring.className = 'cursor-ring-effect';
    ring.style.left = `${e.clientX}px`;
    ring.style.top = `${e.clientY}px`;
    document.body.appendChild(ring);
    setTimeout(() => ring.remove(), 600);
  }, []);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };

    const update = () => {
      const dot = dotRef.current;
      if (dot) {
        dot.style.transform = `translate(${posRef.current.x - 5}px, ${posRef.current.y - 5}px)`;
      }
      rafRef.current = requestAnimationFrame(update);
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('click', handleClick);
    rafRef.current = requestAnimationFrame(update);

    // Hover effect for interactive elements
    const addHover = () => dotRef.current?.classList.add('hovering');
    const removeHover = () => dotRef.current?.classList.remove('hovering');

    document.querySelectorAll('a, button, input, textarea, [data-cursor-hover]').forEach((el) => {
      el.addEventListener('mouseenter', addHover);
      el.addEventListener('mouseleave', removeHover);
    });

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(rafRef.current);
      document.querySelectorAll('a, button, input, textarea, [data-cursor-hover]').forEach((el) => {
        el.removeEventListener('mouseenter', addHover);
        el.removeEventListener('mouseleave', removeHover);
      });
    };
  }, [handleClick]);

  useEffect(() => {
    const cursor = document.querySelector('.custom-cursor') as HTMLElement;
    if (cursor) cursor.style.display = 'block';
  }, []);

  return (
    <div className="custom-cursor">
      <div ref={dotRef} className="cursor-dot" />
    </div>
  );
}
