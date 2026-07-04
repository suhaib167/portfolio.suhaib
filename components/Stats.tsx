'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code2, Briefcase, Award, Terminal } from 'lucide-react';
import { stats as statsData } from '@/lib/data';

const statsList = [
  { label: 'Projects Built', value: statsData.projectsCompleted, icon: Code2, suffix: '+' },
  { label: 'Internships', value: statsData.internships, icon: Briefcase },
  { label: 'Certifications', value: statsData.certifications, icon: Award },
  { label: 'LeetCode Solved', value: statsData.leetcodeSolved, icon: Terminal, suffix: '+' },
];

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section className="py-16 relative">
      <style>{`
        .stat-card { transition: border-color 0.3s; }
        .stat-card:hover { border-color: rgba(139,94,60,0.3) !important; }
      `}</style>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {statsList.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="card-warm p-6 text-center group stat-card"
            >
              <div className="flex justify-center mb-3">
                <stat.icon size={24} style={{ color: '#8B5E3C' }} className="group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="text-3xl md:text-4xl font-bold mb-1 tabular-nums" style={{ color: '#1A1A1A' }}>
                <AnimatedCounter target={stat.value} suffix={stat.suffix || ''} />
              </div>
              <div className="text-sm" style={{ color: '#4A3728' }}>{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
