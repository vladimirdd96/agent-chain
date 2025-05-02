"use client";

import React from "react";
import AgentCard from "@/components/AgentCard";

// Temporary placeholder data - Replace with API call later
const agents = [
  {
    id: "1",
    name: "Trading Bot Alpha",
    description: "Automated trading with advanced market analysis",
    imageUrl: "/images/trading-bot.jpg",
    price: 99.99,
  },
  {
    id: "2",
    name: "Data Analyst Pro",
    description: "Deep insights from your data streams",
    imageUrl: "/images/data-analyst.jpg",
    price: 149.99,
  },
  {
    id: "3",
    name: "Content Generator",
    description: "AI-powered content creation and optimization",
    imageUrl: "/images/content-gen.jpg",
    price: 79.99,
  },
  {
    id: "4",
    name: "Market Researcher",
    description: "Real-time market analysis and insights",
    imageUrl: "/images/market-research.jpg",
    price: 129.99,
  },
  {
    id: "5",
    name: "Social Media Manager",
    description: "Automated social media management and analytics",
    imageUrl: "/images/social-media.jpg",
    price: 89.99,
  },
  {
    id: "6",
    name: "Code Assistant",
    description: "AI-powered code generation and review",
    imageUrl: "/images/code-assistant.jpg",
    price: 199.99,
  },
];

export default function AgentStorePage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Agent Store
        </h1>
        <p className="text-white/70 max-w-2xl mx-auto">
          Browse our collection of powerful AI agents ready to supercharge your
          workflow
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <AgentCard key={agent.id} {...agent} />
        ))}
      </div>
    </div>
  );
}
