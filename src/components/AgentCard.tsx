"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { PrebuiltAgent } from "@/types/agent";
import ChatModal from "@/components/agent-store/ChatModal";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";

interface AgentCardProps {
  agent: PrebuiltAgent;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const {
    id,
    name,
    description,
    visualRepresentation,
    avatar,
    category,
    chainCompatibility,
    isMinted,
    price,
    capabilities,
  } = agent;

  const unlockedCapabilities = (capabilities || []).filter(
    (cap) => !cap.requiresMinting
  );
  const premiumCapabilities = (capabilities || []).filter(
    (cap) => cap.requiresMinting
  );

  const handleTryFreeVersion = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsChatOpen(true);
  };

  return (
    <>
      <div className="group relative overflow-hidden rounded-xl bg-black/50 backdrop-blur-md border border-white/10 transition-all hover:border-white/20">
        <Link href={`/agent-store/${id}`} className="block">
          {/* Header with visual representation and category */}
          <div className="relative p-4 bg-gradient-to-br from-purple-500/20 to-blue-500/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{visualRepresentation}</span>
              <span className="px-2 py-1 text-xs rounded-full bg-white/10 text-white/70">
                {category}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-white">{price} ETH</span>
              {isMinted && (
                <span className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                  Minted
                </span>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="text-lg font-semibold text-white mb-2">{name}</h3>
            <p className="text-sm text-white/70 mb-3 line-clamp-2">
              {description}
            </p>

            {/* Chain compatibility */}
            <div className="mb-3">
              <p className="text-xs text-white/50 mb-1">Supported Chains:</p>
              <div className="flex flex-wrap gap-1">
                {chainCompatibility.slice(0, 3).map((chain) => (
                  <span
                    key={chain}
                    className="px-2 py-1 text-xs rounded bg-white/10 text-white/60"
                  >
                    {chain}
                  </span>
                ))}
                {chainCompatibility.length > 3 && (
                  <span className="px-2 py-1 text-xs rounded bg-white/10 text-white/60">
                    +{chainCompatibility.length - 3}
                  </span>
                )}
              </div>
            </div>

            {/* Capabilities preview */}
            <div className="mb-4">
              <p className="text-xs text-white/50 mb-1">
                Free Features: {unlockedCapabilities.length} | Premium:{" "}
                {premiumCapabilities.length}
              </p>
              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-400 to-blue-400 rounded-full transition-all"
                  style={{
                    width: `${
                      capabilities && capabilities.length > 0
                        ? (unlockedCapabilities.length / capabilities.length) *
                          100
                        : 0
                    }%`,
                  }}
                />
              </div>
            </div>
          </div>
        </Link>

        {/* Action buttons */}
        <div className="p-4 pt-0 space-y-3">
          {/* Try Free Version Button */}
          <motion.button
            onClick={handleTryFreeVersion}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 hover:from-green-500/30 hover:to-emerald-500/30 border border-green-500/30 hover:border-green-400/50 rounded-lg text-green-300 hover:text-green-200 text-sm font-medium transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ChatBubbleLeftRightIcon className="w-4 h-4" />
            Try Free Version
          </motion.button>

          {/* View Details Link */}
          <Link href={`/agent-store/${id}`} className="block">
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/70">
                {isMinted ? "View Dashboard" : "View Details"}
              </span>
              <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-sm text-white group-hover:bg-white/20 transition-colors">
                {isMinted ? "→" : "Explore"}
              </span>
            </div>
          </Link>
        </div>
      </div>

      {/* Chat Modal */}
      <ChatModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        agent={agent}
      />
    </>
  );
};

export default AgentCard;
