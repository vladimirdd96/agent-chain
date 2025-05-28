"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  CubeIcon,
  SparklesIcon,
  BoltIcon,
  CurrencyDollarIcon,
  GiftIcon,
} from "@heroicons/react/24/outline";

interface StatsData {
  totalAgents: number;
  mintedAgents: number;
  activeAgents: number;
  portfolioValue: number;
  rewardsEarned: number;
}

interface QuickStatsBarProps {
  stats: StatsData;
}

interface StatCardProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  delay?: number;
  className?: string;
}

function StatCard({
  icon: Icon,
  label,
  value,
  prefix = "",
  suffix = "",
  delay = 0,
  className = "",
}: StatCardProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const animationDuration = 1500;
      const frameDuration = 16; // ~60fps
      const totalFrames = animationDuration / frameDuration;
      const increment = value / totalFrames;
      let currentValue = 0;

      const counter = setInterval(() => {
        currentValue += increment;
        if (currentValue >= value) {
          setDisplayValue(value);
          clearInterval(counter);
        } else {
          setDisplayValue(Math.floor(currentValue));
        }
      }, frameDuration);

      return () => clearInterval(counter);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  const formatValue = (val: number): string => {
    if (prefix === "$" && val >= 1000) {
      return (val / 1000).toFixed(1) + "K";
    }
    return val.toLocaleString();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: delay * 0.1, ease: "easeOut" }}
      className={`relative overflow-hidden rounded-xl bg-gradient-to-br from-black/60 via-purple-900/20 to-black/60 backdrop-blur-md border border-white/10 p-6 hover:border-purple-500/30 transition-all duration-300 group ${className}`}
      whileHover={{ scale: 1.02, y: -2 }}
    >
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Animated border highlight */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div className="p-2 rounded-lg bg-purple-500/20 group-hover:bg-purple-500/30 transition-colors duration-300">
            <Icon className="w-5 h-5 text-purple-400" />
          </div>
          {/* Floating particles effect */}
          <motion.div
            className="w-1 h-1 bg-purple-400/60 rounded-full"
            animate={{
              y: [-5, 5, -5],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: delay * 0.2,
            }}
          />
        </div>

        <div className="space-y-1">
          <motion.div
            key={displayValue}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            className="text-2xl font-bold text-white"
          >
            {prefix}
            {formatValue(displayValue)}
            {suffix}
          </motion.div>
          <p className="text-sm text-white/70">{label}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function QuickStatsBar({ stats }: QuickStatsBarProps) {
  const statCards = [
    {
      icon: CubeIcon,
      label: "Total Agents",
      value: stats.totalAgents,
      delay: 0,
    },
    {
      icon: SparklesIcon,
      label: "Minted NFTs",
      value: stats.mintedAgents,
      delay: 1,
    },
    {
      icon: BoltIcon,
      label: "Active Agents",
      value: stats.activeAgents,
      delay: 2,
    },
    {
      icon: CurrencyDollarIcon,
      label: "Portfolio Value",
      value: stats.portfolioValue,
      prefix: "$",
      delay: 3,
    },
    {
      icon: GiftIcon,
      label: "Rewards Earned",
      value: stats.rewardsEarned,
      prefix: "$",
      delay: 4,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20">
          <SparklesIcon className="w-5 h-5 text-purple-400" />
        </div>
        <h2 className="text-xl font-semibold text-white">Dashboard Overview</h2>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {statCards.map((stat, index) => (
          <StatCard
            key={stat.label}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
            prefix={stat.prefix}
            delay={stat.delay}
          />
        ))}
      </div>
    </motion.div>
  );
}
