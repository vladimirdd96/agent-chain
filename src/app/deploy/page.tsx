"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWallet } from "@/components/auth/hooks/useWallet";
import WalletButton from "@/components/auth/WalletButton";
import { Button } from "@/components/ui/Button";
import AnimatedAgentPreview from "@/components/deploy/AnimatedAgentPreview";
import DynamicCostBreakdown from "@/components/deploy/DynamicCostBreakdown";
import DeploySuccessModal from "@/components/deploy/DeploySuccessModal";
import AnimatedInput from "@/components/deploy/AnimatedInput";
import InfoTooltip from "@/components/deploy/InfoTooltip";
import { RocketLaunchIcon, SparklesIcon } from "@heroicons/react/24/outline";

interface FormData {
  agentType: string;
  agentName: string;
  description: string;
  initialParameters: string;
}

const agentTypeOptions = [
  { value: "solana", label: "🟣 Solana-Based Agent" },
  { value: "evm", label: "🔷 EVM-Based Agent" },
  { value: "trade", label: "📈 Trade Bot" },
  { value: "generalist", label: "🌟 Generalist Blockchain Agent" },
];

export default function DeployAgentPage() {
  const { connected } = useWallet();
  const [formData, setFormData] = useState<FormData>({
    agentType: "",
    agentName: "",
    description: "",
    initialParameters: "",
  });
  const [isDeploying, setIsDeploying] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // Check if form is valid for button animation
  const isFormValid =
    formData.agentType && formData.agentName && formData.description;

  const handleInputChange = (field: keyof FormData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear validation errors when user starts typing
    if (validationErrors.length > 0) {
      setValidationErrors([]);
    }
  };

  const validateForm = (): boolean => {
    const errors: string[] = [];

    if (!formData.agentType) errors.push("Please select an agent type");
    if (!formData.agentName.trim()) errors.push("Please enter an agent name");
    if (formData.agentName.length < 3)
      errors.push("Agent name must be at least 3 characters");
    if (!formData.description.trim()) errors.push("Please enter a description");
    if (formData.description.length < 20)
      errors.push("Description must be at least 20 characters");

    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleDeploy = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsDeploying(true);

    // Simulate deployment process
    setTimeout(() => {
      setIsDeploying(false);
      setShowSuccessModal(true);
    }, 3000);
  };

  const generateNFTId = () => {
    return Math.floor(10000 + Math.random() * 90000).toString();
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Aurora Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -inset-[10px] opacity-30">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-purple-500/20 animate-aurora blur-3xl" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 animate-aurora2 blur-3xl" />
          </div>
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto"
        >
          {/* Header Section */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 px-6 py-2 text-sm text-purple-300 ring-1 ring-inset ring-purple-500/20 backdrop-blur-sm mb-6">
                <SparklesIcon className="w-4 h-4" />
                Deploy Your AI Agent as an NFT
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-white">
                Ready to bring your AI agent to life?
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed max-w-3xl mx-auto"
            >
              Configure and deploy your agent as a{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 font-semibold">
                real NFT on the blockchain
              </span>
              . Transform your AI vision into a powerful, tradeable digital
              asset.
            </motion.p>
          </div>

          {!connected ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-black/50 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-center relative overflow-hidden">
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5" />

                <div className="relative z-10">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-3xl"
                  >
                    🚀
                  </motion.div>

                  <h2 className="text-3xl font-bold text-white mb-4">
                    Connect Your Wallet to Continue
                  </h2>
                  <p className="text-white/70 mb-8 text-lg">
                    You need to connect your Solana wallet to deploy and mint
                    your AI agent as an NFT.
                  </p>
                  <WalletButton />
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Left Side - Form */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-8"
              >
                <div className="bg-black/50 backdrop-blur-md border border-white/10 rounded-2xl p-8 relative overflow-hidden">
                  {/* Form shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/2 to-transparent -skew-x-12"
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 2,
                    }}
                  />

                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-8">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        ⚙️
                      </motion.div>
                      <h2 className="text-2xl font-bold text-white">
                        Agent Configuration
                      </h2>
                    </div>

                    <form onSubmit={handleDeploy} className="space-y-6">
                      {/* Agent Type */}
                      <AnimatedInput
                        label="Agent Type"
                        value={formData.agentType}
                        onChange={handleInputChange("agentType")}
                        type="select"
                        options={agentTypeOptions}
                        required
                        tooltip={
                          <InfoTooltip
                            title="Agent Types"
                            content="Different agent types have different capabilities and deployment costs. Solana agents are optimized for the Solana ecosystem, EVM agents work across Ethereum-compatible chains, Trade bots focus on automated trading, and Generalist agents provide universal blockchain capabilities."
                          />
                        }
                      />

                      {/* Agent Name */}
                      <AnimatedInput
                        label="Agent Name"
                        value={formData.agentName}
                        onChange={handleInputChange("agentName")}
                        placeholder="Enter a unique name for your agent"
                        required
                        tooltip={
                          <InfoTooltip
                            title="Agent Name"
                            content="Choose a memorable and unique name for your agent. This will be displayed on the NFT and used to identify your agent in the marketplace. Make it descriptive and brand-friendly!"
                          />
                        }
                      />

                      {/* Description */}
                      <AnimatedInput
                        label="Description"
                        value={formData.description}
                        onChange={handleInputChange("description")}
                        type="textarea"
                        placeholder="Describe your agent's functionality, purpose, and unique features..."
                        rows={4}
                        required
                        tooltip={
                          <InfoTooltip
                            title="Agent Description"
                            content="Provide a detailed description of what your agent does, its key features, and how it adds value. This helps users understand your agent's capabilities and increases its marketability."
                          />
                        }
                      />

                      {/* Initial Parameters */}
                      <AnimatedInput
                        label="Initial Parameters (Optional)"
                        value={formData.initialParameters}
                        onChange={handleInputChange("initialParameters")}
                        type="textarea"
                        placeholder={`{
  "chain": "${formData.agentType || "solana"}",
  "capabilities": ["analysis", "automation"],
  "settings": {
    "responseTime": "fast",
    "dataSource": "live"
  }
}`}
                        rows={6}
                        tooltip={
                          <InfoTooltip
                            title="Initial Parameters"
                            content="Configure your agent's initial parameters in JSON format. These settings will define how your agent behaves and interacts with the blockchain. You can always update these later through the agent's interface."
                          />
                        }
                      />

                      {/* Validation Errors */}
                      <AnimatePresence>
                        {validationErrors.length > 0 && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-red-500/10 border border-red-500/20 rounded-lg p-4"
                          >
                            <div className="text-red-400 text-sm space-y-1">
                              {validationErrors.map((error, index) => (
                                <motion.div
                                  key={error}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.1 }}
                                  className="flex items-center gap-2"
                                >
                                  <span>❌</span>
                                  <span>{error}</span>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Deploy Button */}
                      <motion.div
                        className="pt-6"
                        whileHover={isFormValid ? { scale: 1.02 } : {}}
                      >
                        <Button
                          type="submit"
                          variant="primary"
                          size="lg"
                          isLoading={isDeploying}
                          disabled={!isFormValid || isDeploying}
                          className={`w-full relative overflow-hidden group ${
                            isFormValid
                              ? "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                              : "bg-gray-600 cursor-not-allowed"
                          }`}
                        >
                          <RocketLaunchIcon className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" />
                          {isDeploying ? "Deploying Agent..." : "Deploy Agent"}

                          {/* Animated sweep effect on valid form */}
                          {isFormValid && (
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                              animate={{ x: ["-100%", "200%"] }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatDelay: 1,
                              }}
                            />
                          )}
                        </Button>
                      </motion.div>
                    </form>
                  </div>
                </div>

                {/* Cost Breakdown */}
                <DynamicCostBreakdown
                  agentType={formData.agentType}
                  agentName={formData.agentName}
                  description={formData.description}
                />
              </motion.div>

              {/* Right Side - Preview */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="lg:sticky lg:top-8 lg:self-start"
              >
                <div className="space-y-8">
                  {/* Preview Header */}
                  <div className="text-center">
                    <motion.h3
                      className="text-2xl font-bold text-white mb-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      Your Agent Preview
                    </motion.h3>
                    <motion.p
                      className="text-white/60"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      Watch your agent come to life as you configure it
                    </motion.p>
                  </div>

                  {/* Animated Agent Preview */}
                  <AnimatedAgentPreview
                    agentType={formData.agentType || "solana"}
                    agentName={formData.agentName || "Unnamed Agent"}
                  />

                  {/* Features Highlight */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl p-6 border border-purple-500/20"
                  >
                    <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                      <span>✨</span>
                      What You Get
                    </h4>
                    <div className="space-y-3 text-sm text-white/80">
                      {[
                        "🎨 Unique NFT artwork representing your agent",
                        "🔗 Permanent blockchain storage and ownership",
                        "💰 Royalties from future agent interactions",
                        "🚀 Access to AgentChain ecosystem and tools",
                        "📈 Potential value appreciation over time",
                      ].map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.8 + index * 0.1 }}
                          className="flex items-start gap-2"
                        >
                          <span className="text-sm">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Success Modal */}
      <DeploySuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        agentName={formData.agentName}
        agentType={formData.agentType}
        nftId={generateNFTId()}
      />
    </div>
  );
}
