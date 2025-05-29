"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export interface TextGenerateEffectProps {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 1,
}: TextGenerateEffectProps) => {
  const [scope, setScope] = useState<HTMLParagraphElement | null>(null);
  const wordsArray = words.split(" ");

  useEffect(() => {
    if (scope) {
      const spans = scope.querySelectorAll("span");
      spans.forEach((span, idx) => {
        setTimeout(() => {
          span.style.filter = filter ? "blur(0px)" : "none";
          span.style.opacity = "1";
        }, idx * 150);
      });
    }
  }, [scope, filter]);

  const renderWords = () => {
    return (
      <motion.p ref={setScope} className={className}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className="opacity-0"
              style={{
                filter: filter ? "blur(10px)" : "none",
              }}
              initial={{ opacity: 0, filter: filter ? "blur(10px)" : "none" }}
              animate={{ opacity: 1, filter: filter ? "blur(0px)" : "none" }}
              transition={{
                duration: duration,
                ease: "easeInOut",
                delay: idx * 0.1,
              }}
            >
              {word}{" "}
            </motion.span>
          );
        })}
      </motion.p>
    );
  };

  return <div>{renderWords()}</div>;
};

export default TextGenerateEffect;
