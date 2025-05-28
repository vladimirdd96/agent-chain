import React from "react";
import { motion } from "framer-motion";
import { WalletAnalytics as WalletAnalyticsType } from "@/lib/mindmint-sdk/types";

interface WalletAnalyticsProps {
  analytics: WalletAnalyticsType;
  onRefresh?: () => void;
}

export function WalletAnalytics({
  analytics,
  onRefresh,
}: WalletAnalyticsProps) {
  return (
    <div className="space-y-6">
      {/* Balance Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-black/50 backdrop-blur-md border border-white/10 rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">Balance Overview</h3>
          {onRefresh && (
            <button
              onClick={onRefresh}
              className="p-2 text-white/70 hover:text-white transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 rounded-lg p-4">
            <p className="text-white/70 text-sm mb-1">Native Balance</p>
            <p className="text-2xl font-bold text-white">
              {parseFloat(analytics.balance.balance) /
                Math.pow(10, analytics.balance.decimals)}{" "}
              {analytics.chain.toUpperCase()}
            </p>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <p className="text-white/70 text-sm mb-1">Token Value</p>
            <p className="text-2xl font-bold text-white">
              ${analytics.totalTokenValue.toLocaleString()}
            </p>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <p className="text-white/70 text-sm mb-1">NFT Collections</p>
            <p className="text-2xl font-bold text-white">
              {analytics.uniqueNFTCollections}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Token List */}
      {analytics.tokens.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-black/50 backdrop-blur-md border border-white/10 rounded-xl p-6"
        >
          <h3 className="text-xl font-semibold text-white mb-4">Tokens</h3>
          <div className="space-y-3">
            {analytics.tokens.map((token) => (
              <div
                key={token.token_address}
                className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
              >
                <div>
                  <p className="text-white font-medium">
                    {token.name || "Unknown Token"}
                  </p>
                  <p className="text-white/70 text-sm">{token.symbol}</p>
                </div>
                <div className="text-right">
                  <p className="text-white font-medium">
                    {parseFloat(token.balance) / Math.pow(10, token.decimals)}
                  </p>
                  {token.value && (
                    <p className="text-white/70 text-sm">
                      ${token.value.toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* NFT List */}
      {analytics.nfts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-black/50 backdrop-blur-md border border-white/10 rounded-xl p-6"
        >
          <h3 className="text-xl font-semibold text-white mb-4">NFTs</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {analytics.nfts.map((nft) => (
              <div
                key={`${nft.token_address}-${nft.token_id}`}
                className="p-3 bg-white/5 rounded-lg"
              >
                <p className="text-white font-medium">
                  {nft.name || "Unnamed NFT"}
                </p>
                {nft.collection && (
                  <p className="text-white/70 text-sm">{nft.collection.name}</p>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
