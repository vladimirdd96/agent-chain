"use client";

import React from "react";
import { motion } from "framer-motion";
import { AgentType } from "@/lib/mindmint-sdk/types";
import {
  ChartBarIcon,
  TrophyIcon,
  FireIcon,
  CubeIcon,
} from "@heroicons/react/24/outline";

interface AnalyticsWidgetsProps {
  agents: AgentType[];
}

interface AnalyticsCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
  delay?: number;
}

function AnalyticsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color,
  delay = 0,
}: AnalyticsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay * 0.1 }}
      className="relative overflow-hidden rounded-xl bg-gradient-to-br from-black/60 via-purple-900/20 to-black/60 backdrop-blur-md border border-white/10 p-4 hover:border-purple-500/30 transition-all duration-300 group"
      whileHover={{ scale: 1.02, y: -2 }}
    >
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div className={`p-2 rounded-lg ${color}`}>
            <Icon className="w-4 h-4" />
          </div>
          <motion.div
            className="w-1 h-1 bg-purple-400/60 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: delay * 0.2,
            }}
          />
        </div>

        <div>
          <h4 className="text-sm font-medium text-white/80 mb-1">{title}</h4>
          <p className="text-xl font-bold text-white mb-1">{value}</p>
          <p className="text-xs text-white/60">{subtitle}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function AnalyticsWidgets({ agents }: AnalyticsWidgetsProps) {
  // Calculate analytics from agents data
  const totalAgents = agents.length;
  const activeAgents = agents.filter(
    (agent) => agent.status === "active"
  ).length;
  const mostActiveAgent = agents.length > 0 ? agents[0]?.name || "N/A" : "N/A";
  const averageUptime =
    activeAgents > 0 ? Math.round((activeAgents / totalAgents) * 100) : 0;

  const analyticsData = [
    {
      title: "Performance",
      value: `${averageUptime}%`,
      subtitle: "Average uptime",
      icon: ChartBarIcon,
      color: "bg-blue-500/20 text-blue-400",
      delay: 0,
    },
    {
      title: "Top Performer",
      value:
        mostActiveAgent.length > 15
          ? `${mostActiveAgent.slice(0, 12)}...`
          : mostActiveAgent,
      subtitle: "Most active agent",
      icon: TrophyIcon,
      color: "bg-yellow-500/20 text-yellow-400",
      delay: 1,
    },
    {
      title: "Activity Score",
      value: Math.min(activeAgents * 25, 100),
      subtitle: "Based on agent activity",
      icon: FireIcon,
      color: "bg-red-500/20 text-red-400",
      delay: 2,
    },
  ];

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20">
          <ChartBarIcon className="w-5 h-5 text-purple-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Analytics</h3>
          <p className="text-sm text-white/70">Performance insights</p>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="space-y-3">
        {analyticsData.map((metric, index) => (
          <AnalyticsCard
            key={metric.title}
            title={metric.title}
            value={metric.value}
            subtitle={metric.subtitle}
            icon={metric.icon}
            color={metric.color}
            delay={metric.delay}
          />
        ))}
      </div>

      {/* Additional Insights Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-6 p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20"
      >
        <div className="flex items-center gap-2 mb-3">
          <CubeIcon className="w-4 h-4 text-purple-400" />
          <h4 className="text-sm font-medium text-white">Quick Stats</h4>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-white/70">Active Agents</span>
            <span className="text-xs font-medium text-white">
              {activeAgents}/{totalAgents}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-white/70">Success Rate</span>
            <span className="text-xs font-medium text-green-400">
              {totalAgents > 0
                ? Math.round((activeAgents / totalAgents) * 100)
                : 0}
              %
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-white/70">Network Coverage</span>
            <span className="text-xs font-medium text-blue-400">
              {Array.from(new Set(agents.map((a) => a.type))).length} chain
              {Array.from(new Set(agents.map((a) => a.type))).length !== 1
                ? "s"
                : ""}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Action Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full mt-4 py-2 px-4 text-sm font-medium text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 hover:border-blue-500/40 rounded-lg transition-all duration-300"
      >
        View Detailed Analytics
      </motion.button>
    </div>
  );
}
