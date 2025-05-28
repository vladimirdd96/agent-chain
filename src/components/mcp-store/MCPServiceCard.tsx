"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  CheckBadgeIcon,
  CurrencyDollarIcon,
  LinkIcon,
  UserGroupIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import { MCPService } from "@/types/mcp";

interface MCPServiceCardProps {
  service: MCPService;
  onClick: () => void;
}

const MCPServiceCard: React.FC<MCPServiceCardProps> = ({
  service,
  onClick,
}) => {
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  const getCategoryColor = (category: string): string => {
    const colors: Record<string, string> = {
      Analytics: "from-blue-500/20 to-cyan-500/20 border-blue-500/30",
      "Data Feed": "from-green-500/20 to-emerald-500/20 border-green-500/30",
      DeFi: "from-purple-500/20 to-pink-500/20 border-purple-500/30",
      NFT: "from-orange-500/20 to-red-500/20 border-orange-500/30",
      Trading: "from-yellow-500/20 to-amber-500/20 border-yellow-500/30",
      Research: "from-indigo-500/20 to-blue-500/20 border-indigo-500/30",
      "AI/ML": "from-pink-500/20 to-rose-500/20 border-pink-500/30",
      Social: "from-cyan-500/20 to-teal-500/20 border-cyan-500/30",
      Infrastructure: "from-gray-500/20 to-slate-500/20 border-gray-500/30",
      Security: "from-red-500/20 to-rose-500/20 border-red-500/30",
    };
    return colors[category] || "from-white/10 to-white/5 border-white/20";
  };

  return (
    <motion.div
      onClick={onClick}
      className="group relative overflow-hidden rounded-2xl bg-black/50 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      layout
    >
      {/* Header with Category Gradient */}
      <div
        className={`relative p-6 bg-gradient-to-br ${getCategoryColor(
          service.category
        )}`}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="text-3xl">{service.icon}</div>
            <div>
              <h3 className="text-lg font-bold text-white group-hover:text-white/90 transition-colors">
                {service.name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="px-2 py-1 text-xs rounded-full bg-white/10 text-white/70 border border-white/20">
                  {service.category}
                </span>
                {service.isVerified && (
                  <CheckBadgeIcon className="w-4 h-4 text-green-400" />
                )}
              </div>
            </div>
          </div>

          {/* Price */}
          <div className="text-right">
            <div className="flex items-center gap-1 text-white font-semibold">
              {service.price > 0 ? (
                <>
                  <CurrencyDollarIcon className="w-4 h-4" />
                  {service.price} ETH
                </>
              ) : (
                <span className="text-green-400 font-medium">Free</span>
              )}
            </div>
            {service.isPremium && (
              <span className="text-xs text-yellow-400">Premium</span>
            )}
          </div>
        </div>

        {/* Usage Stats */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="flex flex-col items-center">
            <ChartBarIcon className="w-4 h-4 text-white/60 mb-1" />
            <span className="text-xs text-white/60">
              {formatNumber(service.usageStats.totalCalls)} calls
            </span>
          </div>
          <div className="flex flex-col items-center">
            <UserGroupIcon className="w-4 h-4 text-white/60 mb-1" />
            <span className="text-xs text-white/60">
              {service.usageStats.activeAgents} agents
            </span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-4 h-4 flex items-center justify-center mb-1">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            </div>
            <span className="text-xs text-white/60">
              {service.usageStats.successRate}% uptime
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-sm text-white/70 mb-4 line-clamp-2 leading-relaxed">
          {service.description}
        </p>

        {/* Supported Chains */}
        <div className="mb-4">
          <p className="text-xs text-white/50 mb-2">Supported Chains:</p>
          <div className="flex flex-wrap gap-1">
            {service.supportedChains.slice(0, 3).map((chain) => (
              <span
                key={chain}
                className="px-2 py-1 text-xs rounded-md bg-white/10 text-white/60 border border-white/10"
              >
                {chain}
              </span>
            ))}
            {service.supportedChains.length > 3 && (
              <span className="px-2 py-1 text-xs rounded-md bg-white/10 text-white/60 border border-white/10">
                +{service.supportedChains.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Features */}
        <div className="mb-4">
          <p className="text-xs text-white/50 mb-2">Key Features:</p>
          <div className="flex flex-wrap gap-1">
            {service.features.slice(0, 2).map((feature) => (
              <span
                key={feature}
                className="px-2 py-1 text-xs rounded-md bg-purple-500/10 text-purple-300 border border-purple-500/20"
              >
                {feature}
              </span>
            ))}
            {service.features.length > 2 && (
              <span className="px-2 py-1 text-xs rounded-md bg-purple-500/10 text-purple-300 border border-purple-500/20">
                +{service.features.length - 2} more
              </span>
            )}
          </div>
        </div>

        {/* Integration Modes */}
        <div className="mb-6">
          <p className="text-xs text-white/50 mb-2">Integration:</p>
          <div className="flex gap-1">
            {service.integrationModes.slice(0, 2).map((mode) => (
              <span
                key={mode.type}
                className="px-2 py-1 text-xs rounded-md bg-blue-500/10 text-blue-300 border border-blue-500/20"
              >
                {mode.type}
              </span>
            ))}
            {service.integrationModes.length > 2 && (
              <span className="px-2 py-1 text-xs rounded-md bg-blue-500/10 text-blue-300 border border-blue-500/20">
                +{service.integrationModes.length - 2}
              </span>
            )}
          </div>
        </div>

        {/* Action Button */}
        <motion.button
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 border border-purple-500/30 hover:border-purple-400/50 rounded-xl text-purple-300 hover:text-purple-200 text-sm font-medium transition-all duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <LinkIcon className="w-4 h-4" />
          View Details
        </motion.button>
      </div>

      {/* Owner Badge */}
      <div className="absolute top-4 right-4">
        <div className="flex items-center gap-1 px-2 py-1 bg-black/30 backdrop-blur-sm rounded-full text-xs text-white/60">
          <div className="w-2 h-2 bg-white/40 rounded-full"></div>
          {service.owner.name}
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-pink-500/0 to-blue-500/0 group-hover:from-purple-500/5 group-hover:via-pink-500/5 group-hover:to-blue-500/5 transition-all duration-300 rounded-2xl" />
    </motion.div>
  );
};

export default MCPServiceCard;
