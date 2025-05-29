"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PrebuiltAgent } from "@/types/agent";
import EnhancedAgentCard from "@/components/agent-store/EnhancedAgentCard";
import AnimatedFilters from "@/components/agent-store/AnimatedFilters";
import AnimatedStats from "@/components/agent-store/AnimatedStats";
import ParticleBackground from "@/components/agent-store/ParticleBackground";
import { useWallet } from "@/components/auth/hooks/useWallet";
import {
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

const categories = ["All", "Analytics", "DeFi", "NFT", "Trading", "Research"];
const chains = [
  "All",
  "Ethereum",
  "Polygon",
  "Solana",
  "Binance Smart Chain",
  "Arbitrum",
  "Avalanche",
];

export default function AgentStorePage() {
  const { connected, publicKey } = useWallet();
  const [agents, setAgents] = useState<PrebuiltAgent[]>([]);
  const [filteredAgents, setFilteredAgents] = useState<PrebuiltAgent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedChain, setSelectedChain] = useState("All");
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchAgents();
  }, [connected, publicKey]);

  useEffect(() => {
    filterAgents();
  }, [agents, selectedCategory, selectedChain, searchQuery]);

  const fetchAgents = async () => {
    try {
      setLoading(true);

      // Build URL with wallet parameter if connected
      let url = "/api/agent-store";
      if (connected && publicKey) {
        url += `?user_wallet=${encodeURIComponent(publicKey.toString())}`;
      }

      const response = await fetch(url);
      const result = await response.json();

      if (result.success) {
        setAgents(result.data);
        setError(null);
      } else {
        setError(result.error || "Failed to fetch agents");
      }
    } catch (err) {
      console.error("Error fetching agents:", err);
      setError("Failed to load agents. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const filterAgents = () => {
    let filtered = agents;

    // Category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (agent) => agent.category === selectedCategory
      );
    }

    // Chain filter
    if (selectedChain !== "All") {
      filtered = filtered.filter((agent) =>
        agent.chainCompatibility.includes(selectedChain)
      );
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (agent) =>
          agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          agent.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          agent.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredAgents(filtered);
  };

  const handleClearFilters = () => {
    setSelectedCategory("All");
    setSelectedChain("All");
    setSearchQuery("");
  };

  const hasActiveFilters =
    selectedCategory !== "All" || selectedChain !== "All" || searchQuery !== "";

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 relative overflow-hidden">
        <ParticleBackground />

        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="text-center">
            <motion.div
              className="relative inline-flex items-center justify-center w-32 h-32 mx-auto mb-8"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-full blur-xl" />
              <div className="relative w-24 h-24 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center">
                <SparklesIcon className="w-12 h-12 text-white" />
              </div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold text-white mb-4 bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent"
            >
              Loading Premium Agents...
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-white/70"
            >
              Preparing the most advanced AI agents for you
            </motion.p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 relative overflow-hidden">
        <ParticleBackground />

        <div className="container mx-auto px-4 py-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center bg-black/30 backdrop-blur-xl border border-red-500/30 rounded-2xl p-12 max-w-lg mx-auto"
          >
            <div className="text-6xl mb-6">⚠️</div>
            <h2 className="text-2xl font-bold text-red-400 mb-4">{error}</h2>
            <motion.button
              onClick={fetchAgents}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:from-purple-600 hover:to-blue-600 transition-all font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Try Again
            </motion.button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 relative overflow-hidden">
      <ParticleBackground />

      {/* Aurora background effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -inset-[10px] opacity-20">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-purple-500/20 animate-aurora blur-3xl" />
          </div>
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 animate-aurora2 blur-3xl" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-white">
                Agent Store
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400">
                Premium Collection
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed"
            >
              Discover elite AI agents with live blockchain intelligence.
              <span className="block mt-2 text-lg text-purple-300">
                Mint as NFTs to unlock premium features and unlimited
                capabilities.
              </span>
            </motion.p>
          </motion.div>

          {/* Stats */}
          <AnimatedStats
            totalAgents={agents.length}
            mintedAgents={agents.filter((a) => a.isMinted).length}
            totalCategories={categories.length - 1}
          />
        </div>

        {/* Search and Filter Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between"
        >
          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              placeholder="Search agents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-black/30 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-400/50 focus:ring-2 focus:ring-purple-400/20 transition-all"
            />
          </div>

          {/* Filter Toggle */}
          <motion.button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-3 bg-black/30 backdrop-blur-sm border border-white/20 rounded-xl text-white hover:border-white/30 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <AdjustmentsHorizontalIcon className="w-5 h-5" />
            <span className="font-medium">
              {showFilters ? "Hide" : "Show"} Filters
            </span>
            {hasActiveFilters && (
              <span className="w-2 h-2 bg-purple-400 rounded-full" />
            )}
          </motion.button>
        </motion.div>

        {/* Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <AnimatedFilters
                categories={categories}
                chains={chains}
                selectedCategory={selectedCategory}
                selectedChain={selectedChain}
                onCategoryChange={setSelectedCategory}
                onChainChange={setSelectedChain}
                onClearFilters={handleClearFilters}
                hasActiveFilters={hasActiveFilters}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-8 flex justify-between items-center"
        >
          <div className="text-white/60">
            <span className="text-white font-medium">
              {filteredAgents.length}
            </span>{" "}
            of <span className="text-white font-medium">{agents.length}</span>{" "}
            agents
            {hasActiveFilters && (
              <span className="text-purple-300 ml-2">• Filtered</span>
            )}
          </div>

          {hasActiveFilters && (
            <motion.button
              onClick={handleClearFilters}
              className="text-sm text-purple-400 hover:text-purple-300 transition-colors underline decoration-dotted underline-offset-4"
              whileHover={{ scale: 1.05 }}
            >
              Clear All Filters
            </motion.button>
          )}
        </motion.div>

        {/* Agents Grid */}
        <AnimatePresence mode="wait">
          {filteredAgents.length > 0 ? (
            <motion.div
              key="agents-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredAgents.map((agent, index) => (
                <EnhancedAgentCard key={agent.id} agent={agent} index={index} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="no-results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="text-center py-20"
            >
              <div className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl p-12 max-w-lg mx-auto">
                <div className="text-6xl mb-6">🔍</div>
                <h3 className="text-2xl font-bold text-white mb-4 bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
                  No Agents Found
                </h3>
                <p className="text-white/60 mb-6 leading-relaxed">
                  We couldn't find any agents matching your criteria.
                  <br />
                  Try adjusting your filters or search terms.
                </p>
                <motion.button
                  onClick={handleClearFilters}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:from-purple-600 hover:to-blue-600 transition-all font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Reset Filters
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
