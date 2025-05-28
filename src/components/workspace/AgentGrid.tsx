"use client";

import React from "react";
import { motion } from "framer-motion";
import { AgentType } from "@/lib/mindmint-sdk/types";
import { EnhancedAgentCard } from "./EnhancedAgentCard";
import { CubeIcon } from "@heroicons/react/24/outline";

interface AgentGridProps {
  agents: AgentType[];
}

export function AgentGrid({ agents }: AgentGridProps) {
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
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20">
            <CubeIcon className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">My Agents</h2>
            <p className="text-sm text-white/70">
              {agents.length} agent{agents.length !== 1 ? "s" : ""} in your
              collection
            </p>
          </div>
        </div>

        {/* View Toggle - Future feature */}
        <div className="flex items-center gap-2 p-1 bg-black/30 rounded-lg border border-white/10">
          <button className="p-2 text-purple-400 bg-purple-500/20 rounded-md">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
            </svg>
          </button>
          <button className="p-2 text-white/50 hover:text-white transition-colors">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 10h16M4 14h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Agents Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {agents.map((agent, index) => (
          <motion.div key={agent.id} variants={itemVariants}>
            <EnhancedAgentCard agent={agent} />
          </motion.div>
        ))}
      </motion.div>

      {/* Empty State Hint */}
      {agents.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 flex items-center justify-center">
            <CubeIcon className="w-8 h-8 text-purple-400" />
          </div>
          <h3 className="text-lg font-medium text-white mb-2">No agents yet</h3>
          <p className="text-white/70 mb-4">
            Create your first AI agent to get started
          </p>
        </motion.div>
      )}
    </div>
  );
}
