import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are an AI assistant for Mohamed Suhaib's portfolio website. Answer questions about Suhaib, an Electronics & Communication Engineering student at Anna University, Chennai.

About Suhaib:
- Role: ECE Engineer, Full Stack Developer, AI Enthusiast
- Skills: Python, TypeScript, C/C++, TensorFlow, PyTorch, OpenCV, YOLO, ARM Cortex-M, ESP32, Arduino, FreeRTOS, LangChain, Docker, Git, Linux
- Projects: AI Smart CCTV Surveillance, Water Quality Monitoring System using AI, Computer Vision Projects, IoT Projects
- Experience: AI Developer at Tech Corp (2024-present), Embedded Systems Engineer at Embedded Solutions Ltd (2023-2024), Full Stack Developer Intern at WebDev Studio (2022-2023)
- Certifications: Deep Learning Specialization (DeepLearning.AI), Embedded Systems Professional (UT Austin), AWS Machine Learning, TensorFlow Developer, Computer Vision Nanodegree
- Contact: suhaib@example.com | LinkedIn: /in/MohamedSuhaib | GitHub: /MohamedSuhaib

Keep answers concise and friendly. If asked something you don't know, say you'll check with Suhaib.`;

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    const lastMessage = messages?.[messages.length - 1]?.content || '';

    // If AI endpoint is configured, use it
    if (process.env.AI_CHAT_ENDPOINT && process.env.AI_CHAT_API_KEY) {
      const response = await fetch(process.env.AI_CHAT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.AI_CHAT_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...messages.slice(-6), // last 6 for context
          ],
          max_tokens: 300,
          temperature: 0.7,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const reply = data.choices?.[0]?.message?.content || '';
        return NextResponse.json({ reply });
      }
    }

    // Fallback: static rule-based replies
    const msg = lastMessage.toLowerCase();
    let reply = "I'm not sure how to answer that. Try asking about Suhaib's projects, skills, or experience!";

    if (msg.includes('project') || msg.includes('work')) {
      reply = "Suhaib has built: AI Smart CCTV Surveillance (YOLOv8), Water Quality Monitoring with ML, Computer Vision projects, and IoT automation systems. Which would you like to know more about?";
    } else if (msg.includes('skill') || msg.includes('tech')) {
      reply = "Suhaib specializes in Python, TypeScript, TensorFlow, OpenCV, ARM Cortex-M, ESP32, and full-stack development with React & Node.js.";
    } else if (msg.includes('experience') || msg.includes('intern')) {
      reply = "Suhaib is currently an AI Developer at Tech Corp, previously Embedded Systems Engineer at Embedded Solutions Ltd, and Full Stack Developer Intern at WebDev Studio.";
    } else if (msg.includes('contact') || msg.includes('hire') || msg.includes('email')) {
      reply = "You can reach Suhaib at suhaib@example.com or use the contact form on this site. He's open to collaborations!";
    } else if (msg.includes('education') || msg.includes('college') || msg.includes('university')) {
      reply = "Suhaib is pursuing B.E. Electronics & Communication Engineering at Anna University, Chennai (GPA: 8.5/10).";
    } else if (msg.includes('resume') || msg.includes('cv')) {
      reply = "You can view Suhaib's resume by clicking the 'View Resume' button on the About section!";
    } else if (msg.includes('certif')) {
      reply = "Suhaib holds certifications in Deep Learning, Embedded Systems, AWS ML, TensorFlow, and Computer Vision from DeepLearning.AI, UT Austin, and Google.";
    }

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json(
      { reply: "Sorry, I'm having trouble processing that. Please try again." },
      { status: 200 }
    );
  }
}
