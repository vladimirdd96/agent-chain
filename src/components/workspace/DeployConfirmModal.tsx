"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { AgentType } from "@/lib/mindmint-sdk/types";
import {
  XMarkIcon,
  GlobeAltIcon,
  CurrencyDollarIcon,
  UsersIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

interface DeployConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  agent: AgentType;
  isLoading?: boolean;
}

export function DeployConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  agent,
  isLoading = false,
}: DeployConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-gradient-to-b from-gray-900/95 to-black/95 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Deploy to Store</h2>
            <button
              onClick={onClose}
              disabled={isLoading}
              className="p-2 text-white/60 hover:text-white/80 transition-colors disabled:opacity-50"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Agent Info */}
          <div className="mb-6 p-4 bg-white/5 rounded-xl border border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg flex items-center justify-center">
                <SparklesIcon className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white">{agent.name}</h3>
                <p className="text-sm text-white/70 capitalize">
                  {agent.type} Agent
                </p>
              </div>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              {agent.description}
            </p>
          </div>

          {/* What happens */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-white mb-3">
              What happens when you deploy:
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <GlobeAltIcon className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span className="text-white/70">
                  Your agent becomes available in the public store
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <UsersIcon className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span className="text-white/70">
                  Other users can discover and mint your agent
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <CurrencyDollarIcon className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                <span className="text-white/70">
                  Set at 0.1 ETH (can be updated later)
                </span>
              </div>
            </div>
          </div>

          {/* Note */}
          <div className="mb-6 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <p className="text-xs text-blue-300">
              <strong>Note:</strong> You'll retain full ownership of your
              original agent. This creates a separate store listing for others
              to mint.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              variant="secondary"
              size="sm"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={onConfirm}
              disabled={isLoading}
              className="flex-1"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Deploying...
                </>
              ) : (
                <>
                  <GlobeAltIcon className="w-4 h-4 mr-2" />
                  Deploy Now
                </>
              )}
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
