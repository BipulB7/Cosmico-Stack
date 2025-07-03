// src/components/TechShowcase.jsx
import React from "react";
import arxiv from "../assets/arx.png";
import openai from "../assets/open.png";
import reactLogo from "../assets/ree.png";
import js from "../assets/js.png";

export const TechShowcase = () => {
  const logos = [arxiv, openai, reactLogo, js];

  return (
    <div className="flex flex-col items-center bg-black/30 backdrop-blur-sm py-6 w-full">
      {/* Header */}
      <h3 className="text-white text-xl font-semibold mb-4">
        Created skillfully with:
      </h3>

      {/* Outer container to hide overflow */}
      <div className="overflow-hidden w-[320px]">
        {/* Animated scroll container */}
        <div className="animate-scroll gap-8">
          {/* Repeat logos twice for seamless scroll */}
          {[...logos, ...logos].map((logo, idx) => (
            <div
              key={idx}
              className="inline-block min-w-[64px] mx-4"
            >
              <img
                src={logo}
                alt={`Tech-${idx}`}
                className="w-12 h-12 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
