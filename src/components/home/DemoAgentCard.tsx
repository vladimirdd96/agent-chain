"use client";

import React from "react";
import { motion } from "framer-motion";

const DemoAgentCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotateY: -10 }}
      animate={{ opacity: 1, y: 0, rotateY: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="relative max-w-sm mx-auto"
    >
      {/* Glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-2xl blur opacity-60 animate-pulse"></div>

      {/* Card */}
      <div className="relative bg-black/80 backdrop-blur-xl border border-white/20 rounded-2xl p-6 transform-gpu">
        {/* Status Badge */}
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <div className="flex items-center gap-2 px-4 py-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full text-sm font-medium text-white shadow-lg">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            Minted: Active
          </div>
        </div>

        {/* Agent Avatar */}
        <div className="flex justify-center mb-4 mt-2">
          <div className="relative">
            {/* Avatar glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-md opacity-50"></div>
            {/* Avatar */}
            <div className="relative w-20 h-20 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 rounded-full flex items-center justify-center text-2xl font-bold text-white">
              🤖
            </div>
            {/* AI indicator */}
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Agent Info */}
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold text-white mb-2">
            CryptoAnalyst Pro
          </h3>
          <p className="text-sm text-white/70 mb-3">
            Advanced blockchain analytics and trading intelligence
          </p>

          {/* Chain indicator */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="flex items-center gap-1 px-2 py-1 bg-purple-500/20 rounded-lg">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-xs text-purple-300">Solana</span>
            </div>
            <div className="flex items-center gap-1 px-2 py-1 bg-blue-500/20 rounded-lg">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-xs text-blue-300">Ethereum</span>
            </div>
          </div>
        </div>

        {/* Capabilities */}
        <div className="space-y-2 mb-4">
          <div className="text-xs text-white/60 text-center mb-2">
            Capabilities Unlocked
          </div>
          {[
            { icon: "📊", name: "Live Market Data", active: true },
            { icon: "🔍", name: "On-chain Analysis", active: true },
            { icon: "⚡", name: "Real-time Alerts", active: true },
          ].map((capability, index) => (
            <motion.div
              key={capability.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="flex items-center gap-2 p-2 bg-white/5 rounded-lg"
            >
              <span className="text-sm">{capability.icon}</span>
              <span className="text-sm text-white/80 flex-1">
                {capability.name}
              </span>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </motion.div>
          ))}
        </div>

        {/* NFT ID */}
        <div className="text-center pt-3 border-t border-white/10">
          <div className="text-xs text-white/50">NFT ID</div>
          <div className="text-sm font-mono text-purple-300">#4729</div>
        </div>
      </div>
    </motion.div>
  );
};

export default DemoAgentCard;
