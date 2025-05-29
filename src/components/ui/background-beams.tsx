"use client";

import React from "react";
import { motion } from "framer-motion";

export const BackgroundBeams = () => {
  const beams = Array.from({ length: 6 }, (_, i) => i);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {beams.map((index) => (
        <motion.div
          key={index}
          className="absolute h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${200 + Math.random() * 300}px`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
          animate={{
            opacity: [0, 0.5, 0],
            scaleX: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Additional subtle beams */}
      {beams.map((index) => (
        <motion.div
          key={`beam-${index}`}
          className="absolute h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${150 + Math.random() * 200}px`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
          animate={{
            opacity: [0, 0.3, 0],
            scaleX: [0, 1, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};
