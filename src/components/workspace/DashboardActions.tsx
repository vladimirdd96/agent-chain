"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import {
  PlusIcon,
  ArrowPathIcon,
  ShoppingBagIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

interface DashboardActionsProps {
  onRefresh: () => void;
}

export function DashboardActions({ onRefresh }: DashboardActionsProps) {
  return (
    <div className="flex items-center gap-3">
      {/* Refresh Button */}
      <motion.button
        whileHover={{ scale: 1.05, rotate: 180 }}
        whileTap={{ scale: 0.95 }}
        onClick={onRefresh}
        className="p-3 text-white/70 hover:text-white bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 hover:border-purple-500/30 rounded-lg transition-all duration-300"
        title="Refresh Dashboard"
      >
        <ArrowPathIcon className="w-5 h-5" />
      </motion.button>

      {/* Agent Store Button */}
      <Link href="/agent-store">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="hidden sm:flex items-center gap-2 px-4 py-3 text-sm font-medium text-white/80 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 hover:border-blue-500/30 rounded-lg transition-all duration-300"
        >
          <ShoppingBagIcon className="w-4 h-4" />
          <span>Agent Store</span>
        </motion.button>
      </Link>

      {/* Settings Button */}
      <motion.button
        whileHover={{ scale: 1.05, rotate: 90 }}
        whileTap={{ scale: 0.95 }}
        className="p-3 text-white/70 hover:text-white bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 hover:border-gray-500/30 rounded-lg transition-all duration-300"
        title="Dashboard Settings"
      >
        <Cog6ToothIcon className="w-5 h-5" />
      </motion.button>

      {/* Primary CTA - Create Agent */}
      <Link href="/deploy">
        <Button
          variant="primary"
          size="md"
          className="group relative overflow-hidden"
        >
          <PlusIcon className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" />
          Create Agent
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
        </Button>
      </Link>
    </div>
  );
}
