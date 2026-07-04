'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 500);
    };
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={scrollToTop}
          className="fixed bottom-20 right-6 z-50 p-3 rounded-full btt-btn"
          style={{
            background: 'rgba(255,255,255,0.25)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(139,94,60,0.15)',
          }}
          aria-label="Back to top"
        >
          <ArrowUp size={18} style={{ color: '#8B5E3C' }} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
