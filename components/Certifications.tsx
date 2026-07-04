'use client';

import { motion } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';
import { certifications } from '@/lib/data';
import { formatDate } from '@/lib/utils';

export function Certifications() {
  return (
    <section className="py-20">
      <style>{`.cert-link:hover { color: #C17A4F !important; }`}</style>
      <div className="section-container">
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
            Licenses & <span className="gradient-text">Certifications</span>
          </motion.h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {certifications.map((cert) => (
              <motion.div
                key={cert.id}
                variants={{
                  hidden: { opacity: 0, scale: 0.95 },
                  visible: { opacity: 1, scale: 1 },
                }}
                className="card-warm p-5"
              >
                <Award size={20} style={{ color: '#8B5E3C' }} className="mb-3" />
                <h3 className="font-semibold text-sm mb-1" style={{ color: '#1A1A1A' }}>{cert.title}</h3>
                <p className="text-xs mb-1" style={{ color: '#4A3728' }}>{cert.issuer}</p>
                <p className="text-xs" style={{ color: '#4A5568' }}>{formatDate(cert.date)}</p>
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-3 text-xs cert-link"
                    style={{ color: '#8B5E3C' }}
                  >
                    Verify <ExternalLink size={10} />
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
