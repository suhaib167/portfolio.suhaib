'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Loader2, CheckCircle2, Github, Linkedin } from 'lucide-react';
import { profile } from '@/lib/data';

export function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch(
  "https://formspree.io/f/xeebvabk",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formState),
  }
);
      if (!res.ok) throw new Error();
      setStatus('success');
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <section id="contact" className="section-container">
      <style>{`
        .contact-input {
          background: rgba(255,255,255,0.35);
          border: 1px solid rgba(139,94,60,0.2);
          color: #1A1A1A;
          transition: all 0.2s;
        }
        .contact-input:focus {
          border-color: #8B5E3C;
          outline: none;
          box-shadow: 0 0 0 2px rgba(139,94,60,0.15);
        }
        .contact-input::placeholder {
          color: rgba(74,85,104,0.5);
        }
        .contact-link { color: #4A5568; transition: color 0.2s; }
        .contact-link:hover { color: #8B5E3C; }
        .contact-btn { background: #8B5E3C; color: white; transition: background 0.3s; }
        .contact-btn:hover { background: #C17A4F; }
        .contact-btn:disabled { opacity: 0.6; }
      `}</style>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
        }}
        className="max-w-4xl mx-auto"
      >
        <motion.h2
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
          style={{ color: '#1A1A1A' }}
        >
          Get in <span className="gradient-text">Touch</span>
        </motion.h2>

        <div className="grid md:grid-cols-5 gap-8">
          <motion.div
            variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
            className="md:col-span-2 space-y-6"
          >
            <div className="card-warm p-6 space-y-5">
              <div className="flex items-center gap-3" style={{ color: '#4A5568' }}>
                <Mail size={18} style={{ color: '#8B5E3C' }} />
                <a href={`mailto:${profile.email}`} className="contact-link">
                  {profile.email}
                </a>
              </div>
              <div className="flex items-center gap-3" style={{ color: '#4A5568' }}>
                <MapPin size={18} style={{ color: '#8B5E3C' }} />
                <span>{profile.location}</span>
              </div>
              <div className="pt-3" style={{ borderTop: '1px solid rgba(139,94,60,0.1)' }}>
                <p className="text-xs font-medium mb-3 uppercase tracking-wider" style={{ color: '#4A5568' }}>Social</p>
                <div className="flex gap-4">
                  <a
                    href={profile.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-link flex items-center gap-2 text-sm"
                  >
                    <Github size={18} /> GitHub
                  </a>
                  <a
                    href={profile.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-link flex items-center gap-2 text-sm"
                  >
                    <Linkedin size={18} /> LinkedIn
                  </a>
                </div>
              </div>
            </div>
            <p className="text-sm" style={{ color: '#4A5568' }}>
              Open to internship opportunities and collaborative projects in full-stack development, AI, and embedded systems. Let&apos;s build something great together.
            </p>
          </motion.div>

          <motion.form
            variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } }}
            onSubmit={handleSubmit}
            className="md:col-span-3 card-warm p-6 space-y-4"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs mb-1.5 block" style={{ color: '#4A5568' }}>Name</label>
                <input
                  type="text"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl contact-input text-sm"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="text-xs mb-1.5 block" style={{ color: '#4A5568' }}>Email</label>
                <input
                  type="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl contact-input text-sm"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            <div>
              <label className="text-xs mb-1.5 block" style={{ color: '#4A5568' }}>Message</label>
              <textarea
                required
                rows={4}
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl contact-input text-sm resize-none"
                placeholder="Tell me about your project or opportunity..."
              />
            </div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2 contact-btn"
            >
              {status === 'loading' ? (
                <Loader2 size={18} className="animate-spin" />
              ) : status === 'success' ? (
                <><CheckCircle2 size={18} /> Sent Successfully</>
              ) : (
                <><Send size={18} /> Send Message</>
              )}
            </button>
            {status === 'error' && (
              <p className="text-xs text-center" style={{ color: '#C17A4F' }}>Something went wrong. Please try again.</p>
            )}
          </motion.form>
        </div>
      </motion.div>
    </section>
  );
}
