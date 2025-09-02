import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
<<<<<<< HEAD
<<<<<<< HEAD
import axios from 'axios';
import './ChatInterface.css';

const starterPrompts = [
  {
    label: "Fetch a paper on arXiv related to dark matter and summarize it",
    type: "research"
  },
  {
    label: "Fetch a paper on arXiv related to quantum models, then summarize it and generate citations",
    type: "research"
  },
  {
    label: "Access arXiv and provide BibTeX citation for a paper on black hole thermodynamics",
    type: "research"
  },
  {
    label: "What’s a good intro to General Relativity?",
    type: "general"
  },
  {
    label: "Explain reinforcement learning simply",
    type: "general"
  }
];

const ChatInterface = ({ messages, onUpdateMessages }) => {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null);

=======
=======
import axios from 'axios';
>>>>>>> d23eb93d (Front+Backend fully live! Website deployment ready.)
import './ChatInterface.css';

const starterPrompts = [
  {
    label: "Access arXiv and summarize the introduction of a recent paper on quantum gravity",
    type: "research"
  },
  {
    label: "Find a recent arXiv paper on string theory and explain its key results",
    type: "research"
  },
  {
    label: "Fetch a paper on arXiv related to dark matter and summarize it",
    type: "research"
  },
  {
    label: "Use arXiv to compare two recent studies on quantum computing",
    type: "research"
  },
  {
    label: "Access arXiv and provide BibTeX citation for a paper on black hole thermodynamics",
    type: "research"
  },
  {
    label: "What’s a good intro to General Relativity?",
    type: "general"
  },
  {
    label: "Explain reinforcement learning simply",
    type: "general"
  }
];

const ChatInterface = ({ messages, onUpdateMessages }) => {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null);

<<<<<<< HEAD
  // Scroll to bottom on new message
>>>>>>> 10c34de4 (Fixed_corrupted_files_and_backend_ready)
=======
>>>>>>> d23eb93d (Front+Backend fully live! Website deployment ready.)
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
<<<<<<< HEAD
<<<<<<< HEAD
  }, [messages, isTyping]);

  const handleSend = async (e) => {
=======
  }, [messages]);

  const handleSend = (e) => {
>>>>>>> 10c34de4 (Fixed_corrupted_files_and_backend_ready)
=======
  }, [messages, isTyping]);

  const handleSend = async (e) => {
>>>>>>> d23eb93d (Front+Backend fully live! Website deployment ready.)
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { type: 'user', text: input };
<<<<<<< HEAD
<<<<<<< HEAD
    const updatedMessages = [...messages, userMsg];
    onUpdateMessages(updatedMessages);
    setInput('');
    setIsTyping(true);

    try {
      const res = await axios.post('https://cosmico-backend.onrender.com/api/chat', {
        message: input
      });

      const botMsg = {
        type: 'bot',
        text: res.data.response || " No response received."
      };

      onUpdateMessages([...updatedMessages, botMsg]);
    } catch (err) {
      console.error("Error:", err);
      const errorMsg = {
        type: 'bot',
        text: " Something went wrong. Try again."
      };
      onUpdateMessages([...updatedMessages, errorMsg]);
    } finally {
      setIsTyping(false);
    }
=======
    setMessages((prev) => [...prev, userMsg]);
=======
    const updatedMessages = [...messages, userMsg];
    onUpdateMessages(updatedMessages);
>>>>>>> d23eb93d (Front+Backend fully live! Website deployment ready.)
    setInput('');
    setIsTyping(true);

    try {
      const res = await axios.post('http://localhost:4000/api/chat', {
        message: input
      });

      const botMsg = {
        type: 'bot',
        text: res.data.response || "⚠️ No response received."
      };

      onUpdateMessages([...updatedMessages, botMsg]);
    } catch (err) {
      console.error("Error:", err);
      const errorMsg = {
        type: 'bot',
        text: "❌ Something went wrong. Try again."
      };
      onUpdateMessages([...updatedMessages, errorMsg]);
    } finally {
      setIsTyping(false);
<<<<<<< HEAD
    }, 1200);
>>>>>>> 10c34de4 (Fixed_corrupted_files_and_backend_ready)
=======
    }
>>>>>>> d23eb93d (Front+Backend fully live! Website deployment ready.)
  };

  return (
    <div className="chatbox">
      <div className="chat-content">
<<<<<<< HEAD
<<<<<<< HEAD
        {messages.length === 0 && (
          <div className="chat-suggestions">
            <div className="chat-tip">
              💡 <strong>Tip:</strong> To get real arXiv papers, explicitly ask for a paper or mention "arXiv" in your prompt. Blue color coded prompts are ArXiV inducing, which gray ones are for general use.
            </div>
            {starterPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => setInput(prompt.label)}
                className={`suggestion-btn ${prompt.type}`}
              >
                {prompt.label}
=======
        {/* Starter suggestions (only show before first interaction) */}
        {!interacted && (
=======
        {messages.length === 0 && (
>>>>>>> d23eb93d (Front+Backend fully live! Website deployment ready.)
          <div className="chat-suggestions">
            <div className="chat-tip">
              💡 <strong>Tip:</strong> To get real arXiv papers, explicitly ask for a paper or mention "arXiv" in your prompt. Blue color coded prompts are ArXiV inducing, which gray ones are for general use.
            </div>
            {starterPrompts.map((prompt, i) => (
<<<<<<< HEAD
              <button key={i} onClick={() => setInput(prompt)}>
                {prompt}
>>>>>>> 10c34de4 (Fixed_corrupted_files_and_backend_ready)
=======
              <button
                key={i}
                onClick={() => setInput(prompt.label)}
                className={`suggestion-btn ${prompt.type}`}
              >
                {prompt.label}
>>>>>>> d23eb93d (Front+Backend fully live! Website deployment ready.)
              </button>
            ))}
          </div>
        )}

<<<<<<< HEAD
<<<<<<< HEAD
=======
        {/* Messages */}
>>>>>>> 10c34de4 (Fixed_corrupted_files_and_backend_ready)
=======
>>>>>>> d23eb93d (Front+Backend fully live! Website deployment ready.)
        {messages.map((msg, i) => (
          <div key={i} className={`chat-msg ${msg.type}`}>
            <div className="msg-bubble">{msg.text}</div>
          </div>
        ))}

<<<<<<< HEAD
<<<<<<< HEAD
        {isTyping && (
          <div className="chat-msg bot">
            <div className="msg-bubble typing">
              <span className="dot" /><span className="dot" /><span className="dot" />
=======
        {/* Typing animation */}
        {isTyping && (
          <div className="chat-msg bot">
            <div className="msg-bubble typing">
              <span className="dot" />
              <span className="dot" />
              <span className="dot" />
>>>>>>> 10c34de4 (Fixed_corrupted_files_and_backend_ready)
=======
        {isTyping && (
          <div className="chat-msg bot">
            <div className="msg-bubble typing">
              <span className="dot" /><span className="dot" /><span className="dot" />
>>>>>>> d23eb93d (Front+Backend fully live! Website deployment ready.)
            </div>
          </div>
        )}

<<<<<<< HEAD
<<<<<<< HEAD
        <div ref={bottomRef}></div>
      </div>

=======
        {/* Scroll target */}
        <div ref={bottomRef}></div>
      </div>

      {/* Input area */}
>>>>>>> 10c34de4 (Fixed_corrupted_files_and_backend_ready)
=======
        <div ref={bottomRef}></div>
      </div>

>>>>>>> d23eb93d (Front+Backend fully live! Website deployment ready.)
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
