import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { projects } from '@/lib/data';
import Link from 'next/link';
import { ArrowLeft, Github, ExternalLink, Clock } from 'lucide-react';
import { calculateReadingTime } from '@/lib/utils';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);
  if (!project) return { title: 'Project Not Found' };

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);
  if (!project) notFound();

  const readingTime = calculateReadingTime(project.longDescription + project.architecture || '');

  return (
    <main className="min-h-screen pt-24 pb-20" style={{ background: '#E8DFCF' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm mb-8 back-link"
          style={{ color: '#4A5568' }}
        >
          <ArrowLeft size={16} /> Back to Projects
        </Link>
        <style>{`
          .back-link:hover { color: #8B5E3C !important; }
          .project-btn-primary:hover { background: #C17A4F !important; }
          .project-btn-secondary:hover { background: rgba(139,94,60,0.2) !important; }
        `}</style>

        <article className="max-w-none">
          <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#1A1A1A' }}>{project.title}</h1>
          <p className="text-xl mb-6" style={{ color: '#4A5568' }}>{project.description}</p>

          <div className="flex flex-wrap items-center gap-4 text-sm mb-8" style={{ color: '#4A5568' }}>
            <span className="flex items-center gap-1">
              <Clock size={14} /> {readingTime} min read
            </span>
          </div>

          <div className="flex gap-3 mb-10">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium project-btn-secondary"
                style={{ background: 'rgba(139,94,60,0.1)', color: '#8B5E3C', border: '1px solid rgba(139,94,60,0.2)' }}
              >
                <Github size={16} /> View Source
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium project-btn-primary"
                style={{ background: '#8B5E3C', color: 'white' }}
              >
                <ExternalLink size={16} /> Live Demo
              </a>
            )}
          </div>

          <div className="card-warm p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4" style={{ color: '#1A1A1A' }}>Overview</h2>
            <p className="leading-relaxed" style={{ color: '#4A5568' }}>{project.longDescription}</p>
          </div>

          <div className="card-warm p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4" style={{ color: '#1A1A1A' }}>Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-full text-xs"
                  style={{ background: 'rgba(139,94,60,0.1)', color: '#8B5E3C', border: '1px solid rgba(139,94,60,0.2)' }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {project.challenges && (
            <div className="card-warm p-6 mb-8">
              <h2 className="text-lg font-semibold mb-4" style={{ color: '#1A1A1A' }}>Challenges</h2>
              <ul className="space-y-2">
                {project.challenges.map((c, i) => (
                  <li key={i} className="flex gap-2" style={{ color: '#4A5568' }}>
                    <span style={{ color: '#8B5E3C' }}>▹</span> {c}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.metrics && (
            <div className="card-warm p-6 mb-8">
              <h2 className="text-lg font-semibold mb-4" style={{ color: '#1A1A1A' }}>Performance Metrics</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {project.metrics.map((m) => (
                  <div key={m.label} className="text-center p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.2)' }}>
                    <div className="text-xl font-bold" style={{ color: '#8B5E3C' }}>{m.value}</div>
                    <div className="text-xs" style={{ color: '#4A5568' }}>{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {project.architecture && (
            <div className="card-warm p-6 mb-8">
              <h2 className="text-lg font-semibold mb-4" style={{ color: '#1A1A1A' }}>Architecture</h2>
              <pre className="text-sm whitespace-pre-wrap p-4 rounded-xl overflow-x-auto" style={{ background: 'rgba(0,0,0,0.05)', color: '#8B5E3C' }}>
                {project.architecture}
              </pre>
            </div>
          )}
        </article>
      </div>
    </main>
  );
}
