'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin, Briefcase } from 'lucide-react';
import { experiences } from '@/lib/data';
import { formatDate } from '@/lib/utils';

export function Experience() {
  return (
    <section id="experience" className="section-container">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
        }}
      >
        <motion.h2
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
          style={{ color: '#1A1A1A' }}
        >
          Professional <span className="gradient-text">Experience</span>
        </motion.h2>

        <div className="max-w-3xl mx-auto relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#8B5E3C]/50 via-[#8B5E3C]/20 to-transparent" />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              className={`relative flex items-start mb-12 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#8B5E3C] border-4 border-background z-10 mt-1.5" />

              {/* Content */}
              <div
                className={`ml-16 md:ml-0 md:w-1/2 ${
                  index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
                }`}
              >
                <div className="glass p-6 rounded-2xl">
                  <div className="flex items-center gap-2 text-xs mb-2" style={{ color: '#8B5E3C' }}>
                    <Briefcase size={12} />
                    <span>{exp.company}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{exp.role}</h3>
                  <div className="flex flex-wrap items-center gap-3 text-xs mb-4" style={{ color: '#4A3728' }}>
                    <span className="flex items-center gap-1">
                      <MapPin size={12} /> {exp.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={12} /> {formatDate(exp.startDate)} —{' '}
                      {exp.endDate === 'Present' ? 'Present' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {exp.description.map((item, i) => (
                      <li key={i} className="text-sm flex gap-2" style={{ color: '#4A3728' }}>
                        <span className="mt-1 shrink-0" style={{ color: '#8B5E3C' }}>▹</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  {exp.tech && (
                    <div className="flex flex-wrap gap-1.5 mt-4 pt-4" style={{ borderTop: '1px solid rgba(139,94,60,0.12)' }}>
                      {exp.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 text-xs rounded-md"
                          style={{ background: 'rgba(139,94,60,0.1)', color: '#8B5E3C' }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
