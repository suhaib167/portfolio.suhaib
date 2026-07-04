'use client';

import { useState, useRef, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Loader2, Bot } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const INITIAL_MESSAGE = "Hi! I'm Suhaib's AI assistant. Ask me about his projects, skills, or experience!";

export function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: INITIAL_MESSAGE },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: "Sorry, I'm having trouble connecting. Try again later." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .aichat-btn { background: rgba(139,94,60,0.15); color: #8B5E3C; transition: all 0.3s; }
        .aichat-btn:hover { background: rgba(139,94,60,0.25); }
        .aichat-input { background: rgba(255,255,255,0.3); border: 1px solid rgba(139,94,60,0.15); color: #1A1A1A; }
        .aichat-input:focus { border-color: #8B5E3C; outline: none; }
        .aichat-send { background: rgba(139,94,60,0.15); color: #8B5E3C; transition: all 0.2s; }
        .aichat-send:hover { background: rgba(139,94,60,0.3); }
        .aichat-send:disabled { opacity: 0.4; }
      `}</style>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-3 rounded-full aichat-btn shadow-lg"
        aria-label="AI Chat"
      >
        {isOpen ? <X size={20} /> : <MessageCircle size={20} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-6 z-50 w-[350px] max-w-[calc(100vw-2rem)] shadow-2xl overflow-hidden rounded-2xl"
            style={{
              background: '#E8DFCF',
              border: '1px solid rgba(139,94,60,0.15)',
            }}
          >
            <div className="p-4 flex items-center gap-2" style={{ borderBottom: '1px solid rgba(139,94,60,0.1)', color: '#1A1A1A' }}>
              <Bot size={18} style={{ color: '#8B5E3C' }} />
              <span className="font-medium text-sm">AI Assistant</span>
            </div>
            <div className="h-80 overflow-y-auto p-4 space-y-3" style={{ background: 'rgba(255,255,255,0.15)' }}>
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-3 py-2 rounded-xl text-sm ${
                      msg.role === 'user'
                        ? 'text-white'
                        : ''
                    }`}
                    style={{
                      background: msg.role === 'user' ? '#8B5E3C' : 'rgba(255,255,255,0.4)',
                      color: msg.role === 'user' ? '#fff' : '#1A1A1A',
                    }}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="px-3 py-2 rounded-xl" style={{ background: 'rgba(255,255,255,0.4)' }}>
                    <Loader2 size={16} className="animate-spin" style={{ color: '#8B5E3C' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <form onSubmit={sendMessage} className="p-3 flex gap-2" style={{ borderTop: '1px solid rgba(139,94,60,0.1)' }}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 px-3 py-2 rounded-xl text-sm aichat-input"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="p-2 rounded-xl aichat-send"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
