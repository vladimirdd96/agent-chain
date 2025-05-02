"use client";

import React from "react";
import { motion } from "framer-motion";
import { useWallet } from "@/components/auth/hooks/useWallet";
import WalletButton from "@/components/auth/WalletButton";

export default function DeployAgentPage() {
  const { connected } = useWallet();

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Deploy Your Agent
        </h1>

        {!connected ? (
          <div className="bg-black/50 backdrop-blur-md border border-white/10 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Connect Your Wallet
            </h2>
            <p className="text-white/70 mb-6">
              You need to connect your Solana wallet to deploy an agent.
            </p>
            <WalletButton />
          </div>
        ) : (
          <div className="space-y-8">
            <div className="bg-black/50 backdrop-blur-md border border-white/10 rounded-xl p-8">
              <h2 className="text-2xl font-semibold text-white mb-6">
                Agent Configuration
              </h2>
              <form className="space-y-6">
                <div>
                  <label className="block text-white mb-2">Agent Type</label>
                  <select className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500">
                    <option value="solana">Solana-Based Agent</option>
                    <option value="evm">EVM-Based Agent</option>
                    <option value="trade">Trade Bot</option>
                    <option value="generalist">
                      Generalist Blockchain Agent
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-white mb-2">Agent Name</label>
                  <input
                    type="text"
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                    placeholder="Enter agent name"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2">Description</label>
                  <textarea
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                    rows={4}
                    placeholder="Describe your agent's functionality"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2">
                    Initial Parameters
                  </label>
                  <textarea
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white font-mono focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                    rows={6}
                    placeholder="{
  // Configure your agent's parameters
  'chain': 'solana',
  'capabilities': [],
  'settings': {}
}"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 text-lg font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 rounded-lg transition-all duration-300"
                >
                  Deploy Agent
                </button>
              </form>
            </div>

            <div className="bg-black/50 backdrop-blur-md border border-white/10 rounded-xl p-8">
              <h3 className="text-xl font-semibold text-white mb-4">
                Deployment Cost
              </h3>
              <div className="space-y-2 text-white/70">
                <p>• Base deployment fee: 0.1 SOL</p>
                <p>• Storage fee: 0.05 SOL</p>
                <p>• NFT minting fee: 0.05 SOL</p>
                <p className="text-white font-semibold pt-2">Total: 0.2 SOL</p>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
