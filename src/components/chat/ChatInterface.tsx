"use client";

import { useState, useRef, useEffect } from "react";
import { Send, User, Bot, Paperclip, Smile } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface Message {
  id?: string;
  role: "user" | "assistant";
  content: string;
}

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      role: "assistant",
      content: "Hello! I'm your Kinetiq Coach. 🤖\n\nI can help you with:\n- **Workout Plans** tailored to your goals.\n- **Meal Suggestions** with macros.\n\nHow can I help you today?"
    }
  ]);
  const [input, setInput] = useState("");
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

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: "assistant", content: data.reply },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: "assistant", content: "⚠️ Connection error. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full max-w-4xl mx-auto bg-[#1e1e1e] rounded-3xl shadow-2xl overflow-hidden border border-[#2e2e2e]">

      {/* HEADER - Messenger Style */}
      <div className="bg-[#252525] p-4 flex items-center justify-between border-b border-[#333]">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg">
              <Bot size={24} className="text-white" />
            </div>
            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-[#252525]"></div>
          </div>
          <div>
            <h2 className="text-white font-bold text-lg">Kinetiq Coach</h2>
            <p className="text-gray-400 text-xs font-medium">Active now</p>
          </div>
        </div>
        <Button variant="ghost" className="!p-2 text-gray-400 hover:text-white">
          <span className="text-2xl">⋮</span>
        </Button>
      </div>

      {/* MESSAGES AREA */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#121212]">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex w-full ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {/* Avatar for Assistant */}
            {msg.role === "assistant" && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 flex flex-shrink-0 items-center justify-center mr-3 mt-auto shadow-md">
                <Bot size={14} className="text-white" />
              </div>
            )}

            <div
              className={`max-w-[75%] px-5 py-3 text-[15px] leading-relaxed shadow-sm relative
                ${msg.role === "user"
                  ? "bg-[#3062FF] text-white rounded-[20px] rounded-br-[4px]"
                  : "bg-[#252525] text-gray-100 rounded-[20px] rounded-bl-[4px]"
                }
              `}
            >
              {/* Content Parsing */}
              {msg.content.split("\n").map((line, i) => {
                if (!line.trim()) return <div key={i} className="h-3" />;

                // Simple formatting
                const formattedLine = line
                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" class="underline font-bold decoration-white/50">$1</a>');

                if (line.startsWith("##")) return <h3 key={i} dangerouslySetInnerHTML={{ __html: formattedLine.replace(/#/g, '') }} className="text-lg font-bold mb-2 mt-2" />;
                if (line.trim().startsWith("- ")) return <div key={i} className="pl-2 mb-1 flex"><span className="mr-2">•</span><span dangerouslySetInnerHTML={{ __html: formattedLine.substring(2) }} /></div>;

                return <p key={i} dangerouslySetInnerHTML={{ __html: formattedLine }} className="mb-1" />;
              })}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start w-full">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 flex flex-shrink-0 items-center justify-center mr-3 mt-auto shadow-md">
              <Bot size={14} className="text-white" />
            </div>
            <div className="bg-[#252525] px-4 py-3 rounded-[20px] rounded-bl-[4px] flex items-center gap-1.5">
              <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* INPUT AREA - Pill Shape at bottom */}
      <div className="bg-[#1e1e1e] p-4 border-t border-[#2e2e2e]">
        <div className="flex items-center gap-3 bg-[#2a2a2a] rounded-full px-4 py-2 border border-[#3a3a3a] transition-colors focus-within:border-[#3062FF]">
          <button className="text-gray-400 hover:text-white transition-colors">
            <Paperclip size={20} />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Message Coach Kinetiq..."
            className="flex-1 bg-transparent border-none outline-none text-white text-sm placeholder-gray-500 h-10"
          />
          <button className="text-gray-400 hover:text-white transition-colors">
            <Smile size={20} />
          </button>
          <Button
            onClick={sendMessage}
            disabled={!input.trim()}
            className={`!w-8 !h-8 !p-0 !rounded-full flex items-center justify-center transition-all ${input.trim() ? "bg-[#3062FF] hover:bg-blue-600 scale-100" : "bg-gray-600 scale-90 opacity-50"
              }`}
          >
            <Send size={14} className="text-white ml-0.5" />
          </Button>
        </div>
        <p className="text-[10px] text-center text-gray-600 mt-2 font-medium">
          AI-generated advice. Consult a professional for medical needs.
        </p>
      </div>
    </div>
  );
};
