"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";

const chars = "!@#$%^&*()_+-=[]{}|;':\",./<>?ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

interface TextScrambleProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
  trigger?: "mount" | "hover" | "view";
}

export default function TextScramble({ 
  text, 
  className = "", 
  delay = 0, 
  speed = 30,
  trigger = "mount" 
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const frameRef = useRef(0);

  const scramble = useCallback(() => {
    if (isScrambling) return;
    setIsScrambling(true);
    let iteration = 0;

    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
        setIsScrambling(false);
        setHasAnimated(true);
      }

      iteration += 1 / 3;
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, isScrambling]);

  useEffect(() => {
    if (trigger === "mount") {
      const timer = setTimeout(scramble, delay);
      return () => clearTimeout(timer);
    }
  }, [trigger, delay, scramble]);

  useEffect(() => {
    if (trigger === "view" && !hasAnimated) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(scramble, delay);
            observer.disconnect();
          }
        },
        { threshold: 0.5 }
      );

      if (ref.current) observer.observe(ref.current);
      return () => observer.disconnect();
    }
  }, [trigger, delay, scramble, hasAnimated]);

  return (
    <motion.span
      ref={ref}
      className={className}
      onMouseEnter={trigger === "hover" ? scramble : undefined}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: delay / 1000 }}
    >
      {displayText}
    </motion.span>
  );
}
