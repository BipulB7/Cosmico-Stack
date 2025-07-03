import { useEffect, useRef } from "react";
import "./HeyCosmico.css";

export const HeyCosmico = () => {
  const textRef = useRef(null);

  useEffect(() => {
    const texts = [
      "What's the latest research on quantum gravity?",
      "I need to find new papers on String Theory.",
      "Synthesize this paper for me please.",
    ];

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const speed = 40;
    const delay = 1800;

    const type = () => {
      if (!textRef.current) return;

      const fullText = texts[textIndex];

      if (isDeleting) {
        textRef.current.textContent = fullText.substring(0, charIndex--);
      } else {
        textRef.current.textContent = fullText.substring(0, charIndex++);
      }

      if (!isDeleting && charIndex === fullText.length) {
        isDeleting = true;
        setTimeout(type, delay);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(type, speed);
      } else {
        setTimeout(type, speed);
      }
    };

    type();
  }, []);

  return (
    <div className="heycosmico-container">
      <div className="heycosmico-quote-mark">“</div>
      <h2 className="heycosmico-title">Hey Cosmico...</h2>
      <p className="heycosmico-text">
        <span ref={textRef} className="typed-text"></span>
        <span className="blinking-cursor">_</span>
      </p>
    </div>
  );
};
