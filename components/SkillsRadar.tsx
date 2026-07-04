'use client';

import { motion } from 'framer-motion';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from 'recharts';
import { radarSkills } from '@/lib/data';

export function SkillsRadar() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
        >
          <motion.h2
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
          >
            Skill <span className="gradient-text">Distribution</span>
          </motion.h2>
          <motion.div
            variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }}
            transition={{ duration: 0.6 }}
            className="glass p-6 rounded-2xl max-w-xl mx-auto"
          >
            <ResponsiveContainer width="100%" height={350}>
              <RadarChart data={radarSkills} cx="50%" cy="50%" outerRadius="75%">
                <defs>
                  <linearGradient id="radarGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#34d399" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#22d3ee" stopOpacity={0.3} />
                  </linearGradient>
                </defs>
                <PolarGrid stroke="rgba(255,255,255,0.08)" />
                <PolarAngleAxis
                  dataKey="skill"
                  tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }}
                />
                <PolarRadiusAxis
                  angle={30}
                  domain={[0, 100]}
                  tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 9 }}
                  axisLine={false}
                />
                <Radar
                  name="Skills"
                  dataKey="level"
                  stroke="#34d399"
                  fill="url(#radarGradient)"
                  strokeWidth={2}
                  dot={{ r: 3, fill: '#34d399', strokeWidth: 0 }}
                  activeDot={{ r: 5, fill: '#22d3ee' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}