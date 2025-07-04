import React, { useEffect, useRef, useState } from "react";
import {
  FileSearch,
  Brain,
  BookOpenCheck,
  MessageSquare,
  Sparkles,
  Lightbulb,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ChatSection = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const useCases = [
    {
      icon: <FileSearch className="w-10 h-10 text-[#FFB200]" />,
      title: "Smart Paper Search",
      desc: "Query research papers using natural language—instantly fetch results from arXiv.",
    },
    {
      icon: <Brain className="w-10 h-10 text-[#FFB200]" />,
      title: "AI Summarization",
      desc: "Summarize dense academic papers into clear, digestible summaries in seconds.",
    },
    {
      icon: <BookOpenCheck className="w-10 h-10 text-[#FFB200]" />,
      title: "Citation Formatting",
      desc: "Auto-generate citations in MLA, APA, Chicago, and more with one click.",
    },
    {
      icon: <MessageSquare className="w-10 h-10 text-[#FFB200]" />,
      title: "Conversational Research",
      desc: "Ask questions like you would on ChatGPT—refine, clarify, and dive deeper.",
    },
    {
      icon: <Lightbulb className="w-10 h-10 text-[#FFB200]" />,
      title: "Topic Exploration",
      desc: "Explore trending fields like quantum gravity, string theory, AI safety, and more.",
    },
    {
      icon: <Sparkles className="w-10 h-10 text-[#FFB200]" />,
      title: "Promising Features",
      desc: "Bookmark papers, save chats, request code from papers— implementation is coming soon.",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [isVisible]);

  const fadeIn = isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4";
  const transition = "transition-all duration-700 ease-out";

  return (
    <section
      id="get-started"
      ref={sectionRef}
      className="relative min-h-screen py-24 px-4 bg-black text-white flex flex-col justify-center items-center overflow-hidden"
    >
      {/* ⭐ Background Layers */}
      <div className="stars absolute top-0 left-0 w-full h-full z-0"></div>
      <div className="twinkling absolute top-0 left-0 w-full h-full z-0"></div>

      {/* 💡 Content */}
      <div className="w-full max-w-6xl text-center relative z-10">
        <h2 className={`text-4xl md:text-6xl font-bold mb-12 text-center logotitle ${fadeIn} ${transition}`}>
          Get Started
        </h2>

        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 ${fadeIn} ${transition}`}>
          {useCases.map((uc, idx) => (
            <div
              key={idx}
              className="p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 shadow-lg text-center flex flex-col items-center transform transition-transform duration-300 hover:scale-105 hover:bg-white/10"
            >
              <div className="mb-4">{uc.icon}</div>
              <h3 className="text-2xl font-semibold mb-2">{uc.title}</h3>
              <p className="text-white/80 text-sm">{uc.desc}</p>
            </div>
          ))}
        </div>

        {/* ✨ Chat Button */}
        <button
          onClick={() => navigate('/chat')}
          className="mt-12 px-8 py-3 bg-gradient-to-r from-[#FFB200] via-[#EB5B00] to-[#E52020] text-black font-bold rounded-lg hover:opacity-90 transition"
        >
          Chat Now
        </button>
      </div>
    </section>
  );
};

export default ChatSection;
