"use client";

import React, { useState, useEffect } from "react";
import AgentCard from "@/components/AgentCard";
import { PrebuiltAgent } from "@/types/agent";

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
  const [agents, setAgents] = useState<PrebuiltAgent[]>([]);
  const [filteredAgents, setFilteredAgents] = useState<PrebuiltAgent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedChain, setSelectedChain] = useState("All");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAgents();
  }, []);

  useEffect(() => {
    filterAgents();
  }, [agents, selectedCategory, selectedChain]);

  const fetchAgents = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/prebuilt-agents");
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

    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (agent) => agent.category === selectedCategory
      );
    }

    if (selectedChain !== "All") {
      filtered = filtered.filter((agent) =>
        agent.chainCompatibility.includes(selectedChain)
      );
    }

    setFilteredAgents(filtered);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-400 mx-auto"></div>
          <p className="mt-4 text-white/70">Loading agents...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <div className="text-red-400 text-lg mb-4">⚠️ {error}</div>
          <button
            onClick={fetchAgents}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Agent Store
        </h1>
        <p className="text-white/70 max-w-2xl mx-auto mb-8">
          Browse our collection of powerful AI agents with live blockchain data
          access. Mint agents as NFTs to unlock premium features and advanced
          capabilities.
        </p>

        {/* Stats */}
        <div className="flex justify-center gap-8 text-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">
              {agents.length}
            </div>
            <div className="text-white/60">Total Agents</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">
              {agents.filter((a) => a.isMinted).length}
            </div>
            <div className="text-white/60">Minted</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">
              {categories.length - 1}
            </div>
            <div className="text-white/60">Categories</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-8 space-y-4">
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">
            Category
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === category
                    ? "bg-purple-600 text-white"
                    : "bg-white/10 text-white/70 hover:bg-white/20"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Chain Filter */}
        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">
            Blockchain
          </label>
          <div className="flex flex-wrap gap-2">
            {chains.map((chain) => (
              <button
                key={chain}
                onClick={() => setSelectedChain(chain)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedChain === chain
                    ? "bg-blue-600 text-white"
                    : "bg-white/10 text-white/70 hover:bg-white/20"
                }`}
              >
                {chain}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mb-6 flex justify-between items-center">
        <p className="text-white/60">
          Showing {filteredAgents.length} of {agents.length} agents
        </p>
        {(selectedCategory !== "All" || selectedChain !== "All") && (
          <button
            onClick={() => {
              setSelectedCategory("All");
              setSelectedChain("All");
            }}
            className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Agents Grid */}
      {filteredAgents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAgents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-white mb-2">
            No agents found
          </h3>
          <p className="text-white/60 mb-4">
            Try adjusting your filters to see more results.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("All");
              setSelectedChain("All");
            }}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
