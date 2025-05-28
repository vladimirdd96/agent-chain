"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useWallet } from "@/components/auth/hooks/useWallet";
import { useWalletAnalytics } from "@/hooks/useWalletAnalytics";
import { useAgents } from "@/hooks/useAgents";
import { WalletAnalytics } from "@/components/wallet/WalletAnalytics";
import { AgentType } from "@/lib/mindmint-sdk/types";
import WorkspaceEmptyState from "@/components/workspace/WorkspaceEmptyState";
import { AgentDashboard } from "@/components/workspace/AgentDashboard";
import WalletConnectPrompt from "@/components/auth/WalletConnectPrompt";

export default function WorkspacePage() {
  const { connected, publicKey } = useWallet();
  const { analytics, getAnalytics, refreshAnalytics } = useWalletAnalytics();
  const { listAgents } = useAgents();
  const [userAgents, setUserAgents] = useState<AgentType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<any>(null);

  useEffect(() => {
    if (connected && publicKey) {
      getAnalytics(publicKey);
      loadUserAgents();
    }
  }, [connected, publicKey]);

  const loadUserAgents = async () => {
    if (!publicKey) return;

    setIsLoading(true);
    setError(null);
    try {
      // Fetch both user-created agents AND minted prebuilt agents
      const [userCreatedResponse, prebuiltResponse] = await Promise.all([
        // User-created agents
        fetch(
          `/api/agents?creator_wallet=${encodeURIComponent(
            publicKey
          )}&sort=created_at&order=desc`
        ),
        // Minted prebuilt agents owned by user
        fetch(`/api/agent-store?user_wallet=${encodeURIComponent(publicKey)}`),
      ]);

      console.log("🔍 Fetching agents for wallet:", publicKey);

      if (!userCreatedResponse.ok) {
        throw new Error(
          `Failed to fetch user agents: ${userCreatedResponse.statusText}`
        );
      }

      if (!prebuiltResponse.ok) {
        throw new Error(
          `Failed to fetch prebuilt agents: ${prebuiltResponse.statusText}`
        );
      }

      const [userCreatedData, prebuiltData] = await Promise.all([
        userCreatedResponse.json(),
        prebuiltResponse.json(),
      ]);

      console.log("📊 User Created API Response:", userCreatedData);
      console.log("📊 Prebuilt API Response:", prebuiltData);

      // Combine user-created agents and minted prebuilt agents owned by user
      const userCreatedAgents = userCreatedData.agents || [];
      const ownedPrebuiltAgents = (prebuiltData.data || []).filter(
        (agent: any) =>
          agent.type === "prebuilt" &&
          agent.isMinted &&
          agent.ownerWallet === publicKey
      );

      // Transform prebuilt agents to match AgentType interface
      const transformedPrebuiltAgents = ownedPrebuiltAgents.map(
        (agent: any) => ({
          id: agent.id,
          name: agent.name,
          description: agent.description,
          type: "blockchain", // Map to AgentType
          parameters: {},
          creator_wallet: agent.ownerWallet,
          is_public: true,
          status: "active",
          nft_mint_address: undefined, // Prebuilt agents don't have NFT addresses yet
          created_at: agent.mintDate,
          updated_at: agent.mintDate,
          // Additional UI fields
          chain: agent.chainCompatibility?.[0] || "Ethereum",
          image_url: agent.avatar,
          // Mark as prebuilt for UI distinction
          isPrebuilt: true,
          originalAgent: agent,
        })
      );

      const allUserAgents = [
        ...userCreatedAgents,
        ...transformedPrebuiltAgents,
      ];

      setDebugInfo({
        publicKey,
        userCreatedCount: userCreatedAgents.length,
        prebuiltCount: transformedPrebuiltAgents.length,
        totalCount: allUserAgents.length,
        userCreatedData,
        prebuiltData,
        timestamp: new Date().toISOString(),
      });

      setUserAgents(allUserAgents);
      console.log("✅ Loaded user agents:", allUserAgents);
    } catch (error) {
      console.error("❌ Failed to load user agents:", error);
      setError(error instanceof Error ? error.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    if (connected && publicKey) {
      refreshAnalytics();
      loadUserAgents();
    }
  };

  // Enhanced debug logging
  console.log("🏠 Workspace state:", {
    connected,
    publicKey,
    userAgentsCount: userAgents.length,
    isLoading,
    error,
    debugInfo,
  });

  if (!connected) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto mt-16">
          <WalletConnectPrompt
            title="Connect Your Wallet to Begin"
            subtitle="Connect your wallet to view your workspace and manage your agents."
            showFeatures={true}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-7xl mx-auto mt-15">
        {/* Debug Panel - Remove this in production */}
        {process.env.NODE_ENV === "development" && (
          <div className="mb-4 p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg text-sm">
            <details>
              <summary className="cursor-pointer text-yellow-300 font-medium">
                🐛 Debug Info (Click to expand)
              </summary>
              <div className="mt-2 space-y-2 text-yellow-100">
                <div>
                  <strong>Wallet:</strong> {publicKey}
                </div>
                <div>
                  <strong>Agents Found:</strong> {userAgents.length}
                </div>
                <div>
                  <strong>Loading:</strong> {isLoading ? "Yes" : "No"}
                </div>
                <div>
                  <strong>Error:</strong> {error || "None"}
                </div>
                {debugInfo && (
                  <div>
                    <strong>Last API Call:</strong>
                    <pre className="text-xs mt-1 bg-black/20 p-2 rounded overflow-auto">
                      {JSON.stringify(debugInfo, null, 2)}
                    </pre>
                  </div>
                )}
                <button
                  onClick={handleRefresh}
                  className="px-3 py-1 bg-yellow-600 text-black rounded text-xs font-medium"
                >
                  🔄 Refresh Data
                </button>
              </div>
            </details>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-12">
              <div className="inline-flex items-center px-6 py-3 bg-purple-500/20 rounded-lg border border-purple-500/30">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-400 mr-3"></div>
                <span className="text-white">Loading your agents...</span>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-8">
              <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6 max-w-md mx-auto">
                <h3 className="text-red-400 font-medium mb-2">
                  Error Loading Agents
                </h3>
                <p className="text-red-300 text-sm mb-4">{error}</p>
                <button
                  onClick={handleRefresh}
                  className="px-4 py-2 bg-red-600 text-white rounded text-sm font-medium hover:bg-red-700"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {/* Main Content */}
          {!isLoading && !error && (
            <>
              {userAgents.length > 0 ? (
                <>
                  {/* Agent Dashboard */}
                  <section>
                    <AgentDashboard
                      agents={userAgents}
                      onRefresh={handleRefresh}
                    />
                  </section>

                  {/* Wallet Analytics - Optional section for users with agents */}
                  {analytics && (
                    <section>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <div className="flex items-center gap-3 mb-6">
                          <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20">
                            <svg
                              className="w-5 h-5 text-purple-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                              />
                            </svg>
                          </div>
                          <h2 className="text-xl font-semibold text-white">
                            Wallet Overview
                          </h2>
                        </div>
                        <WalletAnalytics
                          analytics={analytics}
                          onRefresh={refreshAnalytics}
                        />
                      </motion.div>
                    </section>
                  )}
                </>
              ) : (
                <section>
                  <WorkspaceEmptyState />
                </section>
              )}
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
