"use client";

import React from "react";
import { motion } from "framer-motion";

interface AnimatedToolIconProps {
  icon: string;
  category: string;
  className?: string;
}

const AnimatedToolIcon: React.FC<AnimatedToolIconProps> = ({
  icon,
  category,
  className = "text-3xl",
}) => {
  // Different animation patterns based on category
  const getAnimationPattern = () => {
    switch (category) {
      case "Analytics":
        return {
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0],
          transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          },
        };
      case "Trading":
        return {
          scale: [1, 1.05, 1.1, 1],
          y: [0, -2, 0],
          transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          },
        };
      case "Research":
        return {
          rotate: [0, 10, -10, 0],
          scale: [1, 1.05, 1],
          transition: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          },
        };
      default:
        return {
          scale: [1, 1.05, 1],
          transition: {
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          },
        };
    }
  };

  return (
    <motion.div
      className={className}
      animate={getAnimationPattern()}
      whileHover={{ scale: 1.2, transition: { duration: 0.2 } }}
    >
      {icon}
    </motion.div>
  );
};

export default AnimatedToolIcon;
