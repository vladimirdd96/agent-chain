"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { AgentType } from "@/lib/agentchain-sdk/types";
import { PlaceholderImage } from "@/components/common/PlaceholderImage";

interface AgentCardProps {
  agent: AgentType;
}

export function AgentCard({ agent }: AgentCardProps) {
  return (
    <Link href={`/agent/${agent.id}`}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-black/50 backdrop-blur-md border border-white/10 rounded-xl p-6 cursor-pointer transition-colors hover:border-purple-500/50"
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-1">
              {agent.name}
            </h3>
            <p className="text-white/70 text-sm">{agent.description}</p>
          </div>
          <span className="px-3 py-1 text-xs font-medium text-white bg-purple-500/20 rounded-full border border-purple-500/30">
            {agent.type}
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/50">Status</span>
            <span
              className={`
              font-medium
              ${agent.status === "active" ? "text-green-400" : ""}
              ${agent.status === "pending" ? "text-yellow-400" : ""}
              ${agent.status === "failed" ? "text-red-400" : ""}
            `}
            >
              {agent.status}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-white/50">Creator</span>
            <code className="px-2 py-1 text-xs bg-white/5 rounded">
              {agent.creator_wallet.slice(0, 6)}...
              {agent.creator_wallet.slice(-4)}
            </code>
          </div>

          {agent.nft_mint_address && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/50">NFT</span>
              <code className="px-2 py-1 text-xs bg-white/5 rounded">
                {agent.nft_mint_address.slice(0, 6)}...
                {agent.nft_mint_address.slice(-4)}
              </code>
            </div>
          )}
        </div>
      </motion.div>
    </Link>
  );
}
