'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Chip {
  id: string;
  label: string;
  hoverLabel: string;
  icon: string;
  color: string;
  cx: number;
  cy: number;
  desc: string;
}

const chips: Chip[] = [
  { id: 'stm32', label: 'STM32', hoverLabel: 'Computer Vision', icon: '📷', color: '#5A9BD5', cx: 105, cy: 65, desc: 'Real-time image processing' },
  { id: 'python', label: 'Python', hoverLabel: 'AI / ML', icon: '🧠', color: '#F0DB4F', cx: 230, cy: 55, desc: 'Neural networks & inference' },
  { id: 'esp32', label: 'ESP32', hoverLabel: 'IoT', icon: '📡', color: '#4CAF50', cx: 95, cy: 155, desc: 'Sensor data & connectivity' },
  { id: 'nextjs', label: 'Next.js', hoverLabel: 'Full Stack', icon: '🌐', color: '#FFFFFF', cx: 235, cy: 145, desc: 'Web apps & dashboards' },
];

interface Trace {
  path: string;
  chipIdx: number;
}

const traces: Trace[] = [
  { path: 'M112,78 Q135,85 150,95', chipIdx: 0 },
  { path: 'M225,68 Q200,80 185,95', chipIdx: 1 },
  { path: 'M105,142 Q130,120 155,105', chipIdx: 2 },
  { path: 'M225,132 Q205,115 185,105', chipIdx: 3 },
];

export function InteractivePCB() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotation({ x: -y * 20, y: x * 20 });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setHovered(null);
  };

  const hoveredChip = chips.find((c) => c.id === hovered);
  const isHovered = hovered !== null;

  const boardV = [
    [170, 18],
    [310, 100],
    [170, 187],
    [30, 100],
  ] as const;

  return (
    <div className="relative mx-auto mb-6" ref={containerRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <motion.div
        className="relative"
        style={{ width: 340, height: 220, perspective: 900, transformStyle: 'preserve-3d' }}
        animate={{ rotateX: rotation.x, rotateY: rotation.y }}
        transition={{ type: 'spring', stiffness: 80, damping: 12 }}
      >
        {/* Floating tech cards */}
        <motion.div
          className="absolute pointer-events-none select-none"
          style={{ left: -10, top: 0 }}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0 }}
        >
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-medium whitespace-nowrap" style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(6px)', border: '1px solid rgba(139,94,60,0.15)', color: '#4A3728' }}>
            <span>📷</span> Computer Vision
          </div>
        </motion.div>
        <motion.div
          className="absolute pointer-events-none select-none"
          style={{ right: -15, top: -8 }}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
        >
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-medium whitespace-nowrap" style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(6px)', border: '1px solid rgba(139,94,60,0.15)', color: '#4A3728' }}>
            <span>🧠</span> AI / ML
          </div>
        </motion.div>
        <motion.div
          className="absolute pointer-events-none select-none"
          style={{ left: -20, bottom: 5 }}
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        >
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-medium whitespace-nowrap" style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(6px)', border: '1px solid rgba(139,94,60,0.15)', color: '#4A3728' }}>
            <span>📡</span> IoT
          </div>
        </motion.div>
        <motion.div
          className="absolute pointer-events-none select-none"
          style={{ right: -5, bottom: -5 }}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
        >
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-medium whitespace-nowrap" style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(6px)', border: '1px solid rgba(139,94,60,0.15)', color: '#4A3728' }}>
            <span>🌐</span> Full Stack
          </div>
        </motion.div>

        <svg viewBox="0 0 340 220" className="w-full h-full drop-shadow-lg" style={{ transformStyle: 'preserve-3d' }}>
          <defs>
            <linearGradient id="boardFill" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1E3A2E" />
              <stop offset="50%" stopColor="#2A4A3A" />
              <stop offset="100%" stopColor="#1A3028" />
            </linearGradient>
            <linearGradient id="coreGlow" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#C17A4F" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#8B5E3C" stopOpacity="0.9" />
            </linearGradient>
            <filter id="glowFilter">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="strongGlow">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="shadow">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.4" />
            </filter>
            <radialGradient id="corePulse" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#C17A4F" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#C17A4F" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Shadow */}
          <polygon
            points={`${boardV[0][0]+4},${boardV[0][1]+6} ${boardV[1][0]+4},${boardV[1][1]+6} ${boardV[2][0]+4},${boardV[2][1]+6} ${boardV[3][0]+4},${boardV[3][1]+6}`}
            fill="rgba(0,0,0,0.2)"
            filter="url(#shadow)"
          />

          {/* Board bottom edge (3D depth) */}
          <polygon
            points={`${boardV[0][0]},${boardV[0][1]+8} ${boardV[1][0]},${boardV[1][1]+8} ${boardV[2][0]},${boardV[2][1]+8} ${boardV[3][0]},${boardV[3][1]+8}`}
            fill="#0D1F15"
          />
          <polygon
            points={`${boardV[3][0]},${boardV[3][1]} ${boardV[0][0]},${boardV[0][1]} ${boardV[0][0]},${boardV[0][1]+8} ${boardV[3][0]},${boardV[3][1]+8}`}
            fill="#15281D"
          />
          <polygon
            points={`${boardV[1][0]},${boardV[1][1]} ${boardV[2][0]},${boardV[2][1]} ${boardV[2][0]},${boardV[2][1]+8} ${boardV[1][0]},${boardV[1][1]+8}`}
            fill="#15281D"
          />

          {/* Board surface */}
          <polygon
            points={boardV.map((v) => `${v[0]},${v[1]}`).join(' ')}
            fill="url(#boardFill)"
            stroke="#3A6B4E"
            strokeWidth="0.8"
          />

          {/* Board edge glow (golden/bronze) */}
          <polygon
            points={boardV.map((v) => `${v[0]},${v[1]}`).join(' ')}
            fill="none"
            stroke={isHovered ? '#C17A4F' : '#5A8B6E'}
            strokeWidth="1"
            opacity={isHovered ? 0.6 : 0.3}
          />

          {/* Board corner holes */}
          {[[172,22],[308,100],[170,184],[32,100]].map(([cx, cy], i) => (
            <circle key={`hole-${i}`} cx={cx} cy={cy} r="4" fill="#0D1F15" stroke="#3A6B4E" strokeWidth="0.5" />
          ))}

          {/* Decorative copper traces on board */}
          <line x1="40" y1="30" x2="60" y2="28" stroke="#6B8F7A" strokeWidth="0.6" opacity="0.3" />
          <line x1="280" y1="175" x2="300" y2="173" stroke="#6B8F7A" strokeWidth="0.6" opacity="0.3" />
          <line x1="45" y1="170" x2="55" y2="168" stroke="#6B8F7A" strokeWidth="0.6" opacity="0.3" />
          <line x1="290" y1="35" x2="300" y2="33" stroke="#6B8F7A" strokeWidth="0.6" opacity="0.3" />

          {/* Circuit traces connecting chips to core */}
          {traces.map((trace, i) => {
            const isActive = hovered === chips[trace.chipIdx].id || hovered === 'core';
            return (
              <g key={`trace-${i}`}>
                <motion.path
                  d={trace.path}
                  fill="none"
                  stroke={isActive ? '#C17A4F' : '#5A8B6E'}
                  strokeWidth={isActive ? 2 : 1}
                  opacity={isActive ? 0.9 : 0.35}
                  strokeDasharray={isActive ? '4,3' : 'none'}
                  initial={false}
                  animate={isActive ? { strokeDashoffset: [0, -20] } : {}}
                  transition={isActive ? { duration: 0.8, repeat: Infinity, ease: 'linear' } : {}}
                  style={{ transition: 'stroke 0.3s, stroke-width 0.3s, opacity 0.3s' }}
                />
                {/* Light dots pulsing on active traces */}
                {isActive && Array.from({ length: 4 }).map((_, di) => (
                  <circle
                    key={`dot-${i}-${di}`}
                    r="1.5"
                    fill="#FFD700"
                    filter="url(#glowFilter)"
                    style={{ offsetPath: `path('${trace.path}')`, offsetDistance: `${di * 33}%` }}
                    className="trace-dot"
                  />
                ))}
              </g>
            );
          })}

          {/* AI Core */}
          <g
            onMouseEnter={() => setHovered('core')}
            style={{ cursor: 'pointer' }}
          >
            {/* Core glow ring */}
            <circle cx="170" cy="100" r="28" fill="url(#corePulse)" filter="url(#strongGlow)">
              <animate attributeName="r" values="25;32;25" dur="2.5s" repeatCount="indefinite" />
            </circle>
            {/* Core hexagon */}
            <polygon
              points="170,76 192,88 192,112 170,124 148,112 148,88"
              fill="#1A1A2E"
              stroke={hovered === 'core' ? '#C17A4F' : '#5A8B6E'}
              strokeWidth="1.5"
              filter={hovered === 'core' ? 'url(#strongGlow)' : undefined}
            >
              {hovered === 'core' && <animate attributeName="stroke-width" values="1.5;2.5;1.5" dur="1s" repeatCount="indefinite" />}
            </polygon>
            {/* Core inner highlight */}
            <polygon
              points="170,80 189,90 189,110 170,120 151,110 151,90"
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="0.5"
            />
            {/* Core label */}
            <text x="170" y="97" textAnchor="middle" fontSize="6" fill="#C17A4F" fontFamily="monospace" fontWeight="bold">AI</text>
            <text x="170" y="105" textAnchor="middle" fontSize="5" fill="#8BB8E0" fontFamily="monospace" opacity="0.7">CORE</text>
            {/* Core pins */}
            {[0,1,2,3,4,5].map((p) => (
              <rect
                key={`cp-${p}`}
                x={[164, 176][p%2]}
                y={[126, 120, 130][Math.floor(p/2)]}
                width="2"
                height="3"
                rx="0.5"
                fill="#8BB8E0"
                opacity="0.5"
                transform={`rotate(${p*60}, 170, 100)`}
                style={{ transformOrigin: '170px 100px' }}
              />
            ))}
          </g>

          {/* Chips */}
          {chips.map((chip, ci) => {
            const isActive = hovered === chip.id;
            return (
              <g
                key={chip.id}
                onMouseEnter={() => setHovered(chip.id)}
                style={{ cursor: 'pointer' }}
              >
                {/* Chip glow */}
                {isActive && (
                  <circle cx={chip.cx} cy={chip.cy} r="22" fill={chip.color} opacity="0.12" filter="url(#strongGlow)" />
                )}
                {/* Chip body */}
                <rect
                  x={chip.cx - 16}
                  y={chip.cy - 12}
                  width="32"
                  height="24"
                  rx="3"
                  fill="#1A1A2E"
                  stroke={isActive ? chip.color : '#3A5A6A'}
                  strokeWidth="1"
                  filter={isActive ? 'url(#glowFilter)' : undefined}
                  opacity={isActive ? 1 : 0.8}
                >
                  {isActive && <animate attributeName="stroke-width" values="1;1.8;1" dur="0.8s" repeatCount="indefinite" />}
                </rect>
                {/* Chip pins left */}
                {[0,1,2].map((p) => (
                  <rect key={`pl-${ci}-${p}`} x={chip.cx - 20} y={chip.cy - 8 + p * 8} width="4" height="2" rx="0.5" fill={isActive ? chip.color : '#5A7A8A'} opacity={isActive ? 0.9 : 0.4} />
                ))}
                {/* Chip pins right */}
                {[0,1,2].map((p) => (
                  <rect key={`pr-${ci}-${p}`} x={chip.cx + 16} y={chip.cy - 8 + p * 8} width="4" height="2" rx="0.5" fill={isActive ? chip.color : '#5A7A8A'} opacity={isActive ? 0.9 : 0.4} />
                ))}
                {/* Chip label */}
                <text x={chip.cx} y={chip.cy + 4} textAnchor="middle" fontSize="7" fill={isActive ? chip.color : '#8BB8E0'} fontFamily="monospace" fontWeight="bold">
                  {chip.label}
                </text>
              </g>
            );
          })}

          {/* Hover tooltip */}
          <AnimatePresence>
            {hovered && (
              <motion.g
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
              >
                {(() => {
                  const chip = hoveredChip;
                  if (!chip) return null;
                  return (
                    <g>
                      <rect x={chip.cx - 48} y={chip.cy - 42} width="96" height="24" rx="6" fill="#8B5E3C" filter="url(#shadow)" />
                      <text x={chip.cx} y={chip.cy - 28} textAnchor="middle" fontSize="8" fill="#E8DFCF" fontFamily="Arial" fontWeight="bold">
                        <tspan fill="#FFD700">{chip.label}</tspan>
                        <tspan fill="#E8DFCF"> {'→'} </tspan>
                        <tspan fill="white">{chip.hoverLabel}</tspan>
                      </text>
                      <text x={chip.cx} y={chip.cy - 36} textAnchor="middle" fontSize="6" fill="rgba(255,255,255,0.6)" fontFamily="Arial">
                        {chip.desc}
                      </text>
                    </g>
                  );
                })()}
              </motion.g>
            )}
          </AnimatePresence>
        </svg>
      </motion.div>
    </div>
  );
}
