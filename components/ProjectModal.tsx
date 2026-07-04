'use client';

import { motion } from 'framer-motion';
import { X, Github, ExternalLink, ArrowUpRight, CheckCircle2, BarChart3, Cpu } from 'lucide-react';
import { projects } from '@/lib/data';

interface ProjectModalProps {
  projectId: string;
  onClose: () => void;
}

export function ProjectModal({ projectId, onClose }: ProjectModalProps) {
  const project = projects.find((p) => p.id === projectId);
  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="card-warm max-w-3xl w-full max-h-[85vh] overflow-y-auto shadow-2xl p-0"
        onClick={(e) => e.stopPropagation()}
      >
        <style>{`
          .pm-btn { background: rgba(139,94,60,0.1); color: #8B5E3C; border: 1px solid rgba(139,94,60,0.2); transition: all 0.2s; }
          .pm-btn:hover { background: rgba(139,94,60,0.2); }
          .pm-tag { background: rgba(139,94,60,0.08); color: #4A3728; border: 1px solid rgba(139,94,60,0.15); }
        `}</style>
        <div className="sticky top-0 p-6 flex items-start justify-between rounded-t-3xl" style={{ background: '#E8DFCF', borderBottom: '1px solid rgba(139,94,60,0.12)' }}>
          <div>
            <h2 className="text-2xl font-bold" style={{ color: '#1A1A1A' }}>{project.title}</h2>
            <p className="text-sm mt-1" style={{ color: '#4A3728' }}>{project.description}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg transition-colors" style={{ color: '#4A5568' }}>
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-8" style={{ background: '#E8DFCF' }}>
          <p className="leading-relaxed" style={{ color: '#4A3728' }}>{project.longDescription}</p>

          <div>
            <h3 className="text-sm uppercase tracking-wider mb-3" style={{ color: '#4A5568' }}>Technology Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t} className="px-3 py-1 rounded-full text-xs pm-tag">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {project.challenges && (
            <div>
              <h3 className="text-sm uppercase tracking-wider mb-3 flex items-center gap-2" style={{ color: '#4A5568' }}>
                <CheckCircle2 size={16} style={{ color: '#8B5E3C' }} />
                Challenges Overcome
              </h3>
              <ul className="space-y-2">
                {project.challenges.map((c, i) => (
                  <li key={i} className="flex gap-2 text-sm" style={{ color: '#4A3728' }}>
                    <span style={{ color: '#8B5E3C' }}>▹</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.metrics && (
            <div>
              <h3 className="text-sm uppercase tracking-wider mb-3 flex items-center gap-2" style={{ color: '#4A5568' }}>
                <BarChart3 size={16} style={{ color: '#8B5E3C' }} />
                Key Metrics
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {project.metrics.map((m) => (
                  <div key={m.label} className="text-center p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.3)' }}>
                    <div className="text-lg font-bold" style={{ color: '#8B5E3C' }}>{m.value}</div>
                    <div className="text-xs" style={{ color: '#4A3728' }}>{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {project.architecture && (
            <div>
              <h3 className="text-sm uppercase tracking-wider mb-3 flex items-center gap-2" style={{ color: '#4A5568' }}>
                <Cpu size={16} style={{ color: '#8B5E3C' }} />
                System Architecture
              </h3>
              <div className="p-4 rounded-xl overflow-x-auto" style={{ background: 'rgba(255,255,255,0.3)' }}>
                <code className="text-xs md:text-sm whitespace-pre-wrap" style={{ color: '#8B5E3C' }}>
                  {project.architecture}
                </code>
              </div>
            </div>
          )}

          <div className="flex gap-4 pt-4" style={{ borderTop: '1px solid rgba(139,94,60,0.12)' }}>
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium pm-btn">
                <Github size={16} /> View Source
              </a>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium" style={{ background: '#8B5E3C', color: 'white' }}>
                <ExternalLink size={16} /> Live Demo <ArrowUpRight size={14} />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
