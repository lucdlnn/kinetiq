"use client";

import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, User, Bot } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hello! I'm your Kinetiq Coach. 🤖\n\nI can help you with:\n- **Workout Plans** tailored to your goals.\n- **Meal Suggestions** with macros (try asking for a recipe!).\n- **Form Tips** & advice.\n\nHow are you feeling today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });

      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "⚠️ Connection error. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to render Markdown-like content safely
  const renderContent = (text: string) => {
    // Simple parser for basic formatting to avoid heavy libraries for now
    // 1. Headers
    let processed = text.replace(/### (.*$)/gim, '<h3 class="font-bold text-lg mt-3 mb-1 text-white">$1</h3>');
    processed = processed.replace(/## (.*$)/gim, '<h2 class="font-bold text-xl mt-4 mb-2 text-kinetiq-volt">$1</h2>');

    // 2. Bold
    processed = processed.replace(/\*\*(.*?)\*\*/gim, '<strong class="text-white font-semibold">$1</strong>');

    // 3. Lists ( - item)
    processed = processed.replace(/^- (.*$)/gim, '<li class="ml-4 list-disc marker:text-kinetiq-volt text-secondary">$1</li>');

    // 4. Links [Title](url) -> Button
    processed = processed.replace(
      /\[(.*?)\]\((.*?)\)/gim,
      '<a href="$2" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 text-xs bg-white/10 hover:bg-white/20 px-2 py-1 rounded text-kinetiq-volt mt-1 transition-colors">🔗 $1</a>'
    );

    // 5. Wrap in paragraphs (simple split by newline)
    return processed.split('\n').map((line, i) => {
      if (line.match(/^<h/)) return <div key={i} dangerouslySetInnerHTML={{ __html: line }} />;
      if (line.match(/^<li/)) return <ul key={i} dangerouslySetInnerHTML={{ __html: line }} className="my-1" />;
      if (line.trim() === '') return <div key={i} className="h-2" />;
      return <p key={i} dangerouslySetInnerHTML={{ __html: line }} className="leading-relaxed text-secondary/90 mb-1" />;
    });
  };

  return (
    <div className="flex flex-col h-[600px] w-full max-w-4xl mx-auto bg-[#0a0a0a] rounded-2xl border border-white/5 shadow-2xl overflow-hidden relative glass-panel">
      {/* Ambient Background */}
      <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,_var(--kinetiq-volt)_0%,_transparent_5%)] opacity-5 pointer-events-none" />

      {/* Header */}
      <div className="p-4 border-b border-white/5 bg-white/5 backdrop-blur-md flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-kinetiq-volt to-emerald-500 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(204,255,0,0.3)]">
            <Sparkles size={20} className="text-black" />
          </div>
          <div>
            <h3 className="font-bold text-white">Coach Kinetiq</h3>
            <p className="text-xs text-green-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-current rounded-full animate-pulse" /> Online
            </p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 mt-1">
                <Bot size={14} className="text-secondary" />
              </div>
            )}

            <div
              className={`max-w-[80%] p-4 rounded-2xl shadow-sm ${msg.role === 'user'
                  ? 'bg-[#3062FF] text-white rounded-tr-none'
                  : 'bg-[#1c1c1e] border border-white/5 rounded-tl-none'
                }`}
            >
              <div className="text-sm">
                {msg.role === 'user' ? msg.content : renderContent(msg.content)}
              </div>
            </div>

            {msg.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-[#3062FF]/20 flex items-center justify-center flex-shrink-0 mt-1">
                <User size={14} className="text-[#3062FF]" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 mt-1">
              <Bot size={14} className="text-secondary" />
            </div>
            <div className="bg-[#1c1c1e] border border-white/5 rounded-2xl rounded-tl-none p-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-secondary/50 rounded-full animate-bounce [animation-delay:-0.3s]" />
              <span className="w-1.5 h-1.5 bg-secondary/50 rounded-full animate-bounce [animation-delay:-0.15s]" />
              <span className="w-1.5 h-1.5 bg-secondary/50 rounded-full animate-bounce" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-black/40 backdrop-blur-md border-t border-white/5">
        <div className="flex gap-2 relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask for a workout, meal plan, or advice..."
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-kinetiq-volt/50 focus:bg-white/10 transition-all placeholder:text-secondary/50"
          />
          <Button
            onClick={sendMessage}
            variant="primary"
            disabled={isLoading || !input.trim()}
            className="h-[46px] w-[46px] !p-0 flex items-center justify-center rounded-xl flex-shrink-0"
          >
            <Send size={18} />
          </Button>
        </div>
        <p className="text-[10px] text-center text-secondary/30 mt-2">
          AI can make mistakes. Check important info.
        </p>
      </div>
    </div>
  );
};
