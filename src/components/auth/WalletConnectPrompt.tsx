"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  WalletIcon,
  SparklesIcon,
  ShieldCheckIcon,
  CpuChipIcon,
} from "@heroicons/react/24/outline";
import WalletButton from "./WalletButton";

// Animated 3D-style wallet icon component
const AnimatedWalletIcon = () => {
  return (
    <div className="relative">
      {/* Main wallet orb */}
      <motion.div
        className="w-24 h-24 mx-auto relative"
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Outer glow ring */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400/30 to-blue-400/30 blur-lg"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Middle ring */}
        <motion.div
          className="absolute inset-2 rounded-full bg-gradient-to-r from-purple-500/40 to-blue-500/40 blur-md"
          animate={{
            scale: [1.1, 1, 1.1],
            rotate: [0, 360],
          }}
          transition={{
            scale: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 8, repeat: Infinity, ease: "linear" },
          }}
        />

        {/* Inner orb with wallet icon */}
        <motion.div
          className="absolute inset-4 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 shadow-2xl flex items-center justify-center border border-white/20"
          animate={{
            rotate: [0, -360],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <WalletIcon className="w-8 h-8 text-white" />
          </motion.div>
        </motion.div>

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/60 rounded-full"
            style={{
              left: "50%",
              top: "50%",
            }}
            animate={{
              x: [0, Math.cos((i * 60 * Math.PI) / 180) * 40],
              y: [0, Math.sin((i * 60 * Math.PI) / 180) * 40],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

interface WalletConnectPromptProps {
  title?: string;
  subtitle?: string;
  showFeatures?: boolean;
  className?: string;
}

const WalletConnectPrompt: React.FC<WalletConnectPromptProps> = ({
  title = "Connect Your Wallet to Begin",
  subtitle = "Unlock your personal agent workspace, manage your AI agents, and access all platform features by connecting your wallet.",
  showFeatures = true,
  className = "",
}) => {
  const features = [
    {
      icon: ShieldCheckIcon,
      text: "Non-custodial, secure & private",
    },
    {
      icon: CpuChipIcon,
      text: "Solana & EVM support",
    },
    {
      icon: SparklesIcon,
      text: "No email or password required",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`relative ${className}`}
    >
      {/* Main card with glassmorphism */}
      <div className="relative bg-black/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 text-center overflow-hidden shadow-2xl">
        {/* Animated background gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10" />

        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12"
          animate={{ x: ["-100%", "200%"] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 2,
            ease: "easeInOut",
          }}
        />

        {/* Floating decoration elements */}
        <div className="absolute top-6 left-6 w-2 h-2 bg-purple-400/40 rounded-full animate-pulse" />
        <div className="absolute top-12 right-8 w-1 h-1 bg-blue-400/40 rounded-full animate-pulse delay-1000" />
        <div className="absolute bottom-8 left-12 w-1.5 h-1.5 bg-purple-400/30 rounded-full animate-pulse delay-500" />

        <div className="relative z-10 space-y-8">
          {/* Animated wallet icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <AnimatedWalletIcon />
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-4"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              <span className="bg-gradient-to-r from-white via-purple-100 to-blue-100 bg-clip-text text-transparent">
                {title}
              </span>
            </h2>

            <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          </motion.div>

          {/* Connect button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              {/* Button glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300" />
              <div className="relative">
                <WalletButton />
              </div>
            </motion.div>
          </motion.div>

          {/* Feature highlights */}
          {showFeatures && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="pt-6"
            >
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                    className="flex items-center gap-2 text-white/60 text-sm group hover:text-white/80 transition-colors duration-300"
                  >
                    <div className="p-1.5 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 group-hover:from-purple-500/30 group-hover:to-blue-500/30 transition-all duration-300">
                      <feature.icon className="w-4 h-4" />
                    </div>
                    <span className="font-medium">{feature.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Corner decorative elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full -translate-x-16 -translate-y-16" />
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-blue-500/10 to-transparent rounded-full translate-x-20 translate-y-20" />
      </div>
    </motion.div>
  );
};

export default WalletConnectPrompt;
