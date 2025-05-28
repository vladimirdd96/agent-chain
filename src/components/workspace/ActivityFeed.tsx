"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  SparklesIcon,
  ArrowTrendingUpIcon,
  BellAlertIcon,
  CogIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

interface Activity {
  id: string;
  type: "mint" | "upgrade" | "trade" | "alert" | "deploy";
  agent: string;
  timestamp: string;
  description: string;
}

interface ActivityFeedProps {
  activities: Activity[];
}

function ActivityItem({
  activity,
  index,
}: {
  activity: Activity;
  index: number;
}) {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "mint":
        return SparklesIcon;
      case "upgrade":
        return CogIcon;
      case "trade":
        return ArrowTrendingUpIcon;
      case "alert":
        return BellAlertIcon;
      default:
        return ClockIcon;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case "mint":
        return "text-purple-400 bg-purple-500/20 border-purple-500/30";
      case "upgrade":
        return "text-blue-400 bg-blue-500/20 border-blue-500/30";
      case "trade":
        return "text-green-400 bg-green-500/20 border-green-500/30";
      case "alert":
        return "text-yellow-400 bg-yellow-500/20 border-yellow-500/30";
      default:
        return "text-white/70 bg-white/10 border-white/20";
    }
  };

  const ActivityIcon = getActivityIcon(activity.type);
  const colorClass = getActivityColor(activity.type);

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInHours = Math.floor(
      (now.getTime() - activityTime.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-purple-500/30 transition-all duration-300"
    >
      {/* Activity Icon */}
      <div className={`flex-shrink-0 p-2 rounded-lg border ${colorClass}`}>
        <ActivityIcon className="w-4 h-4" />
      </div>

      {/* Activity Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-sm font-medium text-white mb-1">
              {activity.agent}
            </p>
            <p className="text-xs text-white/70 leading-relaxed">
              {activity.description}
            </p>
          </div>
          <span className="text-xs text-white/50 whitespace-nowrap">
            {formatTimeAgo(activity.timestamp)}
          </span>
        </div>
      </div>

      {/* Hover effect line */}
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20">
          <ClockIcon className="w-5 h-5 text-purple-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
          <p className="text-sm text-white/70">Latest agent updates</p>
        </div>
      </div>

      {/* Activity List */}
      <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
        {activities.length > 0 ? (
          activities.map((activity, index) => (
            <ActivityItem key={activity.id} activity={activity} index={index} />
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-8"
          >
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 flex items-center justify-center">
              <ClockIcon className="w-6 h-6 text-purple-400" />
            </div>
            <p className="text-white/70 text-sm">No recent activity</p>
            <p className="text-white/50 text-xs mt-1">
              Agent activities will appear here
            </p>
          </motion.div>
        )}
      </div>

      {/* View All Link */}
      {activities.length > 0 && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full mt-4 py-2 px-4 text-sm font-medium text-purple-400 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 hover:border-purple-500/40 rounded-lg transition-all duration-300"
        >
          View All Activity
        </motion.button>
      )}
    </div>
  );
}
