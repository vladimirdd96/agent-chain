"use client"; // Added directive to make this a Client Component

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
// Using relative imports to bypass potential alias issues
import HeroSection from "@/components/home/HeroSection";
import WorkflowSection from "@/components/home/WorkflowSection";
import MCPSection from "@/components/home/MCPSection";
import DeepResearchSection from "@/components/home/DeepResearchSection";
import AgentCategoriesSection from "@/components/home/AgentCategoriesSection";
import FAQSection from "@/components/home/FAQSection";

export default function HomePage() {
  const features = [
    {
      title: "DeepCore WorkFlow",
      items: [
        {
          name: "Model Hub",
          description: "Access state-of-the-art AI models for your agents",
          value: "Integrated AI",
        },
        {
          name: "Analyst",
          description: "Multi-dimensional on-chain and off-chain data analysis",
          value: "Data Analysis",
        },
        {
          name: "Trade Agent",
          description: "Automated trading with built-in analytics",
          value: "Trading",
        },
      ],
    },
    {
      title: "Agent Categories",
      items: [
        {
          name: "Solana Agents",
          description: "Native Solana blockchain integration and analytics",
          value: "SOL Native",
        },
        {
          name: "EVM Agents",
          description: "Support for all major EVM-compatible chains",
          value: "Multi-chain",
        },
        {
          name: "Trading Bots",
          description: "Automated trading strategies and portfolio management",
          value: "DeFi Ready",
        },
      ],
    },
  ];

  return (
    <div className="container mx-auto px-4">
      {/* Hero Section */}
      <section className="py-20 md:py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            The Best Web3 AI Agent Platform
          </h1>
          <p className="text-xl text-white/70 mb-12">
            Reshaping Web3 AI Agent infrastructure to build a new era of
            composable AI Agents.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/store"
              className="px-8 py-3 text-lg font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-300"
            >
              Explore Agents
            </Link>
            <Link
              href="/deploy"
              className="px-8 py-3 text-lg font-medium text-white bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300"
            >
              Deploy Agent
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        {features.map((section, sectionIndex) => (
          <div key={section.title} className="mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * sectionIndex }}
              className="text-3xl font-bold text-white mb-12 text-center"
            >
              {section.title}
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {section.items.map((feature, index) => (
                <motion.div
                  key={feature.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * (index + 1) }}
                  className="bg-black/50 backdrop-blur-md border border-white/10 rounded-xl p-8"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-white">
                      {feature.name}
                    </h3>
                    <span className="px-3 py-1 text-xs font-medium text-white bg-purple-500/20 rounded-full border border-purple-500/30">
                      {feature.value}
                    </span>
                  </div>
                  <p className="text-white/70">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Build Your Agent?
          </h2>
          <p className="text-white/70 mb-8">
            Get started with our powerful tools and deploy your first AI agent
            today.
          </p>
          <Link
            href="/deploy"
            className="inline-block px-8 py-3 text-lg font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-300"
          >
            Start Building
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
