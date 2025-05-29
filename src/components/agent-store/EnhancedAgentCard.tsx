"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PrebuiltAgent } from "@/types/agent";
import AnimatedAgentIcon from "./AnimatedAgentIcon";
import ChatModal from "./ChatModal";
import {
  SparklesIcon,
  CurrencyDollarIcon,
  ShieldCheckIcon,
  StarIcon,
  ArrowRightIcon,
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  PlayIcon,
} from "@heroicons/react/24/outline";
import { useWallet } from "@/components/auth/hooks/useWallet";

interface EnhancedAgentCardProps {
  agent: PrebuiltAgent;
  index?: number;
}

const EnhancedAgentCard: React.FC<EnhancedAgentCardProps> = ({
  agent,
  index = 0,
}) => {
  const { connected, publicKey } = useWallet();
  const [isHovered, setIsHovered] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const {
    id,
    name,
    description,
    visualRepresentation,
    category,
    chainCompatibility,
    isMinted,
    price,
    capabilities,
    isOwned,
  } = agent;

  const unlockedCapabilities = (capabilities || []).filter(
    (cap) => !cap.requiresMinting
  );
  const premiumCapabilities = (capabilities || []).filter(
    (cap) => cap.requiresMinting
  );

  // Determine badge based on agent status
  const getBadge = () => {
    // If user owns the agent OR if agent is minted by current user, show "Owned" badge
    if ((connected && isOwned) || isMinted)
      return {
        text: "Owned",
        color: "from-green-400 to-emerald-500",
        icon: CheckCircleIcon,
      };

    // If agent is minted by someone else (not current user), show "Minted" badge
    if (agent.isMintedByOthers)
      return {
        text: "Minted",
        color: "from-blue-400 to-indigo-500",
        icon: ShieldCheckIcon,
      };

    // If has premium capabilities, show "Premium" badge
    if (premiumCapabilities.length > unlockedCapabilities.length)
      return {
        text: "Premium",
        color: "from-purple-400 to-violet-500",
        icon: SparklesIcon,
      };

    // If featured (top 3), show "Featured" badge
    if (index < 3)
      return {
        text: "Featured",
        color: "from-yellow-400 to-orange-500",
        icon: StarIcon,
      };

    return null;
  };

  const badge = getBadge();

  const handleActionButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if ((connected && isOwned) || isMinted) {
      // If user owns the agent or agent is minted, open chat directly with full functionality
      setIsChatOpen(true);
    } else {
      // If user doesn't own the agent, open free version
      setIsChatOpen(true);
    }
  };

  const getActionButtonConfig = () => {
    if ((connected && isOwned) || isMinted) {
      return {
        text: "Use Agent",
        icon: PlayIcon,
        className:
          "w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 border border-blue-500/30 hover:border-blue-400/50 rounded-xl text-blue-300 hover:text-blue-200 text-sm font-medium transition-all duration-300",
      };
    } else {
      return {
        text: "Try Free Version",
        icon: ChatBubbleLeftRightIcon,
        className:
          "w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 hover:from-green-500/30 hover:to-emerald-500/30 border border-green-500/30 hover:border-green-400/50 rounded-xl text-green-300 hover:text-green-200 text-sm font-medium transition-all duration-300",
      };
    }
  };

  const actionButton = getActionButtonConfig();

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: index * 0.1,
          ease: "easeOut",
        }}
        whileHover={{
          y: -8,
          transition: { duration: 0.3, ease: "easeOut" },
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="group relative h-full"
      >
        {/* Outer glow effect */}
        <motion.div
          className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-pink-500/20 rounded-3xl blur opacity-0 group-hover:opacity-100"
          animate={
            isHovered
              ? {
                  scale: [1, 1.02, 1],
                  opacity: [0, 0.6, 0.4],
                }
              : {}
          }
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />

        {/* Main card */}
        <div className="relative overflow-hidden rounded-2xl bg-black/50 backdrop-blur-xl border border-white/10 group-hover:border-white/20 transition-all duration-300 h-full flex flex-col">
          <Link href={`/agent-store/${id}`} className="flex flex-col flex-1">
            {/* Header with gradient background */}
            <div className="relative p-6 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-pink-500/10">
              {/* Background pattern */}
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>

              <div className="relative flex items-center justify-between mb-4">
                <AnimatedAgentIcon
                  icon={visualRepresentation}
                  size="lg"
                  isHovered={isHovered}
                />

                {/* Category badge */}
                <motion.span
                  className="px-3 py-1.5 text-xs font-medium rounded-full bg-white/10 text-white/70 border border-white/20 backdrop-blur-sm"
                  whileHover={{ scale: 1.05 }}
                >
                  {category}
                </motion.span>
              </div>

              {/* Price and status badges */}
              <div className="relative flex items-center justify-between">
                <motion.div
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl border border-white/20 backdrop-blur-sm"
                  whileHover={{ scale: 1.05 }}
                >
                  <CurrencyDollarIcon className="w-4 h-4 text-purple-300" />
                  <span className="text-lg font-bold text-white">
                    {price} ETH
                  </span>
                </motion.div>

                {badge && (
                  <motion.div
                    className={`flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r ${badge.color} rounded-xl text-xs font-medium text-white shadow-lg`}
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <badge.icon className="w-3 h-3" />
                    {badge.text}
                  </motion.div>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4 flex-1 flex flex-col">
              {/* Title */}
              <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:to-blue-300 transition-all duration-300">
                {name}
              </h3>

              {/* Description */}
              <p className="text-sm text-white/70 line-clamp-2 group-hover:text-white/80 transition-colors">
                {description}
              </p>

              {/* Chain compatibility */}
              <div className="space-y-2">
                <p className="text-xs font-medium text-white/50 uppercase tracking-wider">
                  Supported Chains
                </p>
                <div className="flex flex-wrap gap-2">
                  {chainCompatibility.slice(0, 3).map((chain, idx) => (
                    <motion.span
                      key={chain}
                      className="px-2.5 py-1 text-xs rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/30"
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: "rgba(59, 130, 246, 0.3)",
                      }}
                    >
                      {chain}
                    </motion.span>
                  ))}
                  {chainCompatibility.length > 3 && (
                    <span className="px-2.5 py-1 text-xs rounded-lg bg-white/10 text-white/60 border border-white/20">
                      +{chainCompatibility.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Spacer to push capabilities to bottom */}
              <div className="flex-1"></div>

              {/* Capabilities preview */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium text-white/50 uppercase tracking-wider">
                    Features
                  </p>
                  <div className="text-xs text-white/60">
                    {unlockedCapabilities.length} Free •{" "}
                    {premiumCapabilities.length} Premium
                  </div>
                </div>

                {/* Progress bar */}
                <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-green-400 to-blue-400 rounded-full"
                    initial={{ width: 0 }}
                    animate={{
                      width: `${
                        capabilities && capabilities.length > 0
                          ? (unlockedCapabilities.length /
                              capabilities.length) *
                            100
                          : 0
                      }%`,
                    }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                  />
                  <motion.div
                    className="absolute top-0 right-0 h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                    initial={{ width: 0 }}
                    animate={{
                      width: `${
                        capabilities && capabilities.length > 0
                          ? (premiumCapabilities.length / capabilities.length) *
                            100
                          : 0
                      }%`,
                    }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.7 }}
                  />
                </div>
              </div>
            </div>
          </Link>

          {/* Action buttons */}
          <div className="p-6 pt-0 space-y-3">
            {/* Try Free Version Button */}
            <motion.button
              onClick={handleActionButtonClick}
              className={actionButton.className}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <actionButton.icon className="w-4 h-4" />
              {actionButton.text}
            </motion.button>

            {/* Explore Agent Link */}
            <Link href={`/agent-store/${id}`} className="block">
              <motion.div
                className="flex items-center justify-between pt-2"
                whileHover={{ scale: 1.02 }}
              >
                <span className="text-sm text-white/70 font-medium">
                  {(connected && isOwned) || isMinted
                    ? "Manage Agent"
                    : "Explore Agent"}
                </span>

                <motion.div
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl border border-white/20 text-white text-sm font-medium group-hover:from-purple-500/30 group-hover:to-blue-500/30 group-hover:border-white/30 transition-all duration-300"
                  whileHover={{ x: 4 }}
                >
                  {(connected && isOwned) || isMinted ? "Manage" : "Explore"}
                  <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </motion.div>
              </motion.div>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Chat Modal */}
      <ChatModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        agent={agent}
      />
    </>
  );
};

export default EnhancedAgentCard;
