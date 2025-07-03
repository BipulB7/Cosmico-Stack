import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import './ChatInterface.css';

const starterPrompts = [
  "Summarize the latest paper on quantum gravity",
  "Compare two papers on string theory",
  "Generate BibTeX citations",
  "What’s a good intro to General Relativity?"
];

const ChatInterface = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [interacted, setInteracted] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null);

  // Scroll to bottom on new message
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { type: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setInteracted(true);
    setIsTyping(true);

    // Simulated bot typing + response
    setTimeout(() => {
      const botMsg = {
        type: 'bot',
        text: "🚀 I'm Cosmico – I’ll help with your research soon!"
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="chatbox">
      <div className="chat-content">
        {/* Starter suggestions (only show before first interaction) */}
        {!interacted && (
          <div className="chat-suggestions">
            {starterPrompts.map((prompt, i) => (
              <button key={i} onClick={() => setInput(prompt)}>
                {prompt}
              </button>
            ))}
          </div>
        )}

        {/* Messages */}
        {messages.map((msg, i) => (
          <div key={i} className={`chat-msg ${msg.type}`}>
            <div className="msg-bubble">{msg.text}</div>
          </div>
        ))}

        {/* Typing animation */}
        {isTyping && (
          <div className="chat-msg bot">
            <div className="msg-bubble typing">
              <span className="dot" />
              <span className="dot" />
              <span className="dot" />
            </div>
          </div>
        )}

        {/* Scroll target */}
        <div ref={bottomRef}></div>
      </div>

      {/* Input area */}
      <form className="chat-input-area" onSubmit={handleSend}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Cosmico anything..."
          className="chat-input"
        />
        <button type="submit" disabled={!input.trim()} className="chat-send">
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

export default ChatInterface;
