"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useWallet } from "@/components/auth/hooks/useWallet";
import { PrebuiltAgent } from "@/types/agent";
import ChatModal from "@/components/agent-store/ChatModal";
import {
  MagnifyingGlassIcon,
  DocumentTextIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  BellIcon,
  SparklesIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { MintSuccessModal } from "@/components/ui/MintSuccessModal";
import { useToast } from "@/components/ui/Toast";

const DeepResearchAgentPage = () => {
  const router = useRouter();
  const { connected, publicKey } = useWallet();
  const [agent, setAgent] = useState<PrebuiltAgent | null>(null);
  const [loading, setLoading] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedCapability, setSelectedCapability] = useState<string | null>(
    null
  );
  const [showMintSuccess, setShowMintSuccess] = useState(false);
  const toast = useToast();

  useEffect(() => {
    fetchAgent();
  }, [connected, publicKey]);

  const fetchAgent = async () => {
    try {
      setLoading(true);
      let url = "/api/prebuilt-agents/deep-research-agent";
      if (connected && publicKey) {
        url += `?user_wallet=${encodeURIComponent(publicKey.toString())}`;
      }

      const response = await fetch(url);
      const result = await response.json();

      if (result.success) {
        setAgent(result.data);
      }
    } catch (error) {
      console.error("Error fetching deep research agent:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMintAgent = async () => {
    if (!connected || !publicKey || !agent) {
      toast.warning(
        "Wallet Required",
        "Please connect your wallet to mint this research agent.",
        { duration: 6000 }
      );
      return;
    }

    try {
      const response = await fetch(`/api/prebuilt-agents/${agent.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "mint",
          walletAddress: publicKey.toString(),
        }),
      });

      const result = await response.json();
      if (result.success) {
        setAgent({ ...agent, isMinted: true, isOwned: true });

        setShowMintSuccess(true);
      } else {
        toast.error(
          "Minting Failed",
          result.error ||
            "An unexpected error occurred while minting the research agent. Please try again.",
          {
            duration: 8000,
            actions: [
              {
                label: "Retry",
                onClick: () => handleMintAgent(),
                variant: "primary",
              },
            ],
          }
        );
      }
    } catch (error) {
      console.error("Error minting agent:", error);
      toast.error(
        "Network Error",
        "Failed to connect to the server. Please check your connection and try again.",
        {
          duration: 8000,
          actions: [
            {
              label: "Retry",
              onClick: () => handleMintAgent(),
              variant: "primary",
            },
          ],
        }
      );
    }
  };

  const capabilityIcons = {
    "quick-research": MagnifyingGlassIcon,
    "comprehensive-report": DocumentTextIcon,
    "due-diligence": ShieldCheckIcon,
    "market-analysis": ChartBarIcon,
    "real-time-monitoring": BellIcon,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 flex items-center justify-center">
        <div className="text-white text-xl">Loading Deep Research Agent...</div>
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 flex items-center justify-center">
        <div className="text-white text-xl">Agent not found</div>
      </div>
    );
  }

  const isOwned = (connected && agent.isOwned) || agent.isMinted;
  const freeCapabilities =
    agent.capabilities?.filter((cap) => !cap.requiresMinting) || [];
  const premiumCapabilities =
    agent.capabilities?.filter((cap) => cap.requiresMinting) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Navigation */}
        <div className="mb-8">
          <Link
            href="/agent-store"
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back to Agent Store
          </Link>
        </div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="text-8xl mb-6">{agent.visualRepresentation}</div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            {agent.name}
          </h1>
          <p className="text-xl text-white/70 max-w-4xl mx-auto mb-8 leading-relaxed">
            {agent.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              onClick={() => setIsChatOpen(true)}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-blue-600 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Research Chat
            </motion.button>

            {!isOwned && (
              <motion.button
                onClick={handleMintAgent}
                className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={!connected}
              >
                Mint for {agent.price} ETH
              </motion.button>
            )}
          </div>

          {!connected && (
            <p className="text-yellow-400 mt-4">
              Connect your wallet to mint this agent
            </p>
          )}
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {agent.features.map((feature, index) => (
            <div
              key={index}
              className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:border-purple-500/30 transition-all"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                <SparklesIcon className="w-6 h-6 text-white" />
              </div>
              <p className="text-white font-medium">{feature}</p>
            </div>
          ))}
        </motion.div>

        {/* Capabilities Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Free Capabilities */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <MagnifyingGlassIcon className="w-8 h-8 text-green-400" />
              Free Research Tools
            </h2>
            <div className="space-y-4">
              {freeCapabilities.map((capability) => {
                const IconComponent =
                  capabilityIcons[
                    capability.id as keyof typeof capabilityIcons
                  ] || MagnifyingGlassIcon;
                return (
                  <div
                    key={capability.id}
                    className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg hover:border-green-500/40 transition-all cursor-pointer"
                    onClick={() => setSelectedCapability(capability.id)}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <IconComponent className="w-5 h-5 text-green-400" />
                      <h3 className="font-semibold text-white">
                        {capability.name}
                      </h3>
                      <span className="text-xs text-green-400 bg-green-500/20 px-2 py-1 rounded">
                        FREE
                      </span>
                    </div>
                    <p className="text-white/70 text-sm">
                      {capability.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Premium Capabilities */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <SparklesIcon className="w-8 h-8 text-purple-400" />
              Premium Research Suite
            </h2>
            <div className="space-y-4">
              {premiumCapabilities.map((capability) => {
                const IconComponent =
                  capabilityIcons[
                    capability.id as keyof typeof capabilityIcons
                  ] || DocumentTextIcon;
                return (
                  <div
                    key={capability.id}
                    className={`p-4 border rounded-lg transition-all ${
                      isOwned
                        ? "bg-purple-500/10 border-purple-500/20 hover:border-purple-500/40 cursor-pointer"
                        : "bg-gray-500/10 border-gray-500/20 opacity-60"
                    }`}
                    onClick={() =>
                      isOwned && setSelectedCapability(capability.id)
                    }
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <IconComponent
                        className={`w-5 h-5 ${
                          isOwned ? "text-purple-400" : "text-gray-400"
                        }`}
                      />
                      <h3 className="font-semibold text-white">
                        {capability.name}
                      </h3>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          isOwned
                            ? "text-purple-400 bg-purple-500/20"
                            : "text-gray-400 bg-gray-500/20"
                        }`}
                      >
                        {isOwned ? "UNLOCKED" : "MINT TO UNLOCK"}
                      </span>
                    </div>
                    <p className="text-white/70 text-sm">
                      {capability.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {!isOwned && (
              <div className="mt-6 p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
                <p className="text-yellow-400 text-sm">
                  💎 Mint this agent as an NFT to unlock all premium research
                  capabilities and gain full access to advanced deep research
                  features.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Chat Modal */}
      {agent && (
        <ChatModal
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          agent={agent}
        />
      )}

      {/* Mint Success Modal */}
      {agent && (
        <MintSuccessModal
          isOpen={showMintSuccess}
          onClose={() => setShowMintSuccess(false)}
          agentName={agent.name}
          agentPrice={agent.price}
          agentType={agent.category}
          agentImage={agent.visualRepresentation}
          onUseAgent={() => {
            setShowMintSuccess(false);
            setIsChatOpen(true);
          }}
          onViewInStore={() => {
            setShowMintSuccess(false);
            window.open("/agent-store", "_blank");
          }}
        />
      )}

      {/* Toast Notifications */}
      <toast.ToastContainer />
    </div>
  );
};

export default DeepResearchAgentPage;
