import { Heart, Github, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';
import { profile } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="relative pt-20 pb-12" style={{ borderTop: '1px solid rgba(139,94,60,0.1)' }}>
      <style>{`
        .footer-link { color: #4A5568; transition: color 0.2s; }
        .footer-link:hover { color: #8B5E3C; }
      `}</style>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-4xl md:text-5xl font-arabic mb-2" dir="rtl" style={{ color: '#8B5E3C' }}>
            ٱلْحَمْدُ لِلّٰهِ
          </p>
          <p className="text-sm italic" style={{ color: '#8B5E3C', opacity: 0.6 }}>— All praise is due to Allah —</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div>
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#1A1A1A', fontFamily: "'Poppins', sans-serif" }}>{profile.name}</h3>
            <p className="text-sm leading-relaxed" style={{ color: '#4A5568' }}>{profile.role}</p>
            <p className="text-sm mt-2" style={{ color: '#8B5E3C', opacity: 0.7 }}>{profile.location}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#1A1A1A', fontFamily: "'Poppins', sans-serif" }}>Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {['About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
                <li key={item}>
                  <Link href={`#${item.toLowerCase()}`} className="footer-link">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#1A1A1A', fontFamily: "'Poppins', sans-serif" }}>Connect</h3>
            <div className="flex gap-4">
              <a href={profile.social.github} target="_blank" rel="noopener noreferrer" className="footer-link">
                <Github size={20} />
              </a>
              <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" className="footer-link">
                <Linkedin size={20} />
              </a>
              <a href={profile.social.twitter} target="_blank" rel="noopener noreferrer" className="footer-link">
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 text-center" style={{ borderTop: '1px solid rgba(139,94,60,0.08)' }}>
          <p className="text-sm flex items-center justify-center gap-1" style={{ color: '#8B5E3C', opacity: 0.6 }}>
            Built with <Heart size={14} className="text-red-400 fill-red-400" /> by {profile.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
