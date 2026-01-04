"use client";

import { useState, useRef, useEffect } from "react";
import { Send, User, Bot } from "lucide-react";
import { Button } from "@/components/ui/Button";

type Message = {
  id: string;
  role: "user" | "assistant";
  text: string;
};

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      text: "Hello! I'm your Kinetiq Coach. I've analyzed your onboarding data. Your 5K goal looks ambitious but achievable. How are you feeling about your first scheduled run?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMsg: Message = { id: Date.now().toString(), role: "user", text: input };
    setMessages(prev => [...prev, newMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });

      const data = await response.json();

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        text: data.reply
      }]);

    } catch (error) {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        text: "Connection error. Please check your network."
      }]);
    } finally {
      setIsLoading(false); // Set loading false after fetch completes or errors
    }
  };

  const renderMessageContent = (text: string) => {
    // Simple Markdown Parser
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      // Bold: **text**
      const boldRegex = /\*\*(.*?)\*\*/g;
      const hasBold = boldRegex.test(line);

      // List items: - item
      if (line.trim().startsWith('- ')) {
        const content = line.trim().substring(2);
        return (
          <li key={idx} className="ml-4 list-disc mb-1">
            {hasBold ? <span dangerouslySetInnerHTML={{ __html: content.replace(boldRegex, '<b>$1</b>') }} /> : content}
          </li>
        );
      }

      // Paragraphs with bold support
      return (
        <p key={idx} className="mb-2 last:mb-0 min-h-[1.2em]">
          {hasBold ? <span dangerouslySetInnerHTML={{ __html: line.replace(boldRegex, '<b>$1</b>') }} /> : line}
        </p>
      );
    });
  };

  return (
    <div className="chat-container glass-panel flex flex-col h-[600px]">
      <div className="chat-header p-4 border-b border-white/10">
        <h2 className="text-lg font-bold flex items-center gap-2">
          🤖 Kinetiq Coach <span className="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded-full">Online</span>
        </h2>
      </div>

      <div className="messages flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message flex ${msg.role === "user" ? "justify-end" : "justify-start"
              }`}
          >
            <div
              className={`max-w-[80%] rounded-2xl p-3 ${msg.role === "user"
                ? "bg-[#3062ff] text-white rounded-br-none"
                : "bg-[#1c1c1e] text-gray-200 rounded-bl-none border border-white/10"
                }`}
            >
              {renderMessageContent(msg.text)}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-[#1c1c1e] p-3 rounded-2xl rounded-bl-none border border-white/10 flex gap-2">
              <span className="dot-pulse">.</span><span className="dot-pulse delay-100">.</span><span className="dot-pulse delay-200">.</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask your coach anything..."
          className="chat-input"
        />
        <Button variant="primary" onClick={handleSend} className="send-btn">
          <Send size={18} />
        </Button>
      </div>

      <style jsx>{`
        .chat-container {
          display: flex;
          flex-direction: column;
          height: 100%;
          border-radius: var(--radius-lg);
          overflow: hidden;
        }

        .messages-area {
          flex: 1;
          padding: 24px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .message-row {
          display: flex;
          gap: 12px;
          max-width: 80%;
        }

        .user-row {
          align-self: flex-end;
          flex-direction: row-reverse;
        }

        .bot-row {
          align-self: flex-start;
        }

        .avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .avatar.user { background: rgba(255,255,255,0.1); color: white; }
        .avatar.assistant { background: var(--kinetiq-electric); color: white; }

        .bubble {
          padding: 12px 16px;
          border-radius: 18px;
          font-size: 0.95rem;
          line-height: 1.5;
        }

        .bubble.user {
          background: var(--kinetiq-volt);
          color: var(--kinetiq-black);
          border-bottom-right-radius: 4px;
        }

        .bubble.assistant {
          background: rgba(255,255,255,0.05);
          color: white;
          border-bottom-left-radius: 4px;
        }

        .input-area {
          padding: 16px;
          background: rgba(0,0,0,0.2);
          display: flex;
          gap: 12px;
          border-top: 1px solid rgba(255,255,255,0.05);
        }

        .chat-input {
          flex: 1;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px;
          padding: 0 16px;
          color: white;
          outline: none;
        }

        .chat-input:focus {
          border-color: var(--kinetiq-volt);
        }
      `}</style>
    </div>
  );
};
