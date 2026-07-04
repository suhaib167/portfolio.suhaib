'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Loader2 } from 'lucide-react';

interface LeetCodeStats {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  ranking: number;
}

export function LiveLeetCodeBadge() {
  const [stats, setStats] = useState<LeetCodeStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/github?type=leetcode');
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch {
        // Silently fail
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-6">
        <Loader2 className="animate-spin" size={20} style={{ color: '#8B5E3C' }} />
      </div>
    );
  }

  if (!stats) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-xs mx-auto my-8"
    >
      <style>{`
        .lc-card { transition: border-color 0.3s; }
        .lc-card:hover { border-color: rgba(139,94,60,0.3) !important; }
      `}</style>
      <a
        href="https://leetcode.com/MohamedSuhaib"
        target="_blank"
        rel="noopener noreferrer"
        className="block card-warm p-5 rounded-2xl group lc-card"
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium" style={{ color: '#4A3728' }}>LeetCode Stats</span>
          <ExternalLink size={14} style={{ color: '#8B5E3C' }} />
        </div>
        <div className="text-3xl font-bold mb-2" style={{ color: '#1A1A1A' }}>
          {stats.totalSolved}
          <span className="text-base ml-1" style={{ color: '#4A3728' }}>solved</span>
        </div>
        <div className="flex gap-2 text-xs">
          <span style={{ color: '#4A3728' }}>Easy {stats.easySolved}</span>
          <span style={{ color: '#8B5E3C' }}>Med {stats.mediumSolved}</span>
          <span style={{ color: '#C17A4F' }}>Hard {stats.hardSolved}</span>
        </div>
      </a>
    </motion.div>
  );
}
