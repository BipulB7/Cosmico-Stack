import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import axios from 'axios';
import './ChatInterface.css';
import MarkdownMessage from './MarkdownMessage';

const starterPrompts = [
  { label: "Fetch a paper on arXiv related to dark matter and summarize it", type: "research" },
  { label: "Fetch a paper on arXiv related to quantum models, then summarize it and generate citations", type: "research" },
  { label: "Access arXiv and provide BibTeX citation for a paper on black hole thermodynamics", type: "research" },
  { label: "What’s a good intro to General Relativity?", type: "general" },
  { label: "Explain reinforcement learning simply", type: "general" }
];

const ChatInterface = ({ messages, onUpdateMessages }) => {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messagesRef = useRef(null);   // scroll only this
  const textareaRef = useRef(null);
  const prevCountRef = useRef(messages.length);

  // Scroll helper that NEVER bumps the page
  const scrollMessagesToBottom = (smooth = true) => {
    const el = messagesRef.current;
    if (!el) return;

    const scrollable = el.scrollHeight > el.clientHeight + 1;
    if (!scrollable) return; // <- key: do nothing if not scrollable

    el.scrollTo({ top: el.scrollHeight, behavior: smooth ? 'smooth' : 'auto' });
  };

  // Only auto-scroll when message count increases (new message appended)
  useEffect(() => {
    const prev = prevCountRef.current;
    const curr = messages.length;
    if (curr > prev) {
      // new message added → scroll inside the pane only if needed
      scrollMessagesToBottom(true);
    }
    prevCountRef.current = curr;
  }, [messages]);

  // Also scroll when we toggle typing on (simulates streaming)
  useEffect(() => {
    if (isTyping) scrollMessagesToBottom(false);
  }, [isTyping]);

  // Auto-resize textarea height
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    const max = 200; // px (about 5–6 lines)
    ta.style.height = 'auto';
    ta.style.height = Math.min(ta.scrollHeight, max) + 'px';
  }, [input]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { type: 'user', text: input };
    const updated = [...messages, userMsg];
    onUpdateMessages(updated);
    setInput('');
    setIsTyping(true);

    try {
      const res = await axios.post('https://cosmico-backend.onrender.com/api/chat', { message: userMsg.text });
      const botMsg = { type: 'bot', text: res.data.response || " No response received." };
      onUpdateMessages([...updated, botMsg]);
    } catch (err) {
      console.error("Error:", err);
      onUpdateMessages([...updated, { type: 'bot', text: " Something went wrong. Try again." }]);
    } finally {
      setIsTyping(false);
    }
  };

  // Enter to send, Shift+Enter newline
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(e);
    }
  };

  return (
    <div className="flex h-full flex-col min-h-0">
      {/* Scrollable messages area */}
      <div
        ref={messagesRef}
        className="flex-1 overflow-y-auto overscroll-contain px-4 pt-4 pb-3 space-y-3"
      >
        {messages.length === 0 && (
          <div className="chat-suggestions">
            <div className="chat-tip">
              💡 <strong>Tip:</strong> To get real arXiv papers, explicitly ask for a paper or mention "arXiv" in your prompt.
              Blue prompts fetch arXiv; gray are general.
            </div>
            {starterPrompts.map((p, i) => (
              <button key={i} onClick={() => setInput(p.label)} className={`suggestion-btn ${p.type}`}>
                {p.label}
              </button>
            ))}
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`chat-msg ${msg.type}`}>
            <div className="msg-bubble break-words whitespace-pre-wrap">
              {msg.type === 'bot' ? <MarkdownMessage content={msg.text} /> : <div>{msg.text}</div>}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="chat-msg bot">
            <div className="msg-bubble typing">
              <span className="dot" /><span className="dot" /><span className="dot" />
            </div>
          </div>
        )}
      </div>

      {/* Sticky composer */}
      <form
        onSubmit={handleSend}
        className="chat-input-area sticky bottom-0 w-full px-4 pb-4 pt-3 bg-black/40 backdrop-blur-md border-t border-white/10"
      >
        <div className="flex items-end gap-2 w-full">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask Cosmico anything… (Shift+Enter for a new line)"
            rows={1}
            className="chat-input flex-grow resize-none rounded-2xl px-4 py-3 bg-white/5 border border-white/15 outline-none focus:ring-2 focus:ring-[#FFB200]/40 text-sm leading-relaxed"
            style={{ minHeight: 48, maxHeight: 200 }}
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="chat-send flex-shrink-0 h-11 w-11 rounded-full border border-white/15 bg-gradient-to-r from-[#FFB200] via-[#EB5B00] to-[#E52020] text-black disabled:opacity-40 grid place-items-center"
            aria-label="Send"
          >
            <Send size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;
