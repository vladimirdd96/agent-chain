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
    <div>
      {/* New Redesigned Hero Section */}
      <HeroSection />

      {/* Other Sections */}
      <div className="container mx-auto px-4">
        <WorkflowSection />
        <MCPSection />
        <DeepResearchSection />
        <AgentCategoriesSection />
        <FAQSection />
      </div>
    </div>
  );
}
