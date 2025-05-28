"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAgents } from "@/hooks/useAgents";
import { useWalletAnalytics } from "@/hooks/useWalletAnalytics";
import { useWallet } from "@/components/auth/hooks/useWallet";
import { WalletAnalytics } from "@/components/wallet/WalletAnalytics";
import { PlaceholderImage } from "@/components/common/PlaceholderImage";
import { AgentWithStats } from "@/lib/mindmint-sdk/types";
import WalletButton from "@/components/auth/WalletButton";
import { Button } from "@/components/ui/Button";

interface AgentDetailPageProps {
  params: {
    id: string;
  };
}

export default function AgentDetailPage({ params }: AgentDetailPageProps) {
  const { id } = params;
  const router = useRouter();
  const { connected, publicKey } = useWallet();
  const { loading: agentLoading, error: agentError, getAgent } = useAgents();
  const {
    loading: analyticsLoading,
    getAnalytics,
    analytics,
    refreshAnalytics,
  } = useWalletAnalytics();
  const [agent, setAgent] = useState<AgentWithStats | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    loadAgent();
  }, [id]);

  useEffect(() => {
    if (connected && publicKey) {
      getAnalytics(publicKey);
    }
  }, [connected, publicKey]);

  const loadAgent = async () => {
    try {
      const data = await getAgent(id);
      if (data) {
        setAgent(data);
      } else {
        setNotFound(true);
      }
    } catch (error) {
      console.error("Error loading agent:", error);
      setNotFound(true);
    }
  };

  if (agentLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="h-96 bg-black/50 backdrop-blur-md border border-white/10 rounded-xl animate-pulse" />
        </div>
      </div>
    );
  }

  if (agentError || notFound || !agent) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black/50 backdrop-blur-md border border-white/10 rounded-xl p-12"
          >
            <div className="text-6xl mb-6">🤖</div>
            <h1 className="text-3xl font-bold text-white mb-4">
              Agent Not Found
            </h1>
            <p className="text-white/70 text-lg mb-8">
              The agent you're looking for might not exist yet or has been
              removed.
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                variant="primary"
                onClick={() => router.push("/agent-store")}
              >
                Browse Agents
              </Button>
              <Button variant="outline" onClick={() => router.push("/deploy")}>
                Deploy New Agent
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Agent Details */}
          <div className="space-y-8">
            <div className="bg-black/50 backdrop-blur-md border border-white/10 rounded-xl p-8">
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                {agent.name}
              </h1>
              <p className="text-white/70 text-lg mb-6">{agent.description}</p>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-white/50">Type</span>
                  <span className="px-3 py-1 text-sm font-medium text-white bg-purple-500/20 rounded-full border border-purple-500/30">
                    {agent.type}
                  </span>
                </div>

                <div className="flex items-center justify-between">
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

                <div className="flex items-center justify-between">
                  <span className="text-white/50">Creator</span>
                  <code className="px-2 py-1 text-sm bg-white/5 rounded">
                    {agent.creator_wallet}
                  </code>
                </div>

                {agent.nft_mint_address && (
                  <div className="flex items-center justify-between">
                    <span className="text-white/50">NFT</span>
                    <code className="px-2 py-1 text-sm bg-white/5 rounded">
                      {agent.nft_mint_address}
                    </code>
                  </div>
                )}
              </div>
            </div>

            {agent.stats && (
              <div className="bg-black/50 backdrop-blur-md border border-white/10 rounded-xl p-8">
                <h2 className="text-2xl font-semibold text-white mb-6">
                  Performance
                </h2>
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <p className="text-white/70 mb-1">Deployments</p>
                    <p className="text-2xl font-bold text-white">
                      {agent.stats.deployments}
                    </p>
                  </div>
                  <div>
                    <p className="text-white/70 mb-1">Success Rate</p>
                    <p className="text-2xl font-bold text-white">
                      {agent.stats.success_rate}%
                    </p>
                  </div>
                  <div>
                    <p className="text-white/70 mb-1">Avg. Return</p>
                    <p className="text-2xl font-bold text-white">
                      {agent.stats.avg_return}%
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Wallet Analytics */}
          <div>
            {connected && analytics ? (
              <WalletAnalytics
                analytics={analytics}
                onRefresh={refreshAnalytics}
              />
            ) : (
              <div className="bg-black/50 backdrop-blur-md border border-white/10 rounded-xl p-8 text-center">
                <h2 className="text-2xl font-semibold text-white mb-4">
                  Connect Your Wallet
                </h2>
                <p className="text-white/70 mb-6">
                  Connect your wallet to view analytics and deploy this agent.
                </p>
                <WalletButton />
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
