"use client";

import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { motion } from "framer-motion";
import {
  XMarkIcon,
  CheckBadgeIcon,
  CurrencyDollarIcon,
  LinkIcon,
  DocumentTextIcon,
  UserGroupIcon,
  ChartBarIcon,
  ClipboardDocumentIcon,
} from "@heroicons/react/24/outline";
import { MCPService } from "@/types/mcp";

interface MCPServiceModalProps {
  service: MCPService | null;
  isOpen: boolean;
  onClose: () => void;
}

const MCPServiceModal: React.FC<MCPServiceModalProps> = ({
  service,
  isOpen,
  onClose,
}) => {
  if (!service) return null;

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  const handleIntegrate = () => {
    // Here you would implement the integration logic
    console.log("Integrating service:", service.id);
    // Could open another modal or redirect to integration page
  };

  const copyEndpoint = () => {
    navigator.clipboard.writeText(service.endpoint);
    // Could show a toast notification here
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-black/90 backdrop-blur-md border border-white/20 p-0 text-left align-middle shadow-xl transition-all">
                <div className="relative">
                  {/* Close Button */}
                  <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white/70 hover:text-white transition-all duration-300"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>

                  {/* Header */}
                  <div className="relative p-8 bg-gradient-to-br from-purple-500/20 via-black/50 to-blue-500/20">
                    <div className="flex items-start gap-6">
                      <div className="text-6xl">{service.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h2 className="text-3xl font-bold text-white">
                            {service.name}
                          </h2>
                          {service.isVerified && (
                            <CheckBadgeIcon className="w-6 h-6 text-green-400" />
                          )}
                        </div>
                        <div className="flex items-center gap-4 mb-4">
                          <span className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-sm text-white/70">
                            {service.category}
                          </span>
                          <div className="flex items-center gap-1 text-white">
                            {service.price > 0 ? (
                              <>
                                <CurrencyDollarIcon className="w-4 h-4" />
                                <span className="font-semibold">
                                  {service.price} ETH
                                </span>
                              </>
                            ) : (
                              <span className="text-green-400 font-semibold">
                                Free
                              </span>
                            )}
                          </div>
                          {service.isPremium && (
                            <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded-full border border-yellow-500/30">
                              Premium
                            </span>
                          )}
                        </div>

                        {/* Usage Stats */}
                        <div className="grid grid-cols-3 gap-6">
                          <div className="text-center">
                            <div className="flex items-center justify-center gap-2 mb-1">
                              <ChartBarIcon className="w-4 h-4 text-white/60" />
                              <span className="text-lg font-bold text-white">
                                {formatNumber(service.usageStats.totalCalls)}
                              </span>
                            </div>
                            <span className="text-sm text-white/60">
                              Total Calls
                            </span>
                          </div>
                          <div className="text-center">
                            <div className="flex items-center justify-center gap-2 mb-1">
                              <UserGroupIcon className="w-4 h-4 text-white/60" />
                              <span className="text-lg font-bold text-white">
                                {service.usageStats.activeAgents}
                              </span>
                            </div>
                            <span className="text-sm text-white/60">
                              Active Agents
                            </span>
                          </div>
                          <div className="text-center">
                            <div className="flex items-center justify-center gap-2 mb-1">
                              <div className="w-4 h-4 flex items-center justify-center">
                                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                              </div>
                              <span className="text-lg font-bold text-white">
                                {service.usageStats.successRate}%
                              </span>
                            </div>
                            <span className="text-sm text-white/60">
                              Success Rate
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 space-y-8">
                    {/* Description */}
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-4">
                        Description
                      </h3>
                      <p className="text-white/80 leading-relaxed">
                        {service.fullDescription || service.description}
                      </p>
                    </div>

                    {/* Features & Capabilities */}
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-4">
                          Key Features
                        </h4>
                        <div className="space-y-2">
                          {service.features.map((feature, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2"
                            >
                              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                              <span className="text-white/80">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-white mb-4">
                          Integration Modes
                        </h4>
                        <div className="space-y-3">
                          {service.integrationModes.map((mode, index) => (
                            <div
                              key={index}
                              className="p-3 bg-white/5 border border-white/10 rounded-lg"
                            >
                              <div className="flex items-center gap-2 mb-1">
                                <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded border border-blue-500/30">
                                  {mode.type}
                                </span>
                              </div>
                              <p className="text-sm text-white/70">
                                {mode.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Supported Chains */}
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4">
                        Supported Chains
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {service.supportedChains.map((chain) => (
                          <span
                            key={chain}
                            className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white/80"
                          >
                            {chain}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* API Endpoint */}
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4">
                        API Endpoint
                      </h4>
                      <div className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-lg">
                        <code className="flex-1 text-green-400 font-mono text-sm">
                          {service.endpoint}
                        </code>
                        <button
                          onClick={copyEndpoint}
                          className="p-2 bg-white/10 hover:bg-white/20 rounded-md text-white/70 hover:text-white transition-all duration-300"
                        >
                          <ClipboardDocumentIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Owner Info */}
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4">
                        Published by
                      </h4>
                      <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-lg">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold">
                            {service.owner.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="text-white font-medium">
                            {service.owner.name}
                          </div>
                          <div className="text-white/60 text-sm font-mono">
                            {service.owner.wallet.slice(0, 8)}...
                            {service.owner.wallet.slice(-6)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer Actions */}
                  <div className="p-8 bg-white/5 border-t border-white/10">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <motion.button
                        onClick={handleIntegrate}
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-xl text-white font-medium transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <LinkIcon className="w-5 h-5" />
                        Integrate with My Agent
                      </motion.button>

                      {service.apiDocumentation && (
                        <motion.a
                          href={service.apiDocumentation}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 rounded-xl text-white/80 hover:text-white font-medium transition-all duration-300"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <DocumentTextIcon className="w-5 h-5" />
                          View Documentation
                        </motion.a>
                      )}
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default MCPServiceModal;
