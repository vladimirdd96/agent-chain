"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Aurora Background Effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-50">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500/30 to-purple-500/30 animate-aurora blur-3xl" />
          </div>
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 animate-aurora2 blur-3xl" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <span className="inline-flex items-center rounded-full bg-purple-500/10 px-3 py-1 text-sm text-purple-400 ring-1 ring-inset ring-purple-500/20">
              MCP-Powered
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400"
          >
            The Best Web3 AI Agent Platform
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-2xl mx-auto p-6 rounded-xl bg-black/20 backdrop-blur-md border border-white/10"
          >
            <p className="text-xl text-white">
              Reshaping Web3 AI Agent infrastructure to build a new era of
              composable AI Agents.
              <br />
              <span className="text-purple-300">
                Supported by cutting-edge encryption and AI technology.
              </span>
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/agent-store"
              className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 rounded-full transition-all duration-300"
            >
              Get Started
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
