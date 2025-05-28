"use client";

import React from "react";
import { motion } from "framer-motion";

interface AnimatedAgentIconProps {
  icon: string;
  size?: "sm" | "md" | "lg";
  isHovered?: boolean;
}

const AnimatedAgentIcon: React.FC<AnimatedAgentIconProps> = ({
  icon,
  size = "md",
  isHovered = false,
}) => {
  const sizeClasses = {
    sm: "text-xl w-8 h-8",
    md: "text-3xl w-12 h-12",
    lg: "text-4xl w-16 h-16",
  };

  return (
    <motion.div
      className={`
        relative flex items-center justify-center rounded-2xl
        bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-pink-500/20
        border border-white/20 backdrop-blur-sm
        ${sizeClasses[size]}
      `}
      animate={
        isHovered
          ? {
              y: [-2, 2, -2],
              rotateY: [0, 5, -5, 0],
              scale: [1, 1.05, 1],
            }
          : {
              y: [-1, 1, -1],
            }
      }
      transition={{
        duration: isHovered ? 0.6 : 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 rounded-2xl"
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 3,
          ease: "easeInOut",
        }}
      />

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-purple-400/30 to-blue-400/30 rounded-2xl blur-xl"
        animate={
          isHovered
            ? {
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }
            : {
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.4, 0.2],
              }
        }
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Icon */}
      <span className="relative z-10 filter drop-shadow-lg">{icon}</span>
    </motion.div>
  );
};

export default AnimatedAgentIcon;
