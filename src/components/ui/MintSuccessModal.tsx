import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircleIcon,
  SparklesIcon,
  LinkIcon,
  ChartBarIcon,
  ChatBubbleLeftRightIcon,
  XMarkIcon,
  RocketLaunchIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

interface MintSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  agentName: string;
  agentPrice: number;
  agentType: string;
  agentImage?: string;
  onUseAgent?: () => void;
  onViewInStore?: () => void;
}

export const MintSuccessModal: React.FC<MintSuccessModalProps> = ({
  isOpen,
  onClose,
  agentName,
  agentPrice,
  agentType,
  agentImage,
  onUseAgent,
  onViewInStore,
}) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      icon: RocketLaunchIcon,
      text: "Processing transaction...",
      color: "text-blue-400",
    },
    {
      icon: SparklesIcon,
      text: "Minting your agent NFT...",
      color: "text-purple-400",
    },
    {
      icon: CheckCircleIcon,
      text: "Successfully minted!",
      color: "text-green-400",
    },
  ];

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
      setShowConfetti(false);

      const stepTimer1 = setTimeout(() => setCurrentStep(1), 800);
      const stepTimer2 = setTimeout(() => {
        setCurrentStep(2);
        setShowConfetti(true);
      }, 1800);

      return () => {
        clearTimeout(stepTimer1);
        clearTimeout(stepTimer2);
      };
    }
  }, [isOpen]);

  const benefits = [
    {
      icon: ShieldCheckIcon,
      title: "Premium Access Unlocked",
      description: "Full access to all advanced features and capabilities",
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: "Enhanced AI Interactions",
      description: "Priority processing and extended conversation limits",
    },
    {
      icon: ChartBarIcon,
      title: "Advanced Analytics",
      description: "Detailed insights and performance tracking",
    },
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.5, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20 rounded-2xl p-8 max-w-lg w-full mx-4 border border-white/10 shadow-2xl"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>

          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              className="relative mb-6"
            >
              <div className="text-6xl mx-auto mb-4 relative">
                {agentImage || "🤖"}
                {showConfetti && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: 360 }}
                    className="absolute -top-2 -right-2 text-2xl"
                  >
                    🎉
                  </motion.div>
                )}
              </div>
            </motion.div>

            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold text-white mb-2"
            >
              {currentStep === 2
                ? "Agent Minted Successfully!"
                : "Minting Agent..."}
            </motion.h2>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-white/70"
            >
              {agentName}
            </motion.p>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {steps.map((step, index) => {
                const StepIcon = step.icon;
                const isActive = index <= currentStep;
                const isCurrent = index === currentStep;

                return (
                  <motion.div
                    key={index}
                    initial={{ scale: 0.8, opacity: 0.5 }}
                    animate={{
                      scale: isCurrent ? 1.1 : 1,
                      opacity: isActive ? 1 : 0.5,
                    }}
                    className="flex flex-col items-center"
                  >
                    <div
                      className={`p-3 rounded-full border-2 ${
                        isActive
                          ? "border-purple-400 bg-purple-500/20"
                          : "border-white/20 bg-white/5"
                      } transition-all duration-300 ${
                        isCurrent ? "animate-pulse" : ""
                      }`}
                    >
                      <StepIcon
                        className={`w-6 h-6 ${
                          isActive ? step.color : "text-white/40"
                        }`}
                      />
                    </div>
                    <div className="mt-2 text-xs text-center text-white/60 max-w-[80px]">
                      {step.text}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="w-full bg-white/10 rounded-full h-2">
              <motion.div
                initial={{ width: "0%" }}
                animate={{
                  width: `${((currentStep + 1) / steps.length) * 100}%`,
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
              />
            </div>
          </div>

          {currentStep === 2 && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mb-6 p-4 bg-white/5 rounded-xl border border-white/10"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-white/70">Transaction Amount</span>
                <span className="text-white font-semibold">
                  {agentPrice} ETH
                </span>
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-white/70">Agent Type</span>
                <span className="text-white font-semibold capitalize">
                  {agentType}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/70">Status</span>
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 font-semibold">
                    Confirmed
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mb-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4 text-center">
                🎉 What You've Unlocked
              </h3>
              <div className="space-y-3">
                {benefits.map((benefit, index) => {
                  const BenefitIcon = benefit.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.9 + index * 0.1 }}
                      className="flex items-start gap-3 p-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/20"
                    >
                      <BenefitIcon className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-white font-medium text-sm">
                          {benefit.title}
                        </div>
                        <div className="text-white/60 text-xs">
                          {benefit.description}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              {onUseAgent && (
                <motion.button
                  onClick={onUseAgent}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-blue-600 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ChatBubbleLeftRightIcon className="w-5 h-5" />
                  Use Agent Now
                </motion.button>
              )}

              {onViewInStore && (
                <motion.button
                  onClick={onViewInStore}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold transition-all border border-white/20"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <LinkIcon className="w-5 h-5" />
                  View in Store
                </motion.button>
              )}
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              className="mt-6 pt-4 border-t border-white/10 text-center"
            >
              <p className="text-xs text-white/50">
                Your agent NFT has been successfully minted to your wallet
              </p>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
