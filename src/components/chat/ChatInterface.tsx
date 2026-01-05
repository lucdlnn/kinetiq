"use client";

import { useChat } from '@ai-sdk/react';
import { Bot, User, Send, StopCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const ChatInterface = () => {
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } = useChat({
    initialMessages: [
      {
        id: 'welcome',
        role: 'assistant',
        content: "Hi, I'm Kinetiq. How can I help you improve your performance today?"
      }
    ]
  });

  return (
    <div className="flex flex-col h-full bg-black text-white font-sans antialiased">

      {/* Scrollable Chat Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 scrollbar-thin">
        <div className="max-w-3xl mx-auto space-y-8">
          {messages.map(m => (
            <div key={m.id} className="flex gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">

              {/* Avatar Column */}
              <div className="flex-shrink-0 mt-1">
                {m.role === 'user' ? (
                  <div className="w-8 h-8 rounded-full bg-[#333] flex items-center justify-center border border-[#444]">
                    <User size={16} className="text-gray-200" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                    <Bot size={16} className="text-white" />
                  </div>
                )}
              </div>

              {/* Content Column */}
              <div className="flex-1 space-y-2">
                <p className="font-semibold text-sm text-gray-400">
                  {m.role === 'user' ? 'You' : 'Kinetiq'}
                </p>
                <div className="prose prose-invert max-w-none text-[15px] leading-7 text-gray-200">
                  {m.content.split('\n').map((line, i) => (
                    <p key={i} className="mb-2 last:mb-0">
                      {line.replace(/\*\*/g, '')}
                      {/* Simple text render first to match clean style, can add Markdown component later if needed */}
                    </p>
                  ))}
                </div>
              </div>

            </div>
          ))}
          {isLoading && (
            <div className="flex gap-4 max-w-3xl mx-auto pl-[48px]">
              <span className="w-2 h-2 bg-gray-600 rounded-full animate-pulse" />
              <span className="w-2 h-2 bg-gray-600 rounded-full animate-pulse delay-75" />
              <span className="w-2 h-2 bg-gray-600 rounded-full animate-pulse delay-150" />
            </div>
          )}
        </div>
      </div>

      {/* Input Area - Fixed Bottom */}
      <div className="p-4 bg-black/80 backdrop-blur-lg border-t border-[#333] z-20">
        <div className="max-w-3xl mx-auto relative">
          <form onSubmit={handleSubmit} className="relative">
            <input
              className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl pl-4 pr-12 py-3.5 text-sm text-white focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all placeholder:text-gray-500"
              value={input}
              onChange={handleInputChange}
              placeholder="Ask anything..."
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              {isLoading ? (
                <button type="button" onClick={() => stop()} className="p-2 text-gray-400 hover:text-white transition-colors">
                  <StopCircle size={18} />
                </button>
              ) : (
                <button type="submit" disabled={!input} className="p-2 text-gray-400 hover:text-white transition-colors disabled:opacity-50">
                  <Send size={18} />
                </button>
              )}
            </div>
          </form>
          <p className="text-center text-[10px] text-gray-600 mt-3 font-mono">
            Kinetiq AI can make mistakes.
          </p>
        </div>
      </div>
    </div>
  );
};
