'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { projects } from '@/lib/data';
import { ProjectModal } from './ProjectModal';
import { cn } from '@/lib/utils';

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'featured'>('all');
  const [hoveredIndex, setHoveredIndex] = useState<string | null>(null);

  const filteredProjects = filter === 'featured'
    ? projects.filter((p) => p.featured)
    : projects;

  return (
    <section id="projects" className="section-container">
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
          className="text-3xl md:text-4xl font-bold mb-6 text-center"
          style={{ color: '#1A1A1A' }}
        >
          Featured <span className="gradient-text">Projects</span>
        </motion.h2>

        <div className="flex justify-center gap-3 mb-12">
          {(['all', 'featured'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300',
                filter === f
                  ? 'border text-muted-foreground hover:text-foreground border-transparent hover:border-zinc-700'
                  : 'text-muted-foreground hover:text-foreground border border-transparent hover:border-zinc-700'
              )}
              style={filter === f ? { background: 'rgba(139,94,60,0.2)', color: '#8B5E3C', border: '1px solid rgba(139,94,60,0.3)' } : undefined}
            >
              {f === 'all' ? 'All Projects' : 'Highlights'}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {filteredProjects.map((project, i) => (
            <motion.div
              key={project.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { delay: i * 0.1 },
                },
              }}
              className="glass p-6 rounded-2xl flex flex-col group cursor-pointer transition-all duration-300"
              style={hoveredIndex === project.id ? { border: '1px solid rgba(139,94,60,0.3)' } : undefined}
              onClick={() => setSelectedProject(project.id)}
              data-cursor-hover
              onMouseEnter={() => setHoveredIndex(project.id)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="flex-1">
                <h3
                  className="text-lg font-semibold mb-2 transition-colors"
                  style={{ color: hoveredIndex === project.id ? '#8B5E3C' : undefined }}
                >
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tech.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-xs rounded-md"
                      style={{ background: 'rgba(139,94,60,0.08)', color: '#4A3728' }}
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 4 && (
                    <span className="px-2 py-0.5 text-xs rounded-md"
                      style={{ background: 'rgba(139,94,60,0.08)', color: '#4A3728' }}>
                      +{project.tech.length - 4}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid rgba(139,94,60,0.12)' }}>
                <div className="flex gap-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="transition-colors"
                      style={{ color: hoveredIndex === project.id ? '#8B5E3C' : '#4A5568' }}
                    >
                      <Github size={16} />
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="transition-colors"
                      style={{ color: hoveredIndex === project.id ? '#8B5E3C' : '#4A5568' }}
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
                <span className="text-xs flex items-center gap-1 transition-all"
                  style={{ color: hoveredIndex === project.id ? '#8B5E3C' : 'rgba(139,94,60,0.7)' }}
                >
                  Details <ArrowRight size={12} />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            projectId={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
