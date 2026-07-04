'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export function AnimatedText({ text, className = '', delay = 0 }: AnimatedTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const words = text.split(' ');

  return (
    <span ref={ref} className={className}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {word.split('').map((char, charIndex) => (
            <motion.span
              key={`${wordIndex}-${charIndex}`}
              initial={{ opacity: 0, y: 20, rotateX: 90 }}
              animate={
                isInView
                  ? { opacity: 1, y: 0, rotateX: 0 }
                  : { opacity: 0, y: 20, rotateX: 90 }
              }
              transition={{
                duration: 0.4,
                delay: delay + wordIndex * 0.15 + charIndex * 0.03,
                type: 'spring',
                stiffness: 100,
                damping: 10,
              }}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
          {/* Space between words */}
          <span className="inline-block">&nbsp;</span>
        </span>
      ))}
    </span>
  );
}