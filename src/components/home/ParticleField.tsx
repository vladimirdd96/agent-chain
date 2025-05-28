"use client";

import React from "react";
import { motion } from "framer-motion";

const ParticleField = () => {
  // Generate fewer particles with optimized properties
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 8 + 4,
    delay: Math.random() * 3,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white/15"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [-10, 10, -10],
            opacity: [0, 0.6, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay,
          }}
        />
      ))}

      {/* Simplified floating elements */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-0.5 h-16 bg-gradient-to-b from-purple-500/30 to-transparent"
        animate={{
          rotate: [0, 180, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute bottom-1/3 left-1/5 w-0.5 h-12 bg-gradient-to-b from-blue-500/30 to-transparent"
        animate={{
          rotate: [360, 180, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
          delay: 2,
        }}
      />
    </div>
  );
};

export default ParticleField;
