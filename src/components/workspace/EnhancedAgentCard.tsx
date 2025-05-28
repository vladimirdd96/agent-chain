"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { AgentType } from "@/lib/mindmint-sdk/types";
import { Button } from "@/components/ui/Button";
import {
  CogIcon,
  ChartBarIcon,
  ArrowTopRightOnSquareIcon,
  SparklesIcon,
  ShieldCheckIcon,
  BoltIcon,
} from "@heroicons/react/24/outline";

interface EnhancedAgentCardProps {
  agent: AgentType;
}

export function EnhancedAgentCard({ agent }: EnhancedAgentCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-400 bg-green-400/20 border-green-400/30";
      case "pending":
        return "text-yellow-400 bg-yellow-400/20 border-yellow-400/30";
      case "failed":
        return "text-red-400 bg-red-400/20 border-red-400/30";
      default:
        return "text-white/70 bg-white/10 border-white/20";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "trade":
        return ChartBarIcon;
      case "solana":
      case "evm":
      case "blockchain":
        return BoltIcon;
      default:
        return SparklesIcon;
    }
  };

  const TypeIcon = getTypeIcon(agent.type);

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-black/60 via-purple-900/20 to-black/60 backdrop-blur-md border border-white/10 p-6 cursor-pointer transition-all duration-300 hover:border-purple-500/50"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Floating particles */}
      <motion.div
        className="absolute top-4 right-4 w-1 h-1 bg-purple-400/60 rounded-full"
        animate={{
          y: [-3, 3, -3],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {/* Agent Avatar */}
            <div className="relative">
              <motion.div
                className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600/40 via-pink-500/40 to-blue-600/40 backdrop-blur-sm border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                whileHover={{ rotate: 5 }}
              >
                <TypeIcon className="w-6 h-6 text-white/80" />
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 rounded-lg"
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
              </motion.div>
              {agent.nft_mint_address && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-black flex items-center justify-center">
                  <ShieldCheckIcon className="w-2.5 h-2.5 text-black" />
                </div>
              )}
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-purple-200 transition-colors">
                {agent.name}
              </h3>
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(
                    agent.status
                  )}`}
                >
                  {agent.status}
                </span>
                <span className="px-2 py-1 text-xs font-medium text-white bg-purple-500/20 rounded-full border border-purple-500/30">
                  {agent.type}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-white/70 text-sm mb-4 line-clamp-2 leading-relaxed">
          {agent.description || "AI agent ready for deployment"}
        </p>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white/5 rounded-lg p-3 backdrop-blur-sm">
            <p className="text-white/50 text-xs mb-1">Created</p>
            <p className="text-white text-sm font-medium">
              {new Date(agent.created_at).toLocaleDateString()}
            </p>
          </div>
          <div className="bg-white/5 rounded-lg p-3 backdrop-blur-sm">
            <p className="text-white/50 text-xs mb-1">Network</p>
            <p className="text-white text-sm font-medium capitalize">
              {agent.type === "evm"
                ? "Ethereum"
                : agent.type === "solana"
                ? "Solana"
                : "Multi-chain"}
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <Link href={`/agent/${agent.id}`} className="block">
            <Button
              variant="secondary"
              size="sm"
              className="w-full group/btn relative overflow-hidden"
            >
              <CogIcon className="w-4 h-4 mr-2 transition-transform group-hover/btn:rotate-90" />
              Manage Agent
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover/btn:translate-x-[200%] transition-transform duration-700"></div>
            </Button>
          </Link>

          <div className="grid grid-cols-2 gap-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-1 px-3 py-2 text-xs font-medium text-white/80 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 hover:border-purple-500/30 transition-all duration-200"
            >
              <SparklesIcon className="w-3 h-3" />
              Upgrade
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-1 px-3 py-2 text-xs font-medium text-white/80 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 hover:border-blue-500/30 transition-all duration-200"
            >
              <ChartBarIcon className="w-3 h-3" />
              Analytics
            </motion.button>
          </div>
        </div>

        {/* NFT Badge */}
        {agent.nft_mint_address && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/20"
          >
            <div className="flex items-center gap-2">
              <ShieldCheckIcon className="w-4 h-4 text-green-400" />
              <span className="text-xs text-green-400 font-medium">
                Minted as NFT
              </span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="ml-auto text-green-400 hover:text-green-300"
              >
                <ArrowTopRightOnSquareIcon className="w-3 h-3" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
