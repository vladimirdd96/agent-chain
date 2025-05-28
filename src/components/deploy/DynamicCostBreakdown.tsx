"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DynamicCostBreakdownProps {
  agentType: string;
  agentName: string;
  description: string;
}

interface CostItem {
  label: string;
  baseAmount: number;
  icon: string;
  description: string;
}

const baseCosts: { [key: string]: CostItem[] } = {
  solana: [
    {
      label: "Solana Deployment",
      baseAmount: 0.1,
      icon: "🟣",
      description: "Base deployment to Solana network",
    },
    {
      label: "Storage Fee",
      baseAmount: 0.05,
      icon: "💾",
      description: "On-chain metadata storage",
    },
    {
      label: "NFT Minting",
      baseAmount: 0.05,
      icon: "🎨",
      description: "Create unique NFT token",
    },
  ],
  evm: [
    {
      label: "EVM Deployment",
      baseAmount: 0.15,
      icon: "🔷",
      description: "Multi-chain EVM deployment",
    },
    {
      label: "Storage Fee",
      baseAmount: 0.08,
      icon: "💾",
      description: "Cross-chain metadata storage",
    },
    {
      label: "NFT Minting",
      baseAmount: 0.07,
      icon: "🎨",
      description: "Create unique NFT token",
    },
  ],
  trade: [
    {
      label: "Trading Bot Setup",
      baseAmount: 0.25,
      icon: "📈",
      description: "Advanced trading algorithms",
    },
    {
      label: "Storage Fee",
      baseAmount: 0.1,
      icon: "💾",
      description: "Strategy and data storage",
    },
    {
      label: "NFT Minting",
      baseAmount: 0.05,
      icon: "🎨",
      description: "Create unique NFT token",
    },
  ],
  generalist: [
    {
      label: "Universal Agent",
      baseAmount: 0.2,
      icon: "🌟",
      description: "Multi-protocol capabilities",
    },
    {
      label: "Storage Fee",
      baseAmount: 0.08,
      icon: "💾",
      description: "Universal metadata storage",
    },
    {
      label: "NFT Minting",
      baseAmount: 0.05,
      icon: "🎨",
      description: "Create unique NFT token",
    },
  ],
};

const DynamicCostBreakdown: React.FC<DynamicCostBreakdownProps> = ({
  agentType,
  agentName,
  description,
}) => {
  const [animatedTotal, setAnimatedTotal] = useState(0);
  const [isCalculating, setIsCalculating] = useState(false);

  const costs = baseCosts[agentType] || baseCosts.solana;

  // Calculate complexity bonus based on description length and name
  const complexityMultiplier =
    1 +
    (description.length > 100 ? 0.1 : 0) +
    (agentName.length > 15 ? 0.05 : 0);
  const total = costs.reduce(
    (sum, cost) => sum + cost.baseAmount * complexityMultiplier,
    0
  );

  useEffect(() => {
    setIsCalculating(true);
    setAnimatedTotal(0);

    const timer = setTimeout(() => {
      // Animate the count up effect
      const duration = 1500; // 1.5 seconds
      const steps = 60;
      const increment = total / steps;
      let current = 0;

      const counter = setInterval(() => {
        current += increment;
        if (current >= total) {
          setAnimatedTotal(total);
          setIsCalculating(false);
          clearInterval(counter);
        } else {
          setAnimatedTotal(current);
        }
      }, duration / steps);

      return () => clearInterval(counter);
    }, 300);

    return () => clearTimeout(timer);
  }, [total, agentType, agentName, description]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-black/50 backdrop-blur-md border border-white/10 rounded-xl p-6 relative overflow-hidden"
    >
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12"
        animate={{
          x: ["-100%", "200%"],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 3,
          ease: "linear",
        }}
      />

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            💰
          </motion.div>
          <h3 className="text-xl font-semibold text-white">Deployment Cost</h3>
          {isCalculating && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full"
            />
          )}
        </div>

        <div className="space-y-3 mb-6">
          <AnimatePresence mode="wait">
            {costs.map((cost, index) => {
              const adjustedAmount = cost.baseAmount * complexityMultiplier;
              return (
                <motion.div
                  key={`${agentType}-${cost.label}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{cost.icon}</span>
                    <div>
                      <div className="text-white font-medium">{cost.label}</div>
                      <div className="text-xs text-white/60">
                        {cost.description}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <motion.div
                      key={`${agentType}-${cost.label}-amount`}
                      initial={{ scale: 1.2, color: "#10b981" }}
                      animate={{ scale: 1, color: "#ffffff" }}
                      transition={{ duration: 0.3 }}
                      className="text-white font-semibold"
                    >
                      {adjustedAmount.toFixed(3)} SOL
                    </motion.div>
                    {complexityMultiplier > 1 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-xs text-purple-400"
                      >
                        +{((complexityMultiplier - 1) * 100).toFixed(0)}%
                        complexity
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Total Section */}
        <motion.div
          className="pt-4 border-t border-white/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">✨</span>
              <span className="text-lg font-semibold text-white">
                Total Cost
              </span>
            </div>
            <div className="text-right">
              <motion.div
                className={`text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent ${
                  isCalculating ? "animate-pulse" : ""
                }`}
                key={animatedTotal}
              >
                {animatedTotal.toFixed(3)} SOL
              </motion.div>
              <motion.div
                className="text-sm text-white/60"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                ≈ ${(animatedTotal * 180).toFixed(2)} USD
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Value proposition */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-4 p-3 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg border border-purple-500/20"
        >
          <div className="flex items-center gap-2 text-sm">
            <span>🚀</span>
            <span className="text-purple-300">
              Your agent will be permanently stored on the blockchain and earn
              royalties from future interactions!
            </span>
          </div>
        </motion.div>

        {/* Floating coins animation */}
        {!isCalculating && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-yellow-400 text-sm pointer-events-none"
                style={{
                  right: `${20 + i * 10}%`,
                  top: `${30 + i * 15}%`,
                }}
                initial={{ opacity: 0, scale: 0, y: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  y: [-20, -40, -60],
                }}
                transition={{
                  duration: 2,
                  delay: 1.5 + i * 0.3,
                  ease: "easeOut",
                }}
              >
                💰
              </motion.div>
            ))}
          </>
        )}
      </div>
    </motion.div>
  );
};

export default DynamicCostBreakdown;
