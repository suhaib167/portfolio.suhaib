'use client';

import { motion } from 'framer-motion';
import { skills } from '@/lib/data';

const categories = [
  { key: 'programming', label: 'Programming Languages' },
  { key: 'embedded', label: 'Embedded Systems' },
  { key: 'ai-ml', label: 'AI & Machine Learning' },
  { key: 'tools', label: 'Tools & Platforms' },
] as const;

export function Skills() {
  return (
    <section id="skills" className="section-container">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
        }}
      >
        <motion.h2
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
          style={{ color: '#1A1A1A' }}
        >
          Technical <span className="gradient-text">Skills</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {categories.map((cat) => (
            <motion.div
              key={cat.key}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="card-warm p-6"
            >
              <h3 className="text-sm uppercase tracking-widest mb-5" style={{ color: '#4A3728' }}>
                {cat.label}
              </h3>
              <div className="space-y-4">
                {skills
                  .filter((s) => s.category === cat.key)
                  .map((skill) => (
                    <div key={skill.name} className="group">
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="group-hover:transition-colors duration-200" style={{ color: '#4A3728' }}>
                          {skill.name}
                        </span>
                        <span className="font-mono text-xs" style={{ color: '#8B5E3C' }}>
                          {skill.proficiency}%
                        </span>
                      </div>
                      <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(139,94,60,0.1)' }}>
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.proficiency}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                          className="h-full rounded-full bg-gradient-to-r from-[#8B5E3C] to-[#C17A4F]"
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
