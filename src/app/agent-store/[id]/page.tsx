"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useWallet } from "@/components/auth/hooks/useWallet";
import { PrebuiltAgent, AgentCapability } from "@/types/agent";
import ChatModal from "@/components/agent-store/ChatModal";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";

export default function AgentDetailPage() {
  const params = useParams();
  const { connected, publicKey } = useWallet();
  const [agent, setAgent] = useState<PrebuiltAgent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [minting, setMinting] = useState(false);
  const [activeCapability, setActiveCapability] = useState<string | null>(null);
  const [liveData, setLiveData] = useState<any>(null);
  const [dataLoading, setDataLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const fetchAgent = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/prebuilt-agents/${params.id}`);

      if (!response.ok) {
        throw new Error("Failed to fetch agent details");
      }

      const result = await response.json();
      if (result.success) {
        setAgent(result.data);
      } else {
        throw new Error(result.error || "Failed to fetch agent");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgent();
  }, [params.id]);

  const handleMint = async () => {
    if (!connected || !publicKey) {
      alert("Please connect your wallet first!");
      return;
    }

    try {
      setMinting(true);
      const response = await fetch(`/api/prebuilt-agents/${params.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "mint",
          walletAddress: publicKey,
        }),
      });

      const result = await response.json();
      if (result.success) {
        // Refresh agent data to show minted status
        await fetchAgent();
        alert("Agent minted successfully! 🎉");
      } else {
        alert("Failed to mint agent: " + result.error);
      }
    } catch (err) {
      console.error("Error minting agent:", err);
      alert("Failed to mint agent");
    } finally {
      setMinting(false);
    }
  };

  const handleTryFreeVersion = () => {
    setIsChatOpen(true);
  };

  const demonstrateCapability = async (capability: AgentCapability) => {
    if (capability.requiresMinting && !agent?.isMinted) {
      alert("This capability requires minting the agent first!");
      return;
    }

    if (!connected || !publicKey) {
      alert("Please connect your wallet to use this feature!");
      return;
    }

    try {
      setDataLoading(true);
      setActiveCapability(capability.id);

      // Mock parameters for demonstration
      const demoParams = {
        address: "0xA0b86a33E6417aFb9Aa77AD3D0A4b3827A7A9D4c", // Mock token address
        chain: "eth",
      };

      const response = await fetch(`/api/prebuilt-agents/${params.id}/data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          capability: capability.id,
          walletAddress: publicKey,
          ...demoParams,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setLiveData(result.data);
      } else {
        alert("Failed to fetch live data: " + result.error);
      }
    } catch (err) {
      console.error("Error demonstrating capability:", err);
      alert("Failed to demonstrate capability");
    } finally {
      setDataLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-400 mx-auto"></div>
          <p className="mt-4 text-white/70">Loading agent details...</p>
        </div>
      </div>
    );
  }

  if (error || !agent) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <div className="text-red-400 text-lg mb-4">⚠️ {error}</div>
          <Link
            href="/agent-store"
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Back to Store
          </Link>
        </div>
      </div>
    );
  }

  const unlockedCapabilities =
    agent?.capabilities?.filter((cap) => !cap.requiresMinting) || [];
  const premiumCapabilities =
    agent?.capabilities?.filter((cap) => cap.requiresMinting) || [];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Navigation */}
      <div className="mb-8">
        <Link
          href="/agent-store"
          className="text-purple-400 hover:text-purple-300 transition-colors"
        >
          ← Back to Agent Store
        </Link>
      </div>

      {/* Agent Header */}
      <div className="bg-black/50 backdrop-blur-md border border-white/10 rounded-xl p-8 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Agent Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-4xl">{agent.visualRepresentation}</span>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  {agent.name}
                </h1>
                <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                  {agent.category}
                </span>
              </div>
            </div>

            <p className="text-white/70 text-lg mb-6">{agent.description}</p>

            {/* Chain Compatibility */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-3">
                Supported Blockchains
              </h3>
              <div className="flex flex-wrap gap-2">
                {agent.chainCompatibility.map((chain) => (
                  <span
                    key={chain}
                    className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-lg text-sm"
                  >
                    {chain}
                  </span>
                ))}
              </div>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">
                Key Features
              </h3>
              <ul className="space-y-2">
                {agent.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-white/70"
                  >
                    <span className="text-green-400 mt-1">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Minting Panel */}
          <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-xl p-6 border border-white/10">
            <div className="text-center mb-6">
              <div className="text-3xl font-bold text-white mb-2">
                {agent.price} ETH
              </div>
              <div className="text-white/60">Minting Price</div>
            </div>

            {/* Try Free Version Button - Always visible */}
            <motion.button
              onClick={handleTryFreeVersion}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 mb-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 hover:from-green-500/30 hover:to-emerald-500/30 border border-green-500/30 hover:border-green-400/50 rounded-lg text-green-300 hover:text-green-200 text-sm font-medium transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ChatBubbleLeftRightIcon className="w-4 h-4" />
              Try Free Version
            </motion.button>

            {agent.isMinted ? (
              <div className="text-center">
                <div className="mb-4 p-4 bg-green-500/20 rounded-lg border border-green-500/30">
                  <div className="text-green-400 font-semibold mb-1">
                    🎉 Already Minted!
                  </div>
                  <div className="text-green-300 text-sm">
                    All features unlocked
                  </div>
                </div>
                <button
                  disabled
                  className="w-full py-3 bg-gray-600 text-gray-400 rounded-lg cursor-not-allowed"
                >
                  Already Owned
                </button>
              </div>
            ) : !connected ? (
              <div className="text-center">
                <div className="mb-4 text-sm text-white/60">
                  Connect your wallet to mint this agent as an NFT
                </div>
                <div className="mb-4 p-3 bg-yellow-500/20 rounded-lg border border-yellow-500/30">
                  <div className="text-yellow-400 text-sm">
                    ⚠️ Wallet connection required
                  </div>
                </div>
                <button
                  disabled
                  className="w-full py-3 bg-gray-600 text-gray-400 rounded-lg cursor-not-allowed"
                >
                  Connect Wallet First
                </button>
              </div>
            ) : (
              <div className="text-center">
                <div className="mb-4 text-sm text-white/60">
                  Mint this agent as an NFT to unlock all premium features
                </div>
                <button
                  onClick={handleMint}
                  disabled={minting}
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {minting ? "Minting..." : "Mint Agent NFT"}
                </button>
              </div>
            )}

            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="text-xs text-white/50 text-center">
                <div>Free Features: {unlockedCapabilities.length}</div>
                <div>Premium Features: {premiumCapabilities.length}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Capabilities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Free Capabilities */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">
            Free Capabilities
          </h2>
          <div className="space-y-4">
            {unlockedCapabilities.map((capability) => (
              <div
                key={capability.id}
                className="bg-black/30 border border-green-500/30 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-white">
                    {capability.name}
                  </h3>
                  <span className="text-xs text-green-400 bg-green-500/20 px-2 py-1 rounded">
                    FREE
                  </span>
                </div>
                <p className="text-white/70 text-sm mb-3">
                  {capability.description}
                </p>
                <button
                  onClick={() => demonstrateCapability(capability)}
                  disabled={dataLoading && activeCapability === capability.id}
                  className="text-sm text-green-400 hover:text-green-300 transition-colors disabled:opacity-50"
                >
                  {dataLoading && activeCapability === capability.id
                    ? "Loading..."
                    : "Try Demo"}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Premium Capabilities */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">
            Premium Capabilities
          </h2>
          <div className="space-y-4">
            {premiumCapabilities.map((capability) => (
              <div
                key={capability.id}
                className="bg-black/30 border border-purple-500/30 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-white">
                    {capability.name}
                  </h3>
                  <span className="text-xs text-purple-400 bg-purple-500/20 px-2 py-1 rounded">
                    PREMIUM
                  </span>
                </div>
                <p className="text-white/70 text-sm mb-3">
                  {capability.description}
                </p>
                <button
                  onClick={() => demonstrateCapability(capability)}
                  disabled={
                    (dataLoading && activeCapability === capability.id) ||
                    !agent.isMinted
                  }
                  className="text-sm text-purple-400 hover:text-purple-300 transition-colors disabled:opacity-50"
                >
                  {!agent.isMinted
                    ? "Requires Minting"
                    : dataLoading && activeCapability === capability.id
                    ? "Loading..."
                    : "Try Demo"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Live Data Display */}
      {liveData && (
        <div className="mt-8 bg-black/50 backdrop-blur-md border border-white/10 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">Live Data Demo</h3>
          <pre className="bg-black/30 p-4 rounded-lg text-white/80 text-sm overflow-auto">
            {JSON.stringify(liveData, null, 2)}
          </pre>
        </div>
      )}

      {/* Chat Modal */}
      {agent && (
        <ChatModal
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          agent={agent}
        />
      )}
    </div>
  );
}
