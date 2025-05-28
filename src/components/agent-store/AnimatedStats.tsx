"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface AnimatedStatsProps {
  totalAgents: number;
  mintedAgents: number;
  totalCategories: number;
}

const AnimatedStats: React.FC<AnimatedStatsProps> = ({
  totalAgents,
  mintedAgents,
  totalCategories,
}) => {
  const [counts, setCounts] = useState({ total: 0, minted: 0, categories: 0 });

  useEffect(() => {
    // Animate counting up
    const animateCount = (target: number, setter: (value: number) => void) => {
      let current = 0;
      const increment = target / 60; // 60 frames for ~1 second
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setter(target);
          clearInterval(timer);
        } else {
          setter(Math.floor(current));
        }
      }, 16); // ~60fps
    };

    const timer = setTimeout(() => {
      animateCount(totalAgents, (value) =>
        setCounts((prev) => ({ ...prev, total: value }))
      );
      setTimeout(() => {
        animateCount(mintedAgents, (value) =>
          setCounts((prev) => ({ ...prev, minted: value }))
        );
      }, 200);
      setTimeout(() => {
        animateCount(totalCategories, (value) =>
          setCounts((prev) => ({ ...prev, categories: value }))
        );
      }, 400);
    }, 600);

    return () => clearTimeout(timer);
  }, [totalAgents, mintedAgents, totalCategories]);

  const stats = [
    {
      label: "Total Agents",
      value: counts.total,
      icon: "🤖",
      gradient: "from-purple-400 to-violet-500",
      glowColor: "purple-400/20",
    },
    {
      label: "Minted",
      value: counts.minted,
      icon: "💎",
      gradient: "from-blue-400 to-cyan-500",
      glowColor: "blue-400/20",
    },
    {
      label: "Categories",
      value: counts.categories,
      icon: "📊",
      gradient: "from-green-400 to-emerald-500",
      glowColor: "green-400/20",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="flex justify-center gap-8 mb-12"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            delay: 0.4 + index * 0.1,
            ease: "easeOut",
          }}
          className="text-center group"
        >
          {/* Glow effect container */}
          <motion.div
            className="relative"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            {/* Background glow */}
            <motion.div
              className={`absolute inset-0 bg-${stat.glowColor} rounded-2xl blur-xl opacity-0 group-hover:opacity-100`}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Card */}
            <div className="relative bg-black/30 backdrop-blur-sm border border-white/10 rounded-2xl p-6 min-w-[140px]">
              {/* Icon */}
              <motion.div
                className="text-3xl mb-2"
                animate={{
                  rotateY: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.5,
                }}
              >
                {stat.icon}
              </motion.div>

              {/* Value */}
              <motion.div
                className={`text-3xl font-bold mb-1 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}
                key={stat.value} // Key change triggers animation
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {stat.value.toLocaleString()}
              </motion.div>

              {/* Label */}
              <div className="text-sm text-white/60 font-medium">
                {stat.label}
              </div>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default AnimatedStats;
