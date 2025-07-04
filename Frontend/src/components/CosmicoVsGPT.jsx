// components/CosmicoVsGPT.jsx
import React, { useEffect, useRef, useState } from "react";
import { BrainCog, Globe, BookOpenText, FileSearch } from "lucide-react";


const CosmicoVsGPT = () => {
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
      id="cosmico-vs-gpt"
      ref={sectionRef}
      className="relative min-h-screen py-24 px-4 z-10 text-white overflow-hidden background-container"
    >
      {/* Background */}
      <div className="stars absolute top-0 left-0 w-full h-full z-0"></div>
      <div className="twinkling absolute top-0 left-0 w-full h-full z-0"></div>

      {/* Header */}
      <div className="container mx-auto max-w-5xl relative z-10">
        <h2 className={`text-4xl md:text-6xl font-bold mb-12 text-center logotitle ${fadeIn} ${transition}`}>
          Cosmico vs. ChatGPT
        </h2>

        <p
          className={`text-center text-white/90 text-lg md:text-xl font-medium leading-relaxed mb-12 max-w-3xl mx-auto ${fadeIn} ${transition}`}
        >
          Cosmico is not just another chatbot—it’s an ArXiV-specific assistant tailored for scientific research.
        </p>

        <div className={`grid gap-8 sm:grid-cols-2 ${fadeIn} ${transition}`}>
        <Feature
  icon={<FileSearch className="h-6 w-6 text-primary" />}
  title="Smart Research Pipeline"
  desc={
    <>
      Cosmico intelligently detects when to fetch scientific papers from arXiv and directly cross-communicates with the ArXiv API to incorporate papers into responses.
      <br /><br />
      This allows for real-time content access from papers to synthesize, summarize or cite texts, which GPT cannot do.
    </>
  }
/>


          <Feature
            icon={<Globe className="h-6 w-6 text-primary" />}
            title="Citations & Paper Retrieval"
            desc="Cosmico lets users get BibTeX citations and direct downloadable links to relevant literature. GPT can't fully fetch or cite papers without external links/pasted content."
          />
          <Feature
            icon={<BrainCog className="h-6 w-6 text-primary" />}
            title="Smart Model Routing"
            desc="Cosmico auto-chooses between GPT-3.5 Turbo or GPT-4o to optimize cost and relevance based on your query type."
          />
          <Feature
            icon={<BrainCog className="h-6 w-6 text-primary" />}
            title="Smart Comaprisons"
            desc="Cosmico can fetch top quality amongst multiple papers on a given subject based on relevancy/strength by live-comparing results. This allows for a wide range of research perspectives. "
          />
        </div>
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

export default CosmicoVsGPT;
