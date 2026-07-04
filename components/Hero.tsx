'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles, Code, Mail } from 'lucide-react';
import Link from 'next/link';
import { profile } from '@/lib/data';
import { InteractivePCB } from './InteractivePCB';

const particles = [
  { left: 15.8, top: 48.4, dur: 4, delay: 0 },
  { left: 44.6, top: 12.8, dur: 5, delay: 0.5 },
  { left: 22.7, top: 24.9, dur: 3.5, delay: 1 },
  { left: 32.2, top: 10.7, dur: 4.5, delay: 0.2 },
  { left: 18.9, top: 5.4, dur: 3, delay: 1.5 },
  { left: 39.8, top: 66.8, dur: 6, delay: 0.8 },
  { left: 37.3, top: 66.2, dur: 4, delay: 2 },
  { left: 74.9, top: 13.2, dur: 5, delay: 0.3 },
  { left: 95.0, top: 22.4, dur: 3.5, delay: 1.2 },
  { left: 47.0, top: 53.0, dur: 4.5, delay: 0.7 },
  { left: 81.3, top: 62.5, dur: 5.5, delay: 1.8 },
  { left: 73.3, top: 5.9, dur: 3, delay: 0.1 },
];

const bgTraces = [
  { d: 'M-50,200 Q100,150 250,220 T550,180', delay: 0 },
  { d: 'M-30,100 Q80,60 200,120 T500,90', delay: 0.5 },
  { d: 'M100,300 Q200,280 300,320 T600,290', delay: 1 },
  { d: 'M400,-20 Q480,50 550,20 T700,50', delay: 0.3 },
];

function AnimatedName({ name }: { name: string }) {
  const chars = useMemo(() => name.split(''), [name]);
  return (
    <motion.h1
      className="text-[clamp(2.2rem,6vw,3.8rem)] font-extrabold mb-2"
      style={{
        fontFamily: "'Poppins', 'Inter', sans-serif",
        color: '#1A1A1A',
        letterSpacing: '-0.04em',
        lineHeight: 1,
      }}
    >
      <motion.span
        className="block text-base md:text-lg font-normal mb-1"
        style={{ color: '#4A3728', letterSpacing: '-0.02em' }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        Hello, I&apos;m
      </motion.span>
      <span className="block">
        {chars.map((char, i) => (
          <motion.span
            key={i}
            className="inline-block gradient-text"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 + i * 0.04, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </span>
    </motion.h1>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#E8DFCF] via-[#E8DFCF] to-[#E5DDCD]" />
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, rgba(255,255,255,0.18), transparent 70%)',
        }}
      />

      {/* Background tech pattern - faint PCB traces */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.04]" viewBox="0 0 600 400" preserveAspectRatio="none">
        {bgTraces.map((t, i) => (
          <motion.path
            key={i}
            d={t.d}
            fill="none"
            stroke="#8B5E3C"
            strokeWidth="2"
            strokeDasharray="4,6"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 4, delay: t.delay, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }}
          />
        ))}
        {/* Tiny circuit dots */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.circle
            key={`dot-${i}`}
            cx={30 + i * 28 + (i % 3) * 10}
            cy={20 + (i % 5) * 40}
            r="1.5"
            fill="#8B5E3C"
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{ duration: 3, delay: i * 0.3, repeat: Infinity }}
          />
        ))}
      </svg>

      {/* Grain */}
      <div className="absolute inset-0 bg-grain opacity-30" />

      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{ background: '#8B5E3C', left: `${p.left}%`, top: `${p.top}%` }}
            animate={{ opacity: [0, 0.3, 0], y: [0, -30] }}
            transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
  <div className="flex justify-center mb-6">
    <InteractivePCB />
  </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm mb-6"
          style={{ color: '#2C3E5D', letterSpacing: '-0.01em' }}
        >
          <Sparkles size={14} className="text-[#8B5E3C]" />
          Electronics & Communication Engineer
        </motion.p>

        <AnimatedName name={profile.name} />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="text-base md:text-lg mb-2"
          style={{ color: '#2C3E5D', letterSpacing: '-0.02em' }}
        >
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.5 }}
          className="text-sm md:text-base mb-8"
          style={{ color: '#4A3728' }}
        >
          Full Stack Developer · AI Enthusiast
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.5 }}
          className="text-sm md:text-base mb-10 leading-relaxed max-w-lg mx-auto"
          style={{ color: '#4A5568' }}
        >
          Working .....
          <br />
          Soon to be updated...........
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9, duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <style>{`
            .hero-btn-primary { background: #8B5E3C; transition: background 0.3s; }
            .hero-btn-primary:hover { background: #C17A4F; }
            .hero-btn-secondary { background: rgba(139,94,60,0.1); color: #8B5E3C; border: 1px solid rgba(139,94,60,0.2); transition: background 0.3s; }
            .hero-btn-secondary:hover { background: rgba(139,94,60,0.2); }
          `}</style>
          <Link
            href="#projects"
            className="group px-8 py-3 rounded-full text-white font-medium inline-flex items-center gap-2 hero-btn-primary"
          >
            <Code size={18} />
            View My Work
          </Link>
          <Link
            href="#contact"
            className="px-8 py-3 rounded-full font-medium inline-flex items-center gap-2 hero-btn-secondary"
          >
            <Mail size={18} />
            Let&apos;s Connect
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs tracking-widest uppercase" style={{ color: '#8B5E3C' }}>Scroll Down</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ color: '#8B5E3C' }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
