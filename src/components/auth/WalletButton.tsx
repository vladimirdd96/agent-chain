"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  WalletIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useWallet } from "./hooks/useWallet";

const WalletButton = () => {
  const { connected, connecting, connect, disconnect } = useWallet();
  const [error, setError] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = async () => {
    try {
      setError(null);
      if (connected) {
        await disconnect();
      } else {
        await connect();
      }
    } catch (error) {
      console.error("Wallet connection error:", error);
      setError(
        error instanceof Error ? error.message : "Failed to connect wallet"
      );

      setTimeout(() => setError(null), 5000);
    }
  };

  // Truncate wallet address for display
  const truncateAddress = (address: string) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="relative">
      <motion.button
        onClick={handleClick}
        disabled={connecting}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`
          group relative overflow-hidden px-6 py-3 text-sm font-medium rounded-xl transition-all duration-300 flex items-center space-x-2 min-w-[140px] justify-center
          ${
            connected
              ? "text-white bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/40 hover:border-green-400/60"
              : "text-white bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/40 hover:border-purple-400/60"
          }
          ${connecting ? "opacity-70 cursor-not-allowed" : ""}
        `}
        whileHover={!connecting ? { scale: 1.05 } : {}}
        whileTap={!connecting ? { scale: 0.95 } : {}}
      >
        {/* Animated background gradient */}
        <motion.div
          className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${
            connected
              ? "bg-gradient-to-r from-green-500 to-emerald-500"
              : "bg-gradient-to-r from-purple-500 to-blue-500"
          }`}
        />

        {/* Shimmer effect */}
        <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000" />

        {/* Content */}
        <div className="relative flex items-center space-x-2 z-10">
          <AnimatePresence mode="wait">
            {connecting ? (
              <motion.div
                key="connecting"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center space-x-2"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <WalletIcon className="w-4 h-4" />
                </motion.div>
                <span>Connecting...</span>
              </motion.div>
            ) : connected ? (
              <motion.div
                key="connected"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center space-x-2"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <CheckCircleIcon className="w-4 h-4 text-green-400" />
                </motion.div>
                <span className="hidden sm:inline">Connected</span>
                <ArrowRightOnRectangleIcon className="w-4 h-4 opacity-60" />
              </motion.div>
            ) : (
              <motion.div
                key="disconnected"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center space-x-2"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <WalletIcon className="w-4 h-4" />
                </motion.div>
                <span>Connect</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Connection status indicator */}
        {connected && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-black"
          >
            <motion.div
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-full h-full bg-green-400 rounded-full opacity-60"
            />
          </motion.div>
        )}
      </motion.button>

      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 right-0 mt-2 p-3 bg-red-500/10 backdrop-blur-sm border border-red-500/30 rounded-xl text-red-400 text-sm shadow-lg"
          >
            <div className="flex items-center space-x-2">
              <ExclamationTriangleIcon className="w-4 h-4 flex-shrink-0" />
              <span className="text-xs">{error}</span>
            </div>

            {/* Animated border */}
            <motion.div
              className="absolute inset-0 rounded-xl border border-red-400/20"
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Wallet info tooltip for connected state - only show on hover */}
      <AnimatePresence>
        {connected && showTooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-black/90 backdrop-blur-sm border border-green-500/30 rounded-lg text-xs text-green-300 whitespace-nowrap shadow-lg"
          >
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Wallet Active</span>
            </div>

            {/* Tooltip arrow */}
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black/90 border-l border-t border-green-500/30 rotate-45"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WalletButton;
