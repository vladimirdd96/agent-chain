"use client";

import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { motion } from "framer-motion";
import {
  XMarkIcon,
  PlusIcon,
  TrashIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import {
  MCPService,
  CreateMCPServiceRequest,
  MCPCategory,
  IntegrationMode,
} from "@/types/mcp";
import MCPServiceAPI from "@/services/mcpService";

interface PublishServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (service: MCPService) => void;
}

const PublishServiceModal: React.FC<PublishServiceModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [formData, setFormData] = useState<CreateMCPServiceRequest>({
    name: "",
    description: "",
    fullDescription: "",
    icon: "🔗",
    category: "Data Feed" as MCPCategory,
    supportedChains: [],
    features: [],
    integrationModes: [],
    endpoint: "",
    apiDocumentation: "",
    isPublic: true,
    price: 0,
    isPremium: false,
  });

  const [newChain, setNewChain] = useState("");
  const [newFeature, setNewFeature] = useState("");
  const [newIntegrationMode, setNewIntegrationMode] = useState<IntegrationMode>(
    {
      type: "HTTP",
      description: "",
    }
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const categories: MCPCategory[] = [
    "Analytics",
    "Data Feed",
    "DeFi",
    "NFT",
    "Trading",
    "Research",
    "AI/ML",
    "Social",
    "Infrastructure",
    "Security",
  ];

  const integrationTypes = ["HTTP", "WebSocket", "STDIO", "SSE"] as const;

  const iconOptions = [
    "🔗",
    "📊",
    "💰",
    "🎨",
    "📈",
    "🔬",
    "🧠",
    "👥",
    "🏗️",
    "🔒",
    "⚡",
    "🌐",
    "📡",
    "🔮",
    "🦄",
    "🌊",
    "🦙",
    "🐋",
    "🚀",
    "⭐",
  ];

  const commonChains = [
    "Ethereum",
    "Polygon",
    "Binance Smart Chain",
    "Avalanche",
    "Arbitrum",
    "Optimism",
    "Solana",
    "Fantom",
  ];

  const handleInputChange = (
    field: keyof CreateMCPServiceRequest,
    value: any
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addChain = () => {
    if (newChain && !formData.supportedChains.includes(newChain)) {
      setFormData((prev) => ({
        ...prev,
        supportedChains: [...prev.supportedChains, newChain],
      }));
      setNewChain("");
    }
  };

  const removeChain = (chain: string) => {
    setFormData((prev) => ({
      ...prev,
      supportedChains: prev.supportedChains.filter((c) => c !== chain),
    }));
  };

  const addFeature = () => {
    if (newFeature && !formData.features.includes(newFeature)) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, newFeature],
      }));
      setNewFeature("");
    }
  };

  const removeFeature = (feature: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((f) => f !== feature),
    }));
  };

  const addIntegrationMode = () => {
    if (
      newIntegrationMode.description &&
      !formData.integrationModes.some((m) => m.type === newIntegrationMode.type)
    ) {
      setFormData((prev) => ({
        ...prev,
        integrationModes: [...prev.integrationModes, newIntegrationMode],
      }));
      setNewIntegrationMode({ type: "HTTP", description: "" });
    }
  };

  const removeIntegrationMode = (type: string) => {
    setFormData((prev) => ({
      ...prev,
      integrationModes: prev.integrationModes.filter((m) => m.type !== type),
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setError("Service name is required");
      return false;
    }
    if (!formData.description.trim()) {
      setError("Description is required");
      return false;
    }
    if (!formData.endpoint.trim()) {
      setError("API endpoint is required");
      return false;
    }
    if (formData.supportedChains.length === 0) {
      setError("At least one supported chain is required");
      return false;
    }
    if (formData.features.length === 0) {
      setError("At least one feature is required");
      return false;
    }
    if (formData.integrationModes.length === 0) {
      setError("At least one integration mode is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    setError("");

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      // In a real app, you'd get the wallet address from the wallet context
      const dummyWallet = "0x1234567890123456789012345678901234567890";
      const newService = await MCPServiceAPI.createService(
        formData,
        dummyWallet
      );
      onSuccess(newService);
      resetForm();
    } catch (err) {
      setError("Failed to publish service. Please try again.");
      console.error("Error publishing service:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      fullDescription: "",
      icon: "🔗",
      category: "Data Feed",
      supportedChains: [],
      features: [],
      integrationModes: [],
      endpoint: "",
      apiDocumentation: "",
      isPublic: true,
      price: 0,
      isPremium: false,
    });
    setError("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
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
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-black/90 backdrop-blur-md border border-white/20 p-0 text-left align-middle shadow-xl transition-all">
                <div className="relative max-h-[90vh] overflow-y-auto custom-scrollbar">
                  {/* Header */}
                  <div className="sticky top-0 z-10 p-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-b border-white/10 backdrop-blur-md">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-bold text-white">
                        Publish MCP Service
                      </h3>
                      <button
                        onClick={handleClose}
                        className="p-2 bg-black/50 hover:bg-black/70 rounded-full text-white/70 hover:text-white transition-all duration-300"
                      >
                        <XMarkIcon className="w-5 h-5" />
                      </button>
                    </div>
                    <p className="text-white/70 mt-2">
                      Share your MCP service with the MindMint community
                    </p>
                  </div>

                  {/* Form */}
                  <div className="p-6 space-y-6">
                    {/* Error Message */}
                    {error && (
                      <div className="flex items-center gap-2 p-4 bg-red-500/20 border border-red-500/40 rounded-lg text-red-300">
                        <ExclamationTriangleIcon className="w-5 h-5" />
                        <span>{error}</span>
                      </div>
                    )}

                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">
                          Service Name *
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) =>
                            handleInputChange("name", e.target.value)
                          }
                          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                          placeholder="My Awesome API"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">
                          Category *
                        </label>
                        <select
                          value={formData.category}
                          onChange={(e) =>
                            handleInputChange("category", e.target.value)
                          }
                          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                          {categories.map((category) => (
                            <option
                              key={category}
                              value={category}
                              className="bg-black"
                            >
                              {category}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Icon Selection */}
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Icon
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {iconOptions.map((icon) => (
                          <button
                            key={icon}
                            onClick={() => handleInputChange("icon", icon)}
                            className={`p-2 rounded-lg border transition-all duration-300 ${
                              formData.icon === icon
                                ? "bg-purple-500/20 border-purple-500/40"
                                : "bg-white/10 border-white/20 hover:border-white/40"
                            }`}
                          >
                            <span className="text-xl">{icon}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Short Description *
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) =>
                          handleInputChange("description", e.target.value)
                        }
                        rows={2}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Brief description of your service..."
                      />
                    </div>

                    {/* Full Description */}
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Full Description
                      </label>
                      <textarea
                        value={formData.fullDescription}
                        onChange={(e) =>
                          handleInputChange("fullDescription", e.target.value)
                        }
                        rows={4}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Detailed description, features, and benefits..."
                      />
                    </div>

                    {/* API Endpoint */}
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        API Endpoint *
                      </label>
                      <input
                        type="url"
                        value={formData.endpoint}
                        onChange={(e) =>
                          handleInputChange("endpoint", e.target.value)
                        }
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="https://api.example.com/v1"
                      />
                    </div>

                    {/* Supported Chains */}
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Supported Chains *
                      </label>
                      <div className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={newChain}
                          onChange={(e) => setNewChain(e.target.value)}
                          className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                          placeholder="Enter chain name"
                        />
                        <button
                          onClick={addChain}
                          className="px-4 py-2 bg-purple-500/20 border border-purple-500/40 rounded-lg text-purple-300 hover:bg-purple-500/30 transition-all duration-300"
                        >
                          <PlusIcon className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {commonChains.map((chain) => (
                          <button
                            key={chain}
                            onClick={() =>
                              !formData.supportedChains.includes(chain) &&
                              setFormData((prev) => ({
                                ...prev,
                                supportedChains: [
                                  ...prev.supportedChains,
                                  chain,
                                ],
                              }))
                            }
                            className={`px-2 py-1 text-xs rounded border transition-all duration-300 ${
                              formData.supportedChains.includes(chain)
                                ? "bg-purple-500/20 border-purple-500/40 text-purple-300"
                                : "bg-white/10 border-white/20 text-white/60 hover:border-white/40"
                            }`}
                          >
                            {chain}
                          </button>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {formData.supportedChains.map((chain) => (
                          <div
                            key={chain}
                            className="flex items-center gap-1 px-2 py-1 bg-blue-500/20 border border-blue-500/40 rounded text-blue-300 text-sm"
                          >
                            <span>{chain}</span>
                            <button onClick={() => removeChain(chain)}>
                              <XMarkIcon className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Features */}
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Features *
                      </label>
                      <div className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={newFeature}
                          onChange={(e) => setNewFeature(e.target.value)}
                          className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                          placeholder="Enter feature"
                        />
                        <button
                          onClick={addFeature}
                          className="px-4 py-2 bg-purple-500/20 border border-purple-500/40 rounded-lg text-purple-300 hover:bg-purple-500/30 transition-all duration-300"
                        >
                          <PlusIcon className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {formData.features.map((feature) => (
                          <div
                            key={feature}
                            className="flex items-center gap-1 px-2 py-1 bg-green-500/20 border border-green-500/40 rounded text-green-300 text-sm"
                          >
                            <span>{feature}</span>
                            <button onClick={() => removeFeature(feature)}>
                              <XMarkIcon className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Integration Modes */}
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Integration Modes *
                      </label>
                      <div className="space-y-2 mb-4">
                        <div className="flex gap-2">
                          <select
                            value={newIntegrationMode.type}
                            onChange={(e) =>
                              setNewIntegrationMode((prev) => ({
                                ...prev,
                                type: e.target.value as any,
                              }))
                            }
                            className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                          >
                            {integrationTypes.map((type) => (
                              <option
                                key={type}
                                value={type}
                                className="bg-black"
                              >
                                {type}
                              </option>
                            ))}
                          </select>
                          <input
                            type="text"
                            value={newIntegrationMode.description}
                            onChange={(e) =>
                              setNewIntegrationMode((prev) => ({
                                ...prev,
                                description: e.target.value,
                              }))
                            }
                            className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Describe this integration mode"
                          />
                          <button
                            onClick={addIntegrationMode}
                            className="px-4 py-2 bg-purple-500/20 border border-purple-500/40 rounded-lg text-purple-300 hover:bg-purple-500/30 transition-all duration-300"
                          >
                            <PlusIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {formData.integrationModes.map((mode) => (
                          <div
                            key={mode.type}
                            className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-lg"
                          >
                            <div>
                              <span className="px-2 py-1 bg-cyan-500/20 text-cyan-300 text-xs rounded border border-cyan-500/30">
                                {mode.type}
                              </span>
                              <p className="text-sm text-white/70 mt-1">
                                {mode.description}
                              </p>
                            </div>
                            <button
                              onClick={() => removeIntegrationMode(mode.type)}
                              className="p-1 text-red-400 hover:text-red-300"
                            >
                              <TrashIcon className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">
                          Price (ETH)
                        </label>
                        <input
                          type="number"
                          step="0.001"
                          min="0"
                          value={formData.price}
                          onChange={(e) =>
                            handleInputChange(
                              "price",
                              parseFloat(e.target.value) || 0
                            )
                          }
                          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                      <div className="flex items-end">
                        <label className="flex items-center gap-2 text-white/80">
                          <input
                            type="checkbox"
                            checked={formData.isPremium}
                            onChange={(e) =>
                              handleInputChange("isPremium", e.target.checked)
                            }
                            className="w-4 h-4 text-purple-500 bg-white/10 border-white/20 rounded focus:ring-purple-500"
                          />
                          Premium Service
                        </label>
                      </div>
                    </div>

                    {/* Documentation URL */}
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        API Documentation URL
                      </label>
                      <input
                        type="url"
                        value={formData.apiDocumentation}
                        onChange={(e) =>
                          handleInputChange("apiDocumentation", e.target.value)
                        }
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="https://docs.example.com"
                      />
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="sticky bottom-0 p-6 bg-white/5 border-t border-white/10 backdrop-blur-md">
                    <div className="flex gap-4">
                      <button
                        onClick={handleClose}
                        className="flex-1 px-4 py-3 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 rounded-xl text-white/80 hover:text-white font-medium transition-all duration-300"
                      >
                        Cancel
                      </button>
                      <motion.button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-500 disabled:to-gray-600 rounded-xl text-white font-medium transition-all duration-300"
                        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                      >
                        {isSubmitting ? "Publishing..." : "Publish Service"}
                      </motion.button>
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

export default PublishServiceModal;
