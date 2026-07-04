'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Loader2 } from 'lucide-react';

interface SpotifyData {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  albumArt?: string;
  songUrl?: string;
}

export function SpotifyWidget() {
  const [data, setData] = useState<SpotifyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const fetchSpotify = async () => {
      try {
        const res = await fetch('/api/spotify');
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch {
        // Not critical
      } finally {
        setLoading(false);
      }
    };
    fetchSpotify();
    const interval = setInterval(fetchSpotify, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="fixed bottom-6 left-6 z-50 p-2 rounded-full" style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)' }}>
        <Loader2 size={16} className="animate-spin" style={{ color: '#8B5E3C' }} />
      </div>
    );
  }

  if (!data?.isPlaying) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed bottom-6 left-6 z-50"
    >
      <motion.button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 p-2 rounded-full transition-all duration-300"
        style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', border: '1px solid rgba(139,94,60,0.15)' }}
        animate={{ width: expanded ? 'auto' : '40px' }}
        layout
      >
        <Music size={16} className="shrink-0" style={{ color: '#8B5E3C' }} />
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              className="flex items-center gap-2 overflow-hidden text-xs"
            >
              <span className="truncate max-w-[140px]" style={{ color: '#4A3728' }}>
                {data.title} — {data.artist}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.div>
  );
}
