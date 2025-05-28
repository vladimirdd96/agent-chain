"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DeploySuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  agentName: string;
  agentType: string;
  nftId: string;
}

const DeploySuccessModal: React.FC<DeploySuccessModalProps> = ({
  isOpen,
  onClose,
  agentName,
  agentType,
  nftId,
}) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { icon: "🚀", text: "Deploying to blockchain..." },
    { icon: "🎨", text: "Minting your NFT..." },
    { icon: "✅", text: "Agent successfully deployed!" },
  ];

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
      setShowConfetti(false);

      // Simulate deployment steps
      const stepTimer1 = setTimeout(() => setCurrentStep(1), 1000);
      const stepTimer2 = setTimeout(() => {
        setCurrentStep(2);
        setShowConfetti(true);
      }, 2500);

      return () => {
        clearTimeout(stepTimer1);
        clearTimeout(stepTimer2);
      };
    }
  }, [isOpen]);

  const agentTypeConfig = {
    solana: { icon: "🟣", color: "from-purple-500 to-purple-600" },
    evm: { icon: "🔷", color: "from-blue-500 to-blue-600" },
    trade: { icon: "📈", color: "from-green-500 to-emerald-600" },
    generalist: { icon: "🌟", color: "from-yellow-500 to-orange-600" },
  };

  const config =
    agentTypeConfig[agentType as keyof typeof agentTypeConfig] ||
    agentTypeConfig.solana;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="bg-black/90 backdrop-blur-xl border border-white/20 rounded-3xl p-8 max-w-md w-full relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 pointer-events-none" />

            {/* Confetti Effect */}
            {showConfetti && (
              <>
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    initial={{ opacity: 0, scale: 0, y: -20 }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                      y: [0, 100, 200],
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 3,
                      delay: Math.random() * 2,
                      ease: "easeOut",
                    }}
                  />
                ))}
              </>
            )}

            <div className="relative z-10">
              {/* Success Animation */}
              <div className="text-center mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: currentStep === 2 ? 1 : 0.8 }}
                  transition={{ type: "spring", damping: 15, stiffness: 300 }}
                  className="mx-auto w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-4 relative"
                >
                  {currentStep < 2 ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="text-3xl"
                    >
                      {steps[currentStep].icon}
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                      className="text-3xl"
                    >
                      ✅
                    </motion.div>
                  )}

                  {/* Ripple effect */}
                  {currentStep === 2 && (
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-green-400"
                      initial={{ scale: 1, opacity: 1 }}
                      animate={{ scale: 2, opacity: 0 }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                </motion.div>

                <motion.h2
                  className="text-2xl font-bold text-white mb-2"
                  key={currentStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {currentStep === 2
                    ? "Agent Deployed Successfully!"
                    : "Deploying Agent..."}
                </motion.h2>

                <motion.p
                  className="text-white/70"
                  key={currentStep}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {steps[currentStep].text}
                </motion.p>

                {/* Progress bar */}
                {currentStep < 2 && (
                  <motion.div className="w-full bg-white/10 rounded-full h-2 mt-4">
                    <motion.div
                      className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: `${((currentStep + 1) / 3) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </motion.div>
                )}
              </div>

              {/* Agent Card */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mb-6"
                >
                  <div className="relative">
                    {/* Card glow */}
                    <motion.div
                      className={`absolute -inset-2 bg-gradient-to-r ${config.color} rounded-xl blur opacity-50`}
                      animate={{ opacity: [0.5, 0.8, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />

                    {/* Agent card */}
                    <motion.div
                      className="relative bg-black/80 backdrop-blur-xl border border-white/20 rounded-xl p-4"
                      animate={{ rotateY: [0, 10, -10, 0] }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <motion.div
                          className={`w-12 h-12 bg-gradient-to-r ${config.color} rounded-full flex items-center justify-center text-lg`}
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        >
                          {config.icon}
                        </motion.div>
                        <div className="flex-1">
                          <h3 className="text-white font-semibold">
                            {agentName}
                          </h3>
                          <p className="text-white/60 text-sm capitalize">
                            {agentType} Agent
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-white/50">NFT ID</div>
                          <div className="text-sm font-mono text-purple-300">
                            #{nftId}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* Action buttons */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="space-y-3"
                >
                  <motion.button
                    className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold rounded-lg transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      // Navigate to agent details or marketplace
                      window.open(`/agent/${nftId}`, "_blank");
                    }}
                  >
                    🎨 View Your NFT
                  </motion.button>

                  <motion.button
                    className="w-full px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-all duration-300 border border-white/20"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                  >
                    Deploy Another Agent
                  </motion.button>
                </motion.div>
              )}

              {/* Share celebration */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="mt-4 text-center"
                >
                  <div className="flex items-center justify-center gap-2 text-sm text-white/60">
                    <span>🎉</span>
                    <span>Share your achievement with the world!</span>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DeploySuccessModal;
