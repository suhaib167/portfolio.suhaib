'use client';

import { useEffect, useRef } from 'react';

const skills = [
  'Python', 'TypeScript', 'C++', 'Rust',
  'TensorFlow', 'PyTorch', 'OpenCV', 'YOLO',
  'ARM', 'ESP32', 'RTOS', 'Arduino',
  'Docker', 'Linux', 'Git', 'Edge AI',
];

interface Node {
  x: number; y: number;
  vx: number; vy: number;
  label: string;
  radius: number;
  pulse: number;
}

export default function SkillConstellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = canvas.width = canvas.offsetWidth;
    let h = canvas.height = canvas.offsetHeight;
    let animId: number;

    const nodes: Node[] = skills.map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      label: '',
      radius: 5 + Math.random() * 4,
      pulse: Math.random() * Math.PI * 2,
    }));

    nodes.forEach((n, i) => { n.label = skills[i]; });

    const resize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
      nodes.forEach(n => {
        n.x = Math.min(w - 20, Math.max(20, n.x));
        n.y = Math.min(h - 20, Math.max(20, n.y));
      });
    };
    window.addEventListener('resize', resize);

    canvas.addEventListener('mousemove', e => {
      const r = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    });
    canvas.addEventListener('mouseleave', () => {
      mouseRef.current = { x: -1000, y: -1000 };
    });

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const t = Date.now() / 1000;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      nodes.forEach(n => {
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += 0.02;

        const dx = n.x - mx;
        const dy = n.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          const force = (150 - dist) / 150 * 2;
          n.x += (dx / dist) * force;
          n.y += (dy / dist) * force;
        }

        if (n.x < 10 || n.x > w - 10) n.vx *= -1;
        if (n.y < 10 || n.y > h - 10) n.vy *= -1;
        n.x = Math.min(w - 10, Math.max(10, n.x));
        n.y = Math.min(h - 10, Math.max(10, n.y));
      });

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 160) {
            const alpha = (1 - dist / 160) * 0.5;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(139, 94, 60, ${alpha})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach(n => {
        const pulseSize = Math.sin(n.pulse) * 2;
        const r = n.radius + pulseSize;

        // Glow
        const gradient = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 6);
        gradient.addColorStop(0, 'rgba(139, 94, 60, 0.25)');
        gradient.addColorStop(1, 'rgba(139, 94, 60, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r * 6, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = '#8B5E3C';
        ctx.fill();

        // Bright center
        ctx.beginPath();
        ctx.arc(n.x, n.y, r * 0.35, 0, Math.PI * 2);
        ctx.fillStyle = '#C17A4F';
        ctx.fill();

        // Label
        ctx.font = 'bold 12px Inter, sans-serif';
        ctx.fillStyle = '#4A3728';
        ctx.textAlign = 'center';
        ctx.fillText(n.label, n.x, n.y - r - 10);
      });

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section id="skills-constellation" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: '#1A1A1A' }}>
          Skill <span className="gradient-text">Universe</span>
        </h2>
        <p className="text-base" style={{ color: '#4A5568' }}>
          Interactive constellation of my technical skills — hover to push nodes
        </p>
      </div>
      <div className="w-full h-[400px] md:h-[500px] relative max-w-5xl mx-auto">
        <canvas
          ref={canvasRef}
          className="w-full h-full rounded-2xl"
          style={{ border: '1px solid rgba(139,94,60,0.1)' }}
        />
      </div>
    </section>
  );
}
