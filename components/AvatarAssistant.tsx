'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const messages = [
  '👋 Hi, I\'m Suhaib!',
  'Welcome!',
  'Check my projects!',
  'Let\'s collaborate!',
];

export function AvatarAssistant() {
  const [msgIndex, setMsgIndex] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((i) => (i + 1) % messages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="avatar-assistant" className="fixed bottom-6 right-6 z-50 flex items-end gap-3">
      <AnimatePresence mode="wait">
        {show && (
          <motion.div
            key={msgIndex}
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="px-4 py-2 rounded-2xl text-sm shadow-sm"
            style={{
              background: 'rgba(255,255,255,0.3)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(139,94,60,0.1)',
              color: '#1A1A1A',
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {messages[msgIndex]}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setShow(!show)}
        className="w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-lg transition-transform hover:scale-110"
        style={{ background: '#8B5E3C' }}
        aria-label="Assistant"
      >
        🧑‍💻
      </button>
    </div>
  );
}
