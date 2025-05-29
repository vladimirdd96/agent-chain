"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { AgentType } from "@/lib/mindmint-sdk/types";
import { Button } from "@/components/ui/Button";
import { AgentChatModal } from "./AgentChatModal";
import { DeployConfirmModal } from "./DeployConfirmModal";
import { useToasts } from "@/components/providers/ToastProvider";
import {
  CogIcon,
  ChartBarIcon,
  ArrowTopRightOnSquareIcon,
  SparklesIcon,
  ShieldCheckIcon,
  BoltIcon,
  ChatBubbleLeftIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";

interface EnhancedAgentCardProps {
  agent: AgentType;
}

export function EnhancedAgentCard({ agent }: EnhancedAgentCardProps) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [showDeployModal, setShowDeployModal] = useState(false);
  const toast = useToasts();

  // Check if this is a prebuilt agent or personal agent
  const isPrebuiltAgent = (agent as any).isPrebuilt === true;
  const isDeployedPersonal = (agent as any).isDeployedPersonal === true;
  const isPremiumMinted = Boolean(agent.nft_mint_address);
  const isPersonalAgent =
    !isPrebuiltAgent && !isDeployedPersonal && Boolean(agent.creator_wallet);

  // In the workspace, ALL agents are owned by the user (filtered at API level)
  // Personal agents are always premium (owned by creator)
  // Prebuilt agents in workspace are premium (user has minted them)
  // Deployed personal agents are premium (user owns them in store)
  const isPremium = true; // All workspace agents are owned by the user

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

  // Helper function to get proper creation date
  const getCreationDate = () => {
    // For prebuilt agents, try mintDate first, then created_at
    if (isPrebuiltAgent && (agent as any).originalAgent?.mintDate) {
      return new Date((agent as any).originalAgent.mintDate);
    }

    // Try created_at if it's valid
    if (agent.created_at && new Date(agent.created_at).getFullYear() > 1990) {
      return new Date(agent.created_at);
    }

    // For deployed personal agents, use today's date as fallback
    if (isDeployedPersonal) {
      return new Date();
    }

    // Default fallback
    return new Date();
  };

  const deployToStore = async () => {
    if (!agent.creator_wallet || isDeploying) return;

    setIsDeploying(true);
    try {
      const response = await fetch("/api/agent/deploy-to-store", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          agentId: agent.id,
          walletAddress: agent.creator_wallet,
          price: 0.1, // Default price in ETH
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setShowDeployModal(false);
        toast.success(
          "🎉 Agent Deployed Successfully!",
          `${agent.name} is now available in the public store for others to mint and use.`,
          {
            duration: 7000,
            actions: [
              {
                label: "View in Store",
                onClick: () => window.open("/agent-store", "_blank"),
                variant: "primary",
              },
            ],
          }
        );

        // Refresh the page to update the agent status
        setTimeout(() => window.location.reload(), 1000);
      } else {
        toast.error(
          "Failed to Deploy Agent",
          result.details || result.error || "Please try again later.",
          { duration: 6000 }
        );
      }
    } catch (error) {
      console.error("Deploy to store error:", error);
      toast.error(
        "Network Error",
        "Failed to connect to the server. Please check your internet connection and try again.",
        { duration: 6000 }
      );
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <>
      <motion.div
        whileHover={{ y: -4, scale: 1.02 }}
        className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-black/60 via-purple-900/20 to-black/60 backdrop-blur-md border border-white/10 p-6 cursor-pointer transition-all duration-300 hover:border-purple-500/50 h-full flex flex-col"
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

        <div className="relative z-10 flex flex-col h-full">
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
                {isPremium && (
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
                    {isPrebuiltAgent
                      ? "Prebuilt"
                      : isDeployedPersonal
                      ? "Deployed"
                      : "Personal"}
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
                {getCreationDate().toLocaleDateString()}
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

          {/* Spacer to push buttons to bottom */}
          <div className="flex-1"></div>

          {/* Quick Actions */}
          <div className="space-y-3 mb-4">
            {/* Primary Chat Action */}
            <Button
              variant="primary"
              size="sm"
              className="w-full group/btn relative overflow-hidden"
              onClick={() => setIsChatOpen(true)}
            >
              <ChatBubbleLeftIcon className="w-4 h-4 mr-2" />
              Chat with Agent
              {isPremium && (
                <ShieldCheckIcon className="w-3 h-3 ml-1 text-green-400" />
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover/btn:translate-x-[200%] transition-transform duration-700"></div>
            </Button>

            {/* Deploy to Store Button for Personal Agents */}
            {isPersonalAgent && !agent.is_public && (
              <Button
                variant="secondary"
                size="sm"
                className="w-full group/btn relative overflow-hidden"
                onClick={() => setShowDeployModal(true)}
                disabled={isDeploying}
              >
                {isDeploying ? (
                  <>
                    <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Deploying...
                  </>
                ) : (
                  <>
                    <GlobeAltIcon className="w-4 h-4 mr-2" />
                    Deploy to Store
                  </>
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover/btn:translate-x-[200%] transition-transform duration-700"></div>
              </Button>
            )}
          </div>

          {/* Fixed Height Badge Area - Always reserve space for badges */}
          <div className="space-y-2 min-h-[60px]">
            {/* NFT Badge */}
            {isPremium && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/20"
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

            {/* Store Deployment Badge */}
            {((isPersonalAgent && agent.is_public) || isDeployedPersonal) && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg border border-blue-500/20"
              >
                <div className="flex items-center gap-2">
                  <GlobeAltIcon className="w-4 h-4 text-blue-400" />
                  <span className="text-xs text-blue-400 font-medium">
                    Available in Store
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="ml-auto text-blue-400 hover:text-blue-300"
                    onClick={() => window.open("/agent-store", "_blank")}
                  >
                    <ArrowTopRightOnSquareIcon className="w-3 h-3" />
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Chat Modal */}
      <AgentChatModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        agent={agent}
        isPremium={isPremium}
      />

      {/* Deploy Confirmation Modal */}
      <DeployConfirmModal
        isOpen={showDeployModal}
        onClose={() => setShowDeployModal(false)}
        onConfirm={deployToStore}
        agent={agent}
        isLoading={isDeploying}
      />
    </>
  );
}
