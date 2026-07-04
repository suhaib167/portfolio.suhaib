export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tech: string[];
  github?: string;
  demo?: string;
  challenges?: string[];
  metrics?: { label: string; value: string }[];
  architecture?: string;
  image?: string;
  featured?: boolean;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string | 'Present';
  description: string[];
  tech?: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  image?: string;
}

export interface Skill {
  name: string;
  proficiency: number;
  category: 'programming' | 'embedded' | 'ai-ml' | 'tools';
}

export interface RadarSkill {
  skill: string;
  level: number;
  fullMark: number;
}

export const profile = {
  name: 'Mohamed Suhaib ',
  role: 'AI Developer & Embedded Engineer',
  tagline: 'Bridging AI and embedded systems at the edge',
  email: 'Mohamedsuhaib167@gmail.com',
  phone: '+91 6369818684',
  location: 'Hosur, India',
  bio: 'Passionate about building intelligent systems that bridge the gap between software and hardware. Specializing in AI, embedded systems, and full-stack development.',
  longBio: `I'm an AI Developer and Embedded Engineer with a deep fascination for the intersection of artificial intelligence and hardware. My journey began with Arduino boards and breadboards, evolved through ARM microcontrollers, and now encompasses deploying neural networks on resource-constrained devices.

I believe the most impactful technology lives at the edge—where sensors meet the real world. Whether it's deploying computer vision models on embedded devices or building full-stack AI applications, I'm driven by the challenge of making intelligent systems efficient and accessible.

When I'm not coding, you'll find me contributing to open-source projects, writing about my experiments, or exploring the latest in AI research.`,
  resumeUrl: '/resume.pdf',
  social: {
    github: 'https://github.com/MohamedSuhaib',
    linkedin: 'https://linkedin.com/in/MohamedSuhaib27',
    twitter: 'https://twitter.com/MohamedSuhaib',
    leetcode: 'https://leetcode.com/MohamedSuhaib',
    email: 'mailto:mohamedsuhaib167@gmail.com',
  },
};

export const stats = {
  projectsCompleted: 10,
  internships: 2,
  certifications: 2,
  leetcodeSolved: 150,
};

export const skills: Skill[] = [
  { name: 'Python', proficiency: 92, category: 'programming' },
  { name: 'TypeScript', proficiency: 85, category: 'programming' },
  { name: 'JavaScript', proficiency: 88, category: 'programming' },
  { name: 'C/C++', proficiency: 82, category: 'programming' },
  { name: 'Rust', proficiency: 55, category: 'programming' },
  { name: 'ARM Cortex-M', proficiency: 80, category: 'embedded' },
  { name: 'ESP32/ESP-IDF', proficiency: 85, category: 'embedded' },
  { name: 'Arduino', proficiency: 90, category: 'embedded' },
  { name: 'Raspberry Pi', proficiency: 85, category: 'embedded' },
  { name: 'RTOS (FreeRTOS)', proficiency: 75, category: 'embedded' },
  { name: 'TensorFlow', proficiency: 88, category: 'ai-ml' },
  { name: 'PyTorch', proficiency: 82, category: 'ai-ml' },
  { name: 'OpenCV', proficiency: 85, category: 'ai-ml' },
  { name: 'YOLO', proficiency: 80, category: 'ai-ml' },
  { name: 'LangChain', proficiency: 72, category: 'ai-ml' },
  { name: 'Scikit-learn', proficiency: 78, category: 'ai-ml' },
  { name: 'Git/GitHub', proficiency: 90, category: 'tools' },
  { name: 'Docker', proficiency: 75, category: 'tools' },
  { name: 'Linux', proficiency: 85, category: 'tools' },
  { name: 'VS Code', proficiency: 95, category: 'tools' },
  { name: 'Figma', proficiency: 65, category: 'tools' },
  { name: 'Postman', proficiency: 70, category: 'tools' },
];

export const radarSkills: RadarSkill[] = [
  { skill: 'Python', level: 92, fullMark: 100 },
  { skill: 'Computer Vision', level: 85, fullMark: 100 },
  { skill: 'Embedded C', level: 80, fullMark: 100 },
  { skill: 'Edge AI', level: 82, fullMark: 100 },
  { skill: 'TensorFlow', level: 88, fullMark: 100 },
  { skill: 'Full Stack', level: 80, fullMark: 100 },
  { skill: 'IoT', level: 85, fullMark: 100 },
  { skill: 'Algorithms', level: 78, fullMark: 100 },
];

export const projects: Project[] = [
  {
    id: 'ai-smart-cctv',
    title: 'AI Smart CCTV Surveillance System',
    description: 'Intelligent surveillance using computer vision and deep learning for real-time threat detection and alerting.',
    longDescription: `An intelligent surveillance system that uses YOLOv8 for real-time object detection, DeepSort for multi-object tracking, and a React dashboard for visualization. The system detects persons, vehicles, and suspicious activities, sending instant alerts via email and SMS.

The system processes video streams from multiple cameras simultaneously, with cloud storage and 30-day retention. A Flask backend handles API requests, while a PostgreSQL database stores detection logs and alerts.`,
    tech: ['Python', 'YOLO', 'OpenCV', 'TensorFlow', 'Flask', 'React'],
    github: 'https://github.com/MohamedSuhaib/ai-cctv',
    demo: 'https://ai-cctv-demo.vercel.app',
    featured: true,
    challenges: [
      'Real-time processing of multiple video streams simultaneously',
      'Optimizing detection accuracy in varying lighting conditions',
      'Reducing false positive alerts through contextual analysis',
    ],
    metrics: [
      { label: 'Detection FPS', value: '30' },
      { label: 'Accuracy', value: '94%' },
      { label: 'Cameras', value: '4' },
      { label: 'Alert Latency', value: '<2s' },
    ],
    architecture: `Camera Feeds → YOLOv8 Detection → DeepSort Tracking → Alert Engine → Flask API → React Dashboard & SMS/Email`,
  },
  {
    id: 'water-quality-monitoring',
    title: 'Water Quality Monitoring System Using AI',
    description: 'AI-powered IoT system monitoring water quality in real-time with ML-based anomaly detection.',
    longDescription: `A complete IoT solution for real-time water quality monitoring. ESP32 sensors collect pH, turbidity, TDS, and temperature data, sending it to a FastAPI backend. A TensorFlow model analyzes the data for anomalies and predicts contamination risks.

The React dashboard provides real-time visualization, historical analytics, and automated alerts. The system is solar-powered for remote deployment and stores data in InfluxDB for time-series analysis.`,
    tech: ['Python', 'TensorFlow', 'Arduino', 'IoT', 'FastAPI', 'React'],
    github: 'https://github.com/MohamedSuhaib/water-quality',
    demo: 'https://water-quality-demo.vercel.app',
    featured: true,
    challenges: [
      'Sensor calibration across varying water conditions',
      'Reliable data transmission over LoRa in remote areas',
      'Training anomaly detection with limited labeled data',
    ],
    metrics: [
      { label: 'Parameters', value: '6' },
      { label: 'Accuracy', value: '92%' },
      { label: 'Battery Life', value: '6 months' },
      { label: 'Range', value: '2 km' },
    ],
    architecture: `ESP32 Sensors → LoRaWAN → FastAPI Backend → ML Anomaly Detection → InfluxDB → React Dashboard & Alerts`,
  },
  {
    id: 'computer-vision-projects',
    title: 'Computer Vision Projects',
    description: 'Collection of computer vision projects including object detection, segmentation, and OCR systems.',
    longDescription: `A comprehensive collection of computer vision projects demonstrating various techniques. Includes real-time object detection with YOLOv8, instance segmentation with Mask R-CNN, hand gesture recognition with MediaPipe, OCR for document digitization, and face mask detection.

Each project is modular with its own pipeline, deployed via FastAPI with a unified dashboard for visualization. Models are optimized for both GPU and CPU inference.`,
    tech: ['Python', 'OpenCV', 'YOLO', 'PyTorch', 'MediaPipe'],
    github: 'https://github.com/MohamedSuhaib/computer-vision',
    demo: 'https://cv-projects-demo.vercel.app',
    challenges: [
      'Optimizing models for real-time performance on CPU',
      'Handling diverse lighting and environmental conditions',
      'Building a unified API for multiple CV pipelines',
    ],
    metrics: [
      { label: 'Projects', value: '5' },
      { label: 'FPS', value: '30' },
      { label: 'Models', value: '4' },
      { label: 'Accuracy', value: '95%' },
    ],
  },
  {
    id: 'iot-projects',
    title: 'IoT Projects',
    description: 'Embedded IoT solutions for smart home automation, environmental monitoring, and industrial control.',
    longDescription: `A suite of IoT projects demonstrating embedded systems expertise. Includes smart home automation with voice control, environmental monitoring with multiple sensor nodes, industrial equipment predictive maintenance, wireless sensor networks, and cloud-based device management.

All projects use MQTT for communication, with Node.js backends and React dashboards. Devices are built using ESP32 and Arduino platforms with custom PCB designs.`,
    tech: ['Arduino', 'ESP32', 'Raspberry Pi', 'MQTT', 'Node.js'],
    github: 'https://github.com/MohamedSuhaib/iot-projects',
    demo: 'https://iot-demo.vercel.app',
    challenges: [
      'Ensuring reliable MQTT communication in noisy environments',
      'Low-power optimization for battery-operated sensors',
      'OTA firmware updates for remote devices',
    ],
    metrics: [
      { label: 'Devices', value: '12' },
      { label: 'Uptime', value: '99.5%' },
      { label: 'Battery', value: '8 months' },
      { label: 'Latency', value: '<100ms' },
    ],
    architecture: `ESP32/Arduino Nodes → MQTT Broker → Node.js Backend → PostgreSQL → React Dashboard & Mobile App`,
  },
];

export const experiences: Experience[] = [
  {
    id: 'ai-dev',
    role: 'AI Developer',
    company: 'Tech Corp',
    location: 'Chennai, India',
    startDate: '2024-01',
    endDate: 'Present',
    description: [
      'Developing AI-powered solutions for real-world problems using computer vision and deep learning',
      'Building and deploying LLM-based applications with LangChain and RAG architectures',
      'Optimizing inference pipelines for edge deployment achieving 2x speedup',
      'Collaborating with cross-functional teams on end-to-end ML product development',
    ],
    tech: ['Python', 'TensorFlow', 'LangChain', 'FastAPI', 'Docker', 'AWS'],
  },
  {
    id: 'embedded-engineer',
    role: 'Embedded Systems Engineer',
    company: 'Embedded Solutions Ltd',
    location: 'Chennai, India',
    startDate: '2023-06',
    endDate: '2024-01',
    description: [
      'Designed and implemented firmware for ARM Cortex-M microcontrollers',
      'Developed IoT sensor networks with LoRaWAN communication protocols',
      'Created custom PCB designs using KiCad for sensor interface boards',
      'Implemented real-time data acquisition and processing pipelines',
    ],
    tech: ['C', 'ARM Cortex-M', 'FreeRTOS', 'KiCad', 'LoRa', 'MQTT'],
  },
  {
    id: 'fullstack-intern',
    role: 'Full Stack Developer Intern',
    company: 'WebDev Studio',
    location: 'Chennai, India',
    startDate: '2022-06',
    endDate: '2023-05',
    description: [
      'Built full-stack web applications using React, Node.js, and PostgreSQL',
      'Implemented CI/CD pipelines with GitHub Actions and Docker',
      'Developed RESTful APIs serving 10k+ requests per day',
      'Created responsive UI components following accessibility best practices',
    ],
    tech: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'GitHub Actions', 'TypeScript'],
  },
];

export const certifications: Certification[] = [
  {
    id: 'cert-1',
    title: 'Deep Learning Specialization',
    issuer: 'DeepLearning.AI',
    date: '2024-03',
    credentialUrl: 'https://coursera.org/verify/specialization/xxx',
  },
  {
    id: 'cert-2',
    title: 'Embedded Systems Professional',
    issuer: 'UT Austin',
    date: '2024-01',
    credentialUrl: 'https://edx.org/verify/xxx',
  },
  {
    id: 'cert-3',
    title: 'AWS Machine Learning',
    issuer: 'Amazon Web Services',
    date: '2023-08',
    credentialUrl: 'https://aws.amazon.com/verify/xxx',
  },
  {
    id: 'cert-4',
    title: 'TensorFlow Developer',
    issuer: 'Google',
    date: '2023-06',
    credentialUrl: 'https://tensorflow.org/verify/xxx',
  },
  {
    id: 'cert-5',
    title: 'Computer Vision Nanodegree',
    issuer: 'Udacity',
    date: '2023-04',
    credentialUrl: 'https://udacity.com/verify/xxx',
  },
  {
    id: 'cert-6',
    title: 'IoT Specialization',
    issuer: 'UC Irvine',
    date: '2022-12',
    credentialUrl: 'https://coursera.org/verify/xxx',
  },
  {
    id: 'cert-7',
    title: 'Machine Learning Engineering',
    issuer: 'Stanford Online',
    date: '2022-09',
    credentialUrl: 'https://online.stanford.edu/verify/xxx',
  },
  {
    id: 'cert-8',
    title: 'Full Stack Web Development',
    issuer: 'freeCodeCamp',
    date: '2022-06',
    credentialUrl: 'https://freecodecamp.org/verify/xxx',
  },
];


export interface Education {
  degree: string;
  institution: string;
  location: string;
  startYear: string;
  endYear: string | 'Present';
  description: string;
  coursework?: string[];
}

export const education: Education[] = [
  {
    degree: 'BE in Electronics & Communication Engineering',
    institution: 'Sri Venkateswara College of Engineering',
    location: 'Chennai, India',
    startYear: '2022',
    endYear: '2026',
    description: 'Focusing on embedded systems, signal processing, and AI/ML integration with hardware systems.',
    coursework: ['Embedded Systems', 'Digital Signal Processing', 'Machine Learning', 'Computer Networks', 'VLSI Design', 'IoT'],
  },
];

export const interests: string[] = [
  'AI & Machine Learning',
  'Embedded Systems',
  'Computer Vision',
  'IoT & Edge Computing',
  'Open Source',
  'PCB Design',
];

export const loaderBlessings = [
  "بِسْمِ اللهِ",
  "எல்லா புகழும் இறைவனுக்கே",
  "✨مُحَمَّد صُهَيْب✨",
];

export const terminalLogs: string[] = [
  '[BOOT] Initializing AI Surveillance System...',
  '[BOOT] Flash: 16MB detected',
  '[BOOT] Loading Portfolio Modules...',
  '[INIT] Neural Engine: Online',
  '[INIT] GPU: Available',
  '[INIT] Camera: Ready',
  '[LOAD] Model: portfolio_v2.0.0',
  '[LOAD] Loading experience data...',
  '[LOAD] Loading project data...',
  '[LOAD] Loading certifications...',
  '[INFERENCE] Starting continuous inference loop...',
  '[STATUS] System ready — Portfolio loaded successfully',
  '──────────────────────────────────────────',
  'Type "help" for available commands',
];
