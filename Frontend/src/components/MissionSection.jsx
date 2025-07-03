import React, { useEffect, useRef, useState } from "react";
import { Search, BookOpenCheck, Sparkles, FileText } from "lucide-react";
<<<<<<< HEAD
import { HeyCosmico } from "./HeyCosmico"; 
import "./Home.css"; 
=======
import { HeyCosmico } from "./HeyCosmico"; // ✅ Adjust if your HeyCosmico is in a different folder
import "./Home.css"; // ✅ This should include .stars and .twinkling
>>>>>>> 10c34de4 (Fixed_corrupted_files_and_backend_ready)

const MissionSection = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

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
      id="mission"
      ref={sectionRef}
      className="relative min-h-screen py-24 px-4 z-10 text-white overflow-hidden background-container"
    >
<<<<<<< HEAD
      {/*  Background */}
      <div className="stars absolute top-0 left-0 w-full h-full z-0"></div>
      <div className="twinkling absolute top-0 left-0 w-full h-full z-0"></div>

      {/*  Mission Content */}
=======
      {/* ⭐ Background */}
      <div className="stars absolute top-0 left-0 w-full h-full z-0"></div>
      <div className="twinkling absolute top-0 left-0 w-full h-full z-0"></div>

      {/* 🔍 Mission Content */}
>>>>>>> 10c34de4 (Fixed_corrupted_files_and_backend_ready)
      <div className="container mx-auto max-w-5xl relative z-10">
        <h2
          className={`text-4xl md:text-6xl font-bold mb-12 text-center logotitle ${fadeIn} ${transition}`}
        >
          Our Mission
        </h2>

        <p
          className={`text-center text-white/90 text-lg md:text-xl font-medium leading-relaxed mb-12 max-w-3xl mx-auto ${fadeIn} ${transition}`}
        >
          Cosmico is built to revolutionize how researchers engage with scientific
          literature—merging AI with academic exploration for a faster, smarter workflow.
        </p>

        <div className={`grid gap-8 sm:grid-cols-2 ${fadeIn} ${transition}`}>
          <Feature
            icon={<Search className="h-6 w-6 text-primary" />}
            title="Intelligent Search"
            desc="Retrieve and filter relevant papers using natural language queries with real-time arXiv access."
          />
          <Feature
            icon={<BookOpenCheck className="h-6 w-6 text-primary" />}
            title="AI Summarization"
            desc="Use GPT-based models to break down papers into concise, digestible insights instantly."
          />
          <Feature
            icon={<FileText className="h-6 w-6 text-primary" />}
            title="Citation Generation"
            desc="Auto-generate proper citations in multiple formats to streamline referencing."
          />
          <Feature
            icon={<Sparkles className="h-6 w-6 text-primary" />}
            title="Future Capabilities"
            desc="Long-term memory, real-time agents, and deeper paper comparison are being built."
          />
        </div>
      </div>

    
      <div className="relative z-20 mt-6 min-h-[160px] sm:min-h-[180px] md:min-h-[200px]">
        <HeyCosmico />
      </div>

    </section>
  );
};

const Feature = ({ icon, title, desc }) => (
  <div className="flex items-start gap-4">
    <div className="p-3 rounded-full bg-primary/20">{icon}</div>
    <div>
      <h3 className="text-2xl font-semibold text-[#FFB200]">{title}</h3>
      <p className="text-white/90 text-base md:text-lg font-medium leading-relaxed">
        {desc}
      </p>
    </div>
  </div>
);

export default MissionSection;
