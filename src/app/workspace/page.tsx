"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useWallet } from "@/components/auth/hooks/useWallet";
import { useWalletAnalytics } from "@/hooks/useWalletAnalytics";
import { useAgents } from "@/hooks/useAgents";
import { WalletAnalytics } from "@/components/wallet/WalletAnalytics";
import { AgentCard } from "@/components/agents/AgentCard";
import { AgentType } from "@/lib/mindmint-sdk/types";
import WorkspaceEmptyState from "@/components/workspace/WorkspaceEmptyState";

export default function WorkspacePage() {
  const { connected, publicKey } = useWallet();
  const { analytics, getAnalytics, refreshAnalytics } = useWalletAnalytics();
  const { listAgents } = useAgents();
  const [userAgents, setUserAgents] = useState<AgentType[]>([]);

  useEffect(() => {
    if (connected && publicKey) {
      getAnalytics(publicKey);
      loadUserAgents();
    }
  }, [connected, publicKey]);

  const loadUserAgents = async () => {
    if (!publicKey) return;

    const response = await listAgents({
      // Add filter for user's wallet
      creator_wallet: publicKey,
      sort: "created_at",
      order: "desc",
    });

    if (response) {
      setUserAgents(response.agents);
    }
  };

  if (!connected) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto mt-16">
          <div className="bg-black/50 backdrop-blur-md border border-white/10 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Connect Your Wallet
            </h2>
            <p className="text-white/70 mb-6">
              Connect your wallet to view your workspace and manage your agents.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          {/* Wallet Analytics */}
          {analytics && (
            <section>
              <h2 className="text-2xl font-semibold text-white mb-6">
                Wallet Overview
              </h2>
              <WalletAnalytics
                analytics={analytics}
                onRefresh={refreshAnalytics}
              />
            </section>
          )}

          {/* User's Agents */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-white">Your Agents</h2>
              <button
                onClick={loadUserAgents}
                className="p-2 text-white/70 hover:text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            {userAgents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userAgents.map((agent) => (
                  <AgentCard key={agent.id} agent={agent} />
                ))}
              </div>
            ) : (
              <WorkspaceEmptyState />
            )}
          </section>
        </motion.div>
      </div>
    </div>
  );
}
