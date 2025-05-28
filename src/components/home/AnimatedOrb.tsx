"use client";

import React from "react";
import { motion } from "framer-motion";

const AnimatedOrb = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Main central orb */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div className="relative w-80 h-80 md:w-96 md:h-96">
          {/* Outer glow ring */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/15 via-pink-500/15 to-blue-500/15 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Main orb */}
          <div className="absolute inset-8 rounded-full bg-gradient-to-br from-purple-600/30 via-pink-500/30 to-blue-600/30 backdrop-blur-sm">
            {/* Inner core */}
            <motion.div
              className="absolute inset-4 rounded-full bg-gradient-to-br from-purple-400/40 via-pink-400/40 to-blue-400/40"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* Innermost core */}
              <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/10 to-transparent" />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Simplified floating particles */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 bg-white/30 rounded-full"
          style={{
            left: `${30 + i * 20}%`,
            top: `${40 + i * 5}%`,
          }}
          animate={{
            y: [-15, 15, -15],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}

      {/* Side accent orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-purple-500/20 to-transparent blur-2xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [-10, 10, -10],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/4 w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-blue-500/20 to-transparent blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [10, -10, 10],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </div>
  );
};

export default AnimatedOrb;
