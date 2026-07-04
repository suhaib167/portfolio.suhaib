import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Stats } from '@/components/Stats';
import { Skills } from '@/components/Skills';
import SkillConstellation from '@/components/SkillConstellation';
import { Projects } from '@/components/Projects';
import { Experience } from '@/components/Experience';
import { Certifications } from '@/components/Certifications';
import { Contact } from '@/components/Contact';
import { LiveLeetCodeBadge } from '@/components/LiveLeetCodeBadge';

export default function HomePage() {
  return (
    <main className="relative">
      <Hero />
      <div className="relative z-10">
        <About />
        <Stats />
        <LiveLeetCodeBadge />
        <Skills />
        <SkillConstellation />
        <Projects />
        <Experience />
        <Certifications />
        <Contact />
      </div>
    </main>
  );
}
