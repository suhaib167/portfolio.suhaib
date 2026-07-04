'use client';

import { useState, useEffect } from 'react';
import { X, Download, Printer } from 'lucide-react';
import { profile } from '@/lib/data';

const resumeContent = {
  summary: 'Electronics & Communication Engineer with expertise in full stack development, AI applications, and embedded systems. Passionate about building beautiful web experiences and solving real-world problems through code.',
  education: [
    { degree: 'B.E. Electronics & Communication Engineering', school: 'Anna University', year: '2022 - 2026', gpa: '8.5/10' },
  ],
  experience: [
    {
      role: 'AI Developer',
      company: 'Tech Corp',
      period: 'Jan 2024 - Present',
      points: [
        'Developed AI solutions using computer vision and deep learning',
        'Built LLM applications with LangChain and RAG architectures',
        'Optimized inference pipelines achieving 2x speedup on edge devices',
      ],
    },
    {
      role: 'Embedded Systems Engineer',
      company: 'Embedded Solutions Ltd',
      period: 'Jun 2023 - Jan 2024',
      points: [
        'Designed firmware for ARM Cortex-M microcontrollers',
        'Developed IoT sensor networks with LoRaWAN communication',
        'Created custom PCB designs for sensor interface boards',
      ],
    },
  ],
  skills: [
    'Python, TypeScript, JavaScript, C/C++, Rust',
    'TensorFlow, PyTorch, OpenCV, YOLO, LangChain',
    'ARM Cortex-M, ESP32, Arduino, Raspberry Pi, FreeRTOS',
    'Git, Docker, Linux, Figma, Postman',
  ],
  certifications: [
    'Deep Learning Specialization — DeepLearning.AI',
    'Embedded Systems Professional — UT Austin',
    'AWS Machine Learning — Amazon Web Services',
    'TensorFlow Developer — Google',
    'Computer Vision Nanodegree — Udacity',
  ],
};

export default function ResumeModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const handlePrint = () => { window.print(); };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = profile.resumeUrl;
    link.download = 'Mohamed_Suhaib_Resume.pdf';
    link.click();
  };

  return (
    <>
      <style>{`.rm-btn:hover { background: rgba(139,94,60,0.2) !important; }`}</style>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-200 rm-btn"
        style={{
          background: 'rgba(139,94,60,0.1)',
          color: '#8B5E3C',
          border: '1px solid rgba(139,94,60,0.2)',
        }}
      >
        View Resume
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0"
            style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
            onClick={() => setOpen(false)}
          />
          <div
            className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl p-8"
            style={{
              background: '#E8DFCF',
              border: '1px solid rgba(139,94,60,0.15)',
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold" style={{ color: '#1A1A1A' }}>Resume</h2>
              <div className="flex items-center gap-2">
                <button onClick={handlePrint} className="p-2 transition-colors" style={{ color: '#4A5568' }} title="Print">
                  <Printer size={18} />
                </button>
                <button onClick={handleDownload} className="p-2 transition-colors" style={{ color: '#4A5568' }} title="Download PDF">
                  <Download size={18} />
                </button>
                <button onClick={() => setOpen(false)} className="p-2 transition-colors" style={{ color: '#4A5568' }}>
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: '#8B5E3C' }}>{profile.name}</h3>
                <p style={{ color: '#4A5568' }}>{profile.role} | {profile.location}</p>
                <p style={{ color: '#4A5568' }}>{profile.email} | {profile.phone}</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-2" style={{ color: '#1A1A1A' }}>Professional Summary</h4>
                <p className="leading-relaxed" style={{ color: '#4A5568' }}>{resumeContent.summary}</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-3" style={{ color: '#1A1A1A' }}>Education</h4>
                {resumeContent.education.map((edu, i) => (
                  <div key={i} className="pl-4" style={{ borderLeft: '2px solid rgba(139,94,60,0.3)' }}>
                    <p className="font-medium" style={{ color: '#1A1A1A' }}>{edu.degree}</p>
                    <p className="text-sm" style={{ color: '#4A5568' }}>{edu.school} | {edu.year}</p>
                    <p className="text-sm" style={{ color: '#4A5568' }}>GPA: {edu.gpa}</p>
                  </div>
                ))}
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-3" style={{ color: '#1A1A1A' }}>Experience</h4>
                {resumeContent.experience.map((exp, i) => (
                  <div key={i} className="mb-4 pl-4" style={{ borderLeft: '2px solid rgba(139,94,60,0.3)' }}>
                    <p className="font-medium" style={{ color: '#1A1A1A' }}>{exp.role}</p>
                    <p className="text-sm" style={{ color: '#8B5E3C' }}>{exp.company} | {exp.period}</p>
                    <ul className="list-disc list-inside text-sm mt-1 space-y-1" style={{ color: '#4A5568' }}>
                      {exp.points.map((pt, j) => <li key={j}>{pt}</li>)}
                    </ul>
                  </div>
                ))}
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-3" style={{ color: '#1A1A1A' }}>Technical Skills</h4>
                <ul className="list-disc list-inside space-y-1" style={{ color: '#4A5568' }}>
                  {resumeContent.skills.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-3" style={{ color: '#1A1A1A' }}>Certifications</h4>
                <ul className="list-disc list-inside space-y-1" style={{ color: '#4A5568' }}>
                  {resumeContent.certifications.map((c, i) => <li key={i}>{c}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
