'use client';

import { motion } from 'framer-motion';
import { User, MapPin, Briefcase, GraduationCap, BookOpen, Sparkles, Code, Heart } from 'lucide-react';
import { profile, education, interests } from '@/lib/data';

export function About() {
  return (
    <section id="about" className="section-container">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
        }}
        className="max-w-4xl mx-auto"
      >
        <motion.h2
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          className="text-3xl md:text-4xl font-bold mb-2 text-center"
          style={{ color: '#1A1A1A' }}
        >
          About <span className="gradient-text">Me</span>
        </motion.h2>
        <motion.p
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          className="text-center mb-10 text-sm md:text-base"
          style={{ color: '#4A3728' }}
        >
          Building AI systems that bridge software and hardware.
        </motion.p>

        {/* Top row: Quick Info + My Journey */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Quick Info */}
          <motion.div
            variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
            className="glass p-5 rounded-2xl"
          >
            <h3 className="flex items-center gap-2 font-semibold mb-4" style={{ color: '#1A1A1A' }}>
              <Sparkles size={18} style={{ color: '#8B5E3C' }} />
              Quick Info
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3" style={{ color: '#4A3728' }}>
                <User size={16} style={{ color: '#8B5E3C' }} />
                <span className="font-medium" style={{ color: '#1A1A1A' }}>{profile.name}</span>
              </div>
              <div className="flex items-center gap-3" style={{ color: '#4A3728' }}>
                <MapPin size={16} style={{ color: '#8B5E3C' }} />
                <span>{profile.location}</span>
              </div>
              <div className="flex items-center gap-3" style={{ color: '#4A3728' }}>
                <Briefcase size={16} style={{ color: '#8B5E3C' }} />
                <span>{profile.role}</span>
              </div>
              <div className="flex items-center gap-3" style={{ color: '#4A3728' }}>
                <GraduationCap size={16} style={{ color: '#8B5E3C' }} />
                <span>ECE Engineering Student</span>
              </div>
            </div>
          </motion.div>

          {/* My Journey */}
          <motion.div
            variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } }}
            className="glass p-5 rounded-2xl"
          >
            <h3 className="flex items-center gap-2 font-semibold mb-4" style={{ color: '#1A1A1A' }}>
              <Code size={18} style={{ color: '#8B5E3C' }} />
              My Journey
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#8B5E3C' }} />
                  <div className="w-0.5 h-10" style={{ background: 'rgba(139,94,60,0.2)' }} />
                </div>
                <div>
                  <p className="font-medium text-sm" style={{ color: '#1A1A1A' }}>Arduino & Electronics</p>
                  <p className="text-xs mt-0.5" style={{ color: '#4A3728' }}>Started with blinking LEDs and Arduino Uno</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#8B5E3C' }} />
                  <div className="w-0.5 h-10" style={{ background: 'rgba(139,94,60,0.2)' }} />
                </div>
                <div>
                  <p className="font-medium text-sm" style={{ color: '#1A1A1A' }}>VLSI & Embedded Systems</p>
                  <p className="text-xs mt-0.5" style={{ color: '#4A3728' }}>ARM Cortex-M, ESP32, RTOS fundamentals</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#8B5E3C' }} />
                  <div className="w-0.5 h-10" style={{ background: 'rgba(139,94,60,0.2)' }} />
                </div>
                <div>
                  <p className="font-medium text-sm" style={{ color: '#1A1A1A' }}>AI & Full Stack</p>
                  <p className="text-xs mt-0.5" style={{ color: '#4A3728' }}>Deploying CV models, building full-stack AI apps</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom row: Education | Interests */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Education */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="glass p-5 rounded-2xl"
          >
            <h3 className="flex items-center gap-2 font-semibold mb-4" style={{ color: '#1A1A1A' }}>
              <BookOpen size={18} style={{ color: '#8B5E3C' }} />
              Education
            </h3>
            {education.map((edu, i) => (
              <div key={i} className="space-y-2">
                <h4 className="font-medium text-sm" style={{ color: '#1A1A1A' }}>{edu.degree}</h4>
                <p className="text-xs" style={{ color: '#4A3728' }}>{edu.institution}</p>
                <p className="text-xs" style={{ color: '#6B5A4A' }}>{edu.startYear} — {edu.endYear}</p>
                <p className="text-xs mt-1 leading-relaxed" style={{ color: '#4A3728' }}>{edu.description}</p>
                {edu.coursework && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {edu.coursework.map((course, j) => (
                      <span key={j} className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: 'rgba(139,94,60,0.08)', color: '#4A3728' }}>
                        {course}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </motion.div>

          {/* Interests */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="glass p-5 rounded-2xl"
          >
            <h3 className="flex items-center gap-2 font-semibold mb-4" style={{ color: '#1A1A1A' }}>
              <Heart size={18} style={{ color: '#8B5E3C' }} />
              Interests
            </h3>
            <div className="flex flex-wrap gap-2">
              {interests.map((interest, i) => (
                <span
                  key={i}
                  className="text-xs px-3 py-1.5 rounded-xl transition-all duration-200"
                  style={{
                    background: 'rgba(139,94,60,0.08)',
                    color: '#4A3728',
                    border: '1px solid rgba(139,94,60,0.12)',
                  }}
                >
                  {interest}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Resume button */}
        <motion.div
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          className="text-center mt-8"
        >
          <a
            href={profile.resumeUrl}
            download
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl resume-btn text-sm font-medium"
            style={{ background: 'rgba(139,94,60,0.1)', color: '#8B5E3C', border: '1px solid rgba(139,94,60,0.2)' }}
          >
            <BookOpen size={16} />
            Download Resume
          </a>
          <style>{`.resume-btn:hover { background: rgba(139,94,60,0.2) !important; }`}</style>
        </motion.div>
      </motion.div>
    </section>
  );
}
