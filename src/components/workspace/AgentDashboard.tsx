"use client";

import React from "react";
import { motion } from "framer-motion";
import { AgentType } from "@/lib/mindmint-sdk/types";
import { AgentGrid } from "./AgentGrid";
import { QuickStatsBar } from "./QuickStatsBar";
import { ActivityFeed } from "./ActivityFeed";
import { AnalyticsWidgets } from "./AnalyticsWidgets";
import { DashboardActions } from "./DashboardActions";

interface AgentDashboardProps {
  agents: AgentType[];
  onRefresh: () => void;
}

export function AgentDashboard({ agents, onRefresh }: AgentDashboardProps) {
  // Mock data - these would come from real analytics in production
  const mockStats = {
    totalAgents: agents.length,
    mintedAgents: agents.filter((agent) => agent.nft_mint_address).length,
    activeAgents: agents.filter((agent) => agent.status === "active").length,
    portfolioValue: 12450.75,
    rewardsEarned: 89.5,
  };

  const mockActivityData = [
    {
      id: "1",
      type: "mint" as const,
      agent: "Trading Bot Alpha",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      description: "Agent successfully minted as NFT",
    },
    {
      id: "2",
      type: "upgrade" as const,
      agent: "Solana Tracker",
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      description: "Agent upgraded to Pro level",
    },
    {
      id: "3",
      type: "trade" as const,
      agent: "DeFi Analyzer",
      timestamp: new Date(Date.now() - 10800000).toISOString(),
      description: "Executed successful trade: +5.2% return",
    },
    {
      id: "4",
      type: "alert" as const,
      agent: "Market Monitor",
      timestamp: new Date(Date.now() - 14400000).toISOString(),
      description: "Price alert triggered for SOL/USDC",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Dashboard Header */}
      <motion.div
        variants={itemVariants}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold mb-2">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-white">
              Agent Command Center
            </span>
          </h1>
          <p className="text-white/70">
            Manage your AI agents, track performance, and unlock new
            capabilities
          </p>
        </div>
        <DashboardActions onRefresh={onRefresh} />
      </motion.div>

      {/* Quick Stats Bar */}
      <motion.div variants={itemVariants}>
        <QuickStatsBar stats={mockStats} />
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Agents Grid - Takes up 2/3 of the space */}
        <motion.div variants={itemVariants} className="xl:col-span-2">
          <AgentGrid agents={agents} />
        </motion.div>

        {/* Right Sidebar - Activity & Analytics */}
        <motion.div variants={itemVariants} className="space-y-6">
          <ActivityFeed activities={mockActivityData} />
          <AnalyticsWidgets agents={agents} />
        </motion.div>
      </div>
    </motion.div>
  );
}
