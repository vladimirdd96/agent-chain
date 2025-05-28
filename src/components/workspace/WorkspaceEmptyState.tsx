"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import {
  SparklesIcon,
  ChartBarIcon,
  CogIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

// TypeScript interfaces
interface Feature {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  text: string;
}

// Animated Agent Visual Component
const AnimatedAgentVisual = () => {
  return (
    <div className="relative w-48 h-48 mx-auto mb-8">
      {/* Outer glow ring */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 blur-2xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Main agent avatar placeholder */}
      <motion.div
        className="absolute inset-8 rounded-full bg-gradient-to-br from-purple-600/40 via-pink-500/40 to-blue-600/40 backdrop-blur-sm border border-white/10"
        animate={{
          scale: [1, 1.05, 1],
          rotate: [0, 360],
        }}
        transition={{
          scale: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          },
          rotate: {
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          },
        }}
      >
        {/* Inner core with NFT shimmer effect */}
        <div className="absolute inset-4 rounded-full bg-gradient-to-br from-white/20 to-transparent overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
            animate={{
              x: ["-100%", "200%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 3,
            }}
          />
          {/* AI Brain Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <SparklesIcon className="w-8 h-8 text-white/60" />
          </div>
        </div>
      </motion.div>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/40 rounded-full"
          style={{
            left: `${15 + i * 12}%`,
            top: `${20 + (i % 3) * 20}%`,
          }}
          animate={{
            y: [-10, 10, -10],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 3 + i * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );
};

const WorkspaceEmptyState = () => {
  const features: Feature[] = [
    {
      icon: ShieldCheckIcon,
      text: "True AI agent ownership (NFT)",
    },
    {
      icon: ChartBarIcon,
      text: "Live blockchain insights",
    },
    {
      icon: CogIcon,
      text: "Automated trading tools",
    },
    {
      icon: SparklesIcon,
      text: "Upgrades and personalization",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative max-w-2xl mx-auto"
    >
      {/* Main Card */}
      <motion.div
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-black/60 via-purple-900/20 to-black/60 backdrop-blur-md border border-white/10 p-8 md:p-12 text-center"
        whileHover={{
          scale: 1.02,
          transition: { duration: 0.2 },
        }}
      >
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-blue-500/5" />
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* Content */}
        <div className="relative z-10">
          {/* Animated Visual */}
          <AnimatedAgentVisual />

          {/* Welcome Header */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-white">
              Welcome to Your Agent Workspace
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-white/70 mb-8 max-w-md mx-auto leading-relaxed"
          >
            Manage your AI agents, track analytics, and unlock new capabilities.
          </motion.p>

          {/* Motivational Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8"
          >
            <h2 className="text-xl font-semibold text-white mb-4">
              No agents yet…
            </h2>
            <p className="text-white/80 mb-6 leading-relaxed">
              Mint your first AI Agent NFT and unlock live blockchain analytics,
              trading automation, and more.
            </p>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.text}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="flex items-center gap-3 p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors"
              >
                <feature.icon className="w-5 h-5 text-purple-400 flex-shrink-0" />
                <span className="text-sm text-white/80">{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="space-y-4"
          >
            <Link href="/deploy">
              <Button
                variant="primary"
                size="lg"
                className="w-full md:w-auto group relative overflow-hidden"
              >
                <SparklesIcon className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" />
                Create Your First Agent
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
              </Button>
            </Link>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="text-sm text-white/60"
            >
              Or{" "}
              <Link
                href="/agent-store"
                className="text-purple-400 hover:text-purple-300 transition-colors underline decoration-dotted underline-offset-4"
              >
                browse the Agent Store
              </Link>{" "}
              for inspiration
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default WorkspaceEmptyState;
