
import { useEffect, useRef, useState } from "react";

export const useFadeInOnScroll = (threshold = 0.3) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [isVisible, threshold]);

  const fadeInClass = isVisible ? "animate-fade-in" : "opacity-0";

  return { ref, fadeInClass };
};