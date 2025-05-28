"use client";

import React from "react";
import { motion } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface AnimatedFiltersProps {
  categories: string[];
  chains: string[];
  selectedCategory: string;
  selectedChain: string;
  onCategoryChange: (category: string) => void;
  onChainChange: (chain: string) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

const AnimatedFilters: React.FC<AnimatedFiltersProps> = ({
  categories,
  chains,
  selectedCategory,
  selectedChain,
  onCategoryChange,
  onChainChange,
  onClearFilters,
  hasActiveFilters,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="space-y-6 mb-8"
    >
      {/* Category Filter */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <motion.label
            className="block text-sm font-medium text-white/70 uppercase tracking-wider"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Category
          </motion.label>

          {hasActiveFilters && (
            <motion.button
              onClick={onClearFilters}
              className="flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <XMarkIcon className="w-3 h-3" />
              Clear All
            </motion.button>
          )}
        </div>

        <div className="flex flex-wrap gap-3">
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`
                relative px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300
                ${
                  selectedCategory === category
                    ? "text-white shadow-lg"
                    : "text-white/70 hover:text-white"
                }
              `}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.4,
                delay: 0.4 + index * 0.05,
                ease: "easeOut",
              }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Active background */}
              {selectedCategory === category && (
                <>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-xl border border-purple-400/30"
                    layoutId="categoryActiveBackground"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-xl blur-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </>
              )}

              {/* Inactive background */}
              {selectedCategory !== category && (
                <div className="absolute inset-0 bg-white/10 hover:bg-white/15 rounded-xl border border-white/20 hover:border-white/30 transition-all duration-300" />
              )}

              <span className="relative z-10">{category}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Chain Filter */}
      <div>
        <motion.label
          className="block text-sm font-medium text-white/70 mb-4 uppercase tracking-wider"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          Blockchain
        </motion.label>

        <div className="flex flex-wrap gap-3">
          {chains.map((chain, index) => (
            <motion.button
              key={chain}
              onClick={() => onChainChange(chain)}
              className={`
                relative px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300
                ${
                  selectedChain === chain
                    ? "text-white shadow-lg"
                    : "text-white/70 hover:text-white"
                }
              `}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.4,
                delay: 0.6 + index * 0.05,
                ease: "easeOut",
              }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Active background */}
              {selectedChain === chain && (
                <>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-xl border border-blue-400/30"
                    layoutId="chainActiveBackground"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-xl blur-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </>
              )}

              {/* Inactive background */}
              {selectedChain !== chain && (
                <div className="absolute inset-0 bg-white/10 hover:bg-white/15 rounded-xl border border-white/20 hover:border-white/30 transition-all duration-300" />
              )}

              <span className="relative z-10">{chain}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default AnimatedFilters;
