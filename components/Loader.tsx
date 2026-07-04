'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const blessings = [
  'بِسْمِ اللهِ',
  'எல்லா புகழும் இறைவனுக்கே',
  '✨مُحَمَّد صُهَيْب✨',
];

export function Loader() {
  const [phase, setPhase] = useState<'blessing' | 'welcome' | 'done'>('blessing');
  const [blessingIndex, setBlessingIndex] = useState(0);

  useEffect(() => {
    // Show blessings cycling
    let i = 0;
    const blessingInterval = setInterval(() => {
      i++;
      if (i < blessings.length) {
        setBlessingIndex(i);
      } else {
        clearInterval(blessingInterval);
        setPhase('welcome');
      }
    }, 800);

    return () => clearInterval(blessingInterval);
  }, []);

  useEffect(() => {
    if (phase !== 'welcome') return;

    const letters = 'WELCOME'.split('');
    const timers: NodeJS.Timeout[] = [];

    letters.forEach((_, idx) => {
      const timer = setTimeout(() => {
        const el = document.getElementById(`loader-letter-${idx}`);
        if (el) el.classList.add('show');
      }, idx * 100);
      timers.push(timer);
    });

    // Hold, then fade out
    const hold = setTimeout(() => {
      letters.forEach((_, idx) => {
        const el = document.getElementById(`loader-letter-${idx}`);
        if (el) {
          el.classList.remove('show');
          el.classList.add('hide');
        }
      });
    }, 2000);

    const done = setTimeout(() => {
      setPhase('done');
    }, 2700);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(hold);
      clearTimeout(done);
    };
  }, [phase]);

  if (phase === 'done') return null;

  return (
    <div className="loader-overlay">
      <AnimatePresence mode="wait">
        {phase === 'blessing' && (
          <motion.p
            key={blessingIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="text-2xl md:text-3xl font-arabic text-[#8B5E3C] text-center px-4"
            dir="rtl"
          >
            {blessings[blessingIndex]}
          </motion.p>
        )}
      </AnimatePresence>

      {phase === 'welcome' && (
        <div className="flex items-center gap-2 md:gap-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
          {'WELCOME'.split('').map((letter, idx) => (
            <span
              key={idx}
              id={`loader-letter-${idx}`}
              className="loader-letter"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {letter}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
