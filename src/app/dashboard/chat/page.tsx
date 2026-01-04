"use client";

import { ChatInterface } from "@/components/chat/ChatInterface";

export default function ChatPage() {
  return (
    <div className="chat-page">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">AI Coach</h1>
        <p className="text-secondary">Scientific advice tailored to your physiology.</p>
      </header>

      <div className="chat-wrapper">
        <ChatInterface />
      </div>

      <style jsx>{`
        .chat-page {
          height: calc(100vh - 64px); /* Adjust for padding */
          display: flex;
          flex-direction: column;
        }
        .mb-6 { margin-bottom: 24px; }
        .text-2xl { font-size: 1.5rem; }
        .font-bold { font-weight: 700; }
        .text-secondary { color: var(--text-secondary); }
        
        .chat-wrapper {
          flex: 1;
          min-height: 0; /* Enable scrolling inside */
        }
      `}</style>
    </div>
  );
}
