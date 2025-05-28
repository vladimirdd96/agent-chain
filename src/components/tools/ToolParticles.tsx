"use client";

import React from "react";
import { motion } from "framer-motion";

const ToolParticles: React.FC = () => {
  // Generate tool-themed particles (code symbols, gear icons, etc.)
  const particles = [
    { icon: "⚙️", delay: 0, duration: 20 },
    { icon: "🔧", delay: 2, duration: 25 },
    { icon: "⚡", delay: 4, duration: 18 },
    { icon: "🔗", delay: 6, duration: 22 },
    { icon: "💻", delay: 8, duration: 24 },
    { icon: "🛠️", delay: 10, duration: 19 },
    { icon: "⚙️", delay: 12, duration: 21 },
    { icon: "🔧", delay: 14, duration: 23 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle, index) => (
        <motion.div
          key={index}
          className="absolute text-white/5 text-xl"
          initial={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 50,
            opacity: 0,
          }}
          animate={{
            y: -50,
            opacity: [0, 0.3, 0.6, 0.3, 0],
            x: Math.random() * window.innerWidth,
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {particle.icon}
        </motion.div>
      ))}

      {/* Additional geometric shapes */}
      {Array.from({ length: 6 }).map((_, index) => (
        <motion.div
          key={`shape-${index}`}
          className="absolute w-2 h-2 bg-purple-500/10 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 20,
          }}
          animate={{
            y: -20,
            x: Math.random() * window.innerWidth,
          }}
          transition={{
            duration: 15 + index * 2,
            delay: index * 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

export default ToolParticles;
