"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useMindMint } from "@/hooks/useMindMint";
import {
  SparklesIcon,
  RocketLaunchIcon,
  FunnelIcon,
  CpuChipIcon,
  ChartBarIcon,
  LockClosedIcon,
  PlayIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/Button";
import ToolModal from "@/components/tools/ToolModal";
import AnimatedToolIcon from "@/components/tools/AnimatedToolIcon";

interface Tool {
  name: string;
  description: string;
  capabilities: Array<{
    name: string;
    description: string;
    parameters: Record<string, string>;
  }>;
}

interface ToolCardData {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  tags: string[];
  chains: string[];
  isPremium: boolean;
  capabilities: Array<{
    name: string;
    description: string;
    parameters: Record<string, string>;
  }>;
}

// Enhanced tool data with proper categorization
const getEnhancedToolData = (tools: Record<string, Tool>): ToolCardData[] => {
  return Object.entries(tools).map(([key, tool]) => {
    switch (key) {
      case "ai-analyst":
        return {
          id: key,
          name: tool.name,
          description: tool.description,
          icon: "🧠",
          category: "Analytics",
          tags: ["AI", "Prediction", "Sentiment", "Risk Analysis"],
          chains: ["Multi-chain"],
          isPremium: true,
          capabilities: tool.capabilities,
        };
      case "trading-api":
        return {
          id: key,
          name: tool.name,
          description: tool.description,
          icon: "⚡",
          category: "Trading",
          tags: ["DEX", "Arbitrage", "Order Routing", "Position Management"],
          chains: ["Ethereum", "BSC", "Polygon", "Arbitrum"],
          isPremium: true,
          capabilities: tool.capabilities,
        };
      case "research-engine":
        return {
          id: key,
          name: tool.name,
          description: tool.description,
          icon: "🔍",
          category: "Research",
          tags: ["Token Analysis", "Audit", "Whale Tracking", "Social Intel"],
          chains: ["Multi-chain"],
          isPremium: false,
          capabilities: tool.capabilities,
        };
      case "search-indexer":
        return {
          id: key,
          name: tool.name,
          description: tool.description,
          icon: "🗂️",
          category: "Research",
          tags: ["Indexing", "Search", "Transactions", "Cross-Chain"],
          chains: ["Multi-chain"],
          isPremium: false,
          capabilities: tool.capabilities,
        };
      case "defi-toolkit":
        return {
          id: key,
          name: tool.name,
          description: tool.description,
          icon: "🏦",
          category: "DeFi",
          tags: ["Yield", "Liquidity", "Protocol", "Flash Loans"],
          chains: ["Ethereum", "BSC", "Polygon"],
          isPremium: true,
          capabilities: tool.capabilities,
        };
      case "nft-analytics":
        return {
          id: key,
          name: tool.name,
          description: tool.description,
          icon: "🎨",
          category: "NFT",
          tags: ["Collections", "Rarity", "Floor Price", "Mint Tracking"],
          chains: ["Ethereum", "Solana", "Polygon"],
          isPremium: false,
          capabilities: tool.capabilities,
        };
      case "solana-agent":
        return {
          id: key,
          name: tool.name,
          description: tool.description,
          icon: "◉",
          category: "Analytics",
          tags: ["Token Data", "Wallet Analysis", "NFT Operations"],
          chains: ["Solana"],
          isPremium: false,
          capabilities: tool.capabilities,
        };
      case "evm-agent":
        return {
          id: key,
          name: tool.name,
          description: tool.description,
          icon: "⟠",
          category: "Analytics",
          tags: ["Token Analytics", "Wallet Insights"],
          chains: ["Ethereum", "BSC", "Polygon"],
          isPremium: false,
          capabilities: tool.capabilities,
        };
      case "trade-bot":
        return {
          id: key,
          name: tool.name,
          description: tool.description,
          icon: "🤖",
          category: "Trading",
          tags: ["Market Analysis", "Trade Execution", "Portfolio"],
          chains: ["Multi-chain"],
          isPremium: true,
          capabilities: tool.capabilities,
        };
      case "blockchain-agent":
        return {
          id: key,
          name: tool.name,
          description: tool.description,
          icon: "🔗",
          category: "Research",
          tags: ["Cross-Chain", "Smart Contracts", "Monitoring"],
          chains: ["Multi-chain"],
          isPremium: false,
          capabilities: tool.capabilities,
        };
      default:
        return {
          id: key,
          name: tool.name,
          description: tool.description,
          icon: "🤖",
          category: "Generalist",
          tags: ["General"],
          chains: ["Multi-chain"],
          isPremium: false,
          capabilities: tool.capabilities,
        };
    }
  });
};

const categories = [
  "All",
  "Analytics",
  "Trading",
  "Research",
  "DeFi",
  "NFT",
  "Generalist",
];
const chainFilters = [
  "All Chains",
  "Solana",
  "Ethereum",
  "BSC",
  "Polygon",
  "Arbitrum",
  "Multi-chain",
];

export default function ToolsPage() {
  const client = useMindMint();
  const [tools, setTools] = useState<Record<string, Tool>>({});
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedChain, setSelectedChain] = useState("All Chains");
  const [searchQuery, setSearchQuery] = useState("");
  const [toolModalOpen, setToolModalOpen] = useState(false);
  const [selectedTool, setSelectedTool] = useState<ToolCardData | null>(null);

  useEffect(() => {
    loadTools();
  }, []);

  const loadTools = async () => {
    try {
      const data = await client.getTools();
      setTools(data);
    } catch (error) {
      console.error("Failed to load tools:", error);
    } finally {
      setLoading(false);
    }
  };

  const enhancedTools = getEnhancedToolData(tools);

  const filteredTools = enhancedTools.filter((tool) => {
    const matchesCategory =
      selectedCategory === "All" || tool.category === selectedCategory;
    const matchesChain =
      selectedChain === "All Chains" ||
      tool.chains.includes(selectedChain) ||
      (selectedChain === "Multi-chain" && tool.chains.includes("Multi-chain"));
    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return matchesCategory && matchesChain && matchesSearch;
  });

  const handleTryTool = (tool: ToolCardData) => {
    setSelectedTool(tool);
    setToolModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 animate-aurora blur-3xl" />
          <div className="absolute inset-0 bg-gradient-to-tl from-blue-500/10 to-cyan-500/10 animate-aurora2 blur-3xl" />
        </div>

        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-6xl mx-auto mt-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-black/50 backdrop-blur-md border border-white/10 rounded-xl p-8 h-80 animate-pulse"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 animate-aurora blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-tl from-blue-500/10 to-cyan-500/10 animate-aurora2 blur-3xl" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 mt-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 px-4 py-2 text-sm text-purple-300 ring-1 ring-inset ring-purple-500/20 backdrop-blur-sm">
              <SparklesIcon className="w-4 h-4" />
              Powered by AgentChain AI
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-white">
              Explore
            </span>{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400">
              AI Tools
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed max-w-3xl mx-auto"
          >
            Powerful blockchain tools at your fingertips—unlocked by AgentChain
            AI agents.
            <span className="block mt-2 text-lg text-purple-300">
              Discover, filter, and launch the perfect tool for your needs.
            </span>
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-3 gap-8 max-w-md mx-auto"
          >
            {[
              { label: "Available Tools", value: "10" },
              { label: "Supported Chains", value: "6+" },
              { label: "Categories", value: "6" },
            ].map((stat, index) => (
              <div key={stat.label} className="text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="text-2xl font-bold text-white mb-1"
                >
                  {stat.value}
                </motion.div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Filters Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="max-w-6xl mx-auto mb-12"
        >
          <div className="bg-black/50 backdrop-blur-md border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <FunnelIcon className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg font-semibold text-white">Filter Tools</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Search */}
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Search
                </label>
                <input
                  type="text"
                  placeholder="Search tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50"
                />
              </div>

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
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                        selectedCategory === category
                          ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
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
                  Chain
                </label>
                <div className="flex flex-wrap gap-2">
                  {chainFilters.map((chain) => (
                    <button
                      key={chain}
                      onClick={() => setSelectedChain(chain)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                        selectedChain === chain
                          ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                          : "bg-white/10 text-white/70 hover:bg-white/20"
                      }`}
                    >
                      {chain}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tools Grid */}
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedCategory}-${selectedChain}-${searchQuery}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredTools.map((tool, index) => (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-xl bg-black/50 backdrop-blur-md border border-white/10 transition-all hover:border-white/20 hover:bg-black/60"
                  whileHover={{ y: -5 }}
                >
                  {/* Tool Card Content */}
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <AnimatedToolIcon
                          icon={tool.icon}
                          category={tool.category}
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-1">
                            {tool.name}
                          </h3>
                          <span className="px-2 py-1 text-xs rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                            {tool.category}
                          </span>
                        </div>
                      </div>
                      {tool.isPremium && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2 }}
                          className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-full"
                        >
                          <LockClosedIcon className="w-3 h-3 text-yellow-400" />
                          <span className="text-xs text-yellow-400 font-medium">
                            Premium
                          </span>
                        </motion.div>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-white/70 text-sm mb-4 line-clamp-3">
                      {tool.description}
                    </p>

                    {/* Tags */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {tool.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs rounded bg-white/10 text-white/60"
                          >
                            {tag}
                          </span>
                        ))}
                        {tool.tags.length > 3 && (
                          <span className="px-2 py-1 text-xs rounded bg-white/10 text-white/60">
                            +{tool.tags.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Supported Chains */}
                    <div className="mb-4">
                      <p className="text-xs text-white/50 mb-2">
                        Supported Chains:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {tool.chains.map((chain) => (
                          <span
                            key={chain}
                            className="px-2 py-1 text-xs rounded bg-blue-500/20 text-blue-300 border border-blue-500/30"
                          >
                            {chain}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Capabilities Count */}
                    <div className="mb-6">
                      <div className="flex items-center gap-2 text-xs text-white/50">
                        <CpuChipIcon className="w-4 h-4" />
                        <span>
                          {tool.capabilities.length} capabilities available
                        </span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleTryTool(tool)}
                        className="w-full"
                      >
                        <PlayIcon className="w-4 h-4 mr-2" />
                        {tool.isPremium ? "Try Premium" : "Try Tool"}
                      </Button>
                    </motion.div>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* No Results */}
          {filteredTools.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                No tools found
              </h3>
              <p className="text-white/70">
                Try adjusting your filters or search query.
              </p>
            </motion.div>
          )}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="max-w-4xl mx-auto mt-16 text-center"
        >
          <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 backdrop-blur-md border border-white/10 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to build your own AI agent?
            </h3>
            <p className="text-white/70 mb-6">
              Deploy custom AI agents with these powerful tools and more.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/deploy">
                <Button variant="primary" size="lg">
                  <RocketLaunchIcon className="w-5 h-5 mr-2" />
                  Deploy Agent
                </Button>
              </Link>
              <Link href="/agent-store">
                <Button variant="outline" size="lg">
                  View Agent Store
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tool Modal */}
      {toolModalOpen && selectedTool && (
        <ToolModal
          isOpen={toolModalOpen}
          onClose={() => setToolModalOpen(false)}
          tool={selectedTool}
        />
      )}
    </div>
  );
}
