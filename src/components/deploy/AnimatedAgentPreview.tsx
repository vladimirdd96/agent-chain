"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AnimatedAgentPreviewProps {
  agentType: string;
  agentName: string;
}

const agentTypeConfig = {
  solana: {
    icon: "🟣",
    color: "from-purple-500 to-purple-600",
    glowColor: "purple-500",
    bgColor: "purple-500/20",
    textColor: "purple-300",
    chains: [{ name: "Solana", color: "bg-purple-500" }],
  },
  evm: {
    icon: "🔷",
    color: "from-blue-500 to-blue-600",
    glowColor: "blue-500",
    bgColor: "blue-500/20",
    textColor: "blue-300",
    chains: [
      { name: "Ethereum", color: "bg-blue-500" },
      { name: "Polygon", color: "bg-indigo-500" },
    ],
  },
  trade: {
    icon: "📈",
    color: "from-green-500 to-emerald-600",
    glowColor: "green-500",
    bgColor: "green-500/20",
    textColor: "green-300",
    chains: [
      { name: "Multi-chain", color: "bg-green-500" },
      { name: "DeFi", color: "bg-emerald-500" },
    ],
  },
  generalist: {
    icon: "🌟",
    color: "from-yellow-500 to-orange-600",
    glowColor: "yellow-500",
    bgColor: "yellow-500/20",
    textColor: "yellow-300",
    chains: [
      { name: "Universal", color: "bg-yellow-500" },
      { name: "AI", color: "bg-orange-500" },
    ],
  },
};

const AnimatedAgentPreview: React.FC<AnimatedAgentPreviewProps> = ({
  agentType,
  agentName,
}) => {
  const config =
    agentTypeConfig[agentType as keyof typeof agentTypeConfig] ||
    agentTypeConfig.solana;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative max-w-sm mx-auto"
    >
      {/* Outer glow effect */}
      <motion.div
        className={`absolute -inset-4 bg-gradient-to-r ${config.color} rounded-3xl blur-2xl opacity-40`}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Card */}
      <motion.div
        className="relative bg-black/90 backdrop-blur-xl border border-white/20 rounded-2xl p-6 transform-gpu"
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
      >
        {/* Status Badge */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="absolute -top-3 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex items-center gap-2 px-4 py-1 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full text-sm font-medium text-white shadow-lg">
            <motion.div
              className="w-2 h-2 bg-white rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            Ready to Deploy
          </div>
        </motion.div>

        {/* Agent Avatar */}
        <div className="flex justify-center mb-4 mt-2">
          <div className="relative">
            {/* Avatar glow */}
            <motion.div
              className={`absolute inset-0 bg-gradient-to-r ${config.color} rounded-full blur-md opacity-60`}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.6, 0.8, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            {/* Avatar */}
            <motion.div
              className={`relative w-20 h-20 bg-gradient-to-br ${config.color} rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-2xl`}
              animate={{
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={agentType}
                  initial={{ scale: 0, rotate: 180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: -180 }}
                  transition={{ duration: 0.3 }}
                >
                  {config.icon}
                </motion.span>
              </AnimatePresence>
            </motion.div>
            {/* AI indicator */}
            <motion.div
              className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-3 h-3 bg-white rounded-full" />
            </motion.div>
          </div>
        </div>

        {/* Agent Info */}
        <div className="text-center mb-4">
          <motion.h3
            className="text-xl font-bold text-white mb-2"
            key={agentName}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {agentName || "Unnamed Agent"}
          </motion.h3>
          <p className="text-sm text-white/70 mb-3">
            Advanced blockchain intelligence and automated capabilities
          </p>

          {/* Chain indicators */}
          <motion.div
            className="flex items-center justify-center gap-2 mb-3"
            key={agentType}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {config.chains.map((chain, index) => (
              <motion.div
                key={chain.name}
                className={`flex items-center gap-1 px-3 py-1 bg-${chain.color}/20 rounded-lg backdrop-blur-sm`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <div className={`w-3 h-3 ${chain.color} rounded-full`} />
                <span className={`text-xs text-${config.textColor}`}>
                  {chain.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Capabilities */}
        <div className="space-y-2 mb-4">
          <div className="text-xs text-white/60 text-center mb-2">
            Capabilities to Unlock
          </div>
          {[
            { icon: "🔗", name: "Blockchain Integration", delay: 0.1 },
            { icon: "🤖", name: "AI-Powered Analysis", delay: 0.2 },
            { icon: "⚡", name: "Real-time Execution", delay: 0.3 },
          ].map((capability) => (
            <motion.div
              key={capability.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: capability.delay }}
              className="flex items-center gap-2 p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
            >
              <span className="text-sm">{capability.icon}</span>
              <span className="text-sm text-white/80 flex-1">
                {capability.name}
              </span>
              <motion.div
                className="w-2 h-2 bg-emerald-400 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: capability.delay,
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Preview NFT ID */}
        <motion.div
          className="text-center pt-3 border-t border-white/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-xs text-white/50">Future NFT ID</div>
          <div className="text-sm font-mono text-purple-300">#TBD</div>
        </motion.div>
      </motion.div>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-1 h-1 bg-${config.glowColor} rounded-full opacity-60`}
          style={{
            left: `${20 + i * 15}%`,
            top: `${10 + (i % 3) * 30}%`,
          }}
          animate={{
            y: [-10, -20, -10],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 2 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}
    </motion.div>
  );
};

export default AnimatedAgentPreview;
