"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  XMarkIcon,
  PlayIcon,
  CodeBracketIcon,
  CpuChipIcon,
  LockClosedIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/Button";

interface ToolCapability {
  name: string;
  description: string;
  parameters: Record<string, string>;
}

interface ToolModalProps {
  isOpen: boolean;
  onClose: () => void;
  tool: {
    id: string;
    name: string;
    description: string;
    icon: string;
    category: string;
    tags: string[];
    chains: string[];
    isPremium: boolean;
    capabilities: ToolCapability[];
  } | null;
}

const ToolModal: React.FC<ToolModalProps> = ({ isOpen, onClose, tool }) => {
  const [selectedCapability, setSelectedCapability] =
    useState<ToolCapability | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);

  if (!tool) return null;

  const handleExecuteCapability = async (capability: ToolCapability) => {
    setIsExecuting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsExecuting(false);
    // In a real app, this would call the actual tool API
    console.log(`Executed capability: ${capability.name}`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden bg-black/90 backdrop-blur-md border border-white/20 rounded-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-4">
                <motion.div
                  className="text-4xl"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {tool.icon}
                </motion.div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{tool.name}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-2 py-1 text-xs rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      {tool.category}
                    </span>
                    {tool.isPremium && (
                      <div className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-full">
                        <LockClosedIcon className="w-3 h-3 text-yellow-400" />
                        <span className="text-xs text-yellow-400 font-medium">
                          Premium
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Description
                </h3>
                <p className="text-white/70">{tool.description}</p>
              </div>

              {/* Tags and Chains */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {tool.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-sm rounded-full bg-white/10 text-white/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Supported Chains
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {tool.chains.map((chain) => (
                      <span
                        key={chain}
                        className="px-3 py-1 text-sm rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30"
                      >
                        {chain}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Capabilities */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <CpuChipIcon className="w-5 h-5 text-purple-400" />
                  <h3 className="text-lg font-semibold text-white">
                    Capabilities
                  </h3>
                  <span className="px-2 py-1 text-xs rounded-full bg-purple-500/20 text-purple-300">
                    {tool.capabilities.length} available
                  </span>
                </div>

                <div className="grid gap-4">
                  {tool.capabilities.map((capability, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`bg-white/5 border rounded-lg p-4 cursor-pointer transition-all ${
                        selectedCapability === capability
                          ? "border-purple-500/50 bg-purple-500/10"
                          : "border-white/10 hover:border-white/20 hover:bg-white/5"
                      }`}
                      onClick={() => setSelectedCapability(capability)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-white font-medium">
                          {capability.name}
                        </h4>
                        {selectedCapability === capability && (
                          <CheckCircleIcon className="w-5 h-5 text-purple-400" />
                        )}
                      </div>
                      <p className="text-white/70 text-sm mb-3">
                        {capability.description}
                      </p>

                      {Object.keys(capability.parameters).length > 0 && (
                        <div className="border-t border-white/10 pt-3">
                          <div className="flex items-center gap-2 mb-2">
                            <CodeBracketIcon className="w-4 h-4 text-white/50" />
                            <span className="text-white/50 text-xs">
                              Parameters:
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            {Object.entries(capability.parameters).map(
                              ([name, type]) => (
                                <code
                                  key={name}
                                  className="text-xs px-2 py-1 bg-black/30 text-purple-300 rounded"
                                >
                                  {name}: {type}
                                </code>
                              )
                            )}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Execute Button */}
              {selectedCapability && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-4"
                >
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => handleExecuteCapability(selectedCapability)}
                    isLoading={isExecuting}
                    disabled={tool.isPremium} // Disable for premium tools in demo
                    className="flex-1"
                  >
                    <PlayIcon className="w-5 h-5 mr-2" />
                    {isExecuting
                      ? "Executing..."
                      : `Execute ${selectedCapability.name}`}
                  </Button>
                  {tool.isPremium && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                      <LockClosedIcon className="w-4 h-4 text-yellow-400" />
                      <span className="text-yellow-400 text-sm">
                        Requires minted agent
                      </span>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ToolModal;
