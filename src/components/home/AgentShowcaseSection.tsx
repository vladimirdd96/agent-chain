"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

// Temporary placeholder data - Fetch from API later
const featuredAgents = [
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
];

const AgentShowcaseSection = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Featured Agents
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Discover our most popular AI agents, ready to supercharge your
            workflow
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredAgents.map((agent) => (
            <div
              key={agent.id}
              className="group relative overflow-hidden rounded-xl bg-black/50 backdrop-blur-md border border-white/10 transition-all hover:border-white/20"
            >
              <Link href={`/agent-store/${agent.id}`} className="block">
                <div className="aspect-w-16 aspect-h-9 relative">
                  <Image
                    src={agent.imageUrl}
                    alt={agent.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white">
                    {agent.name}
                  </h3>
                  <p className="mt-2 text-sm text-white/70">
                    {agent.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-white font-medium">
                      ${agent.price.toFixed(2)}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-sm text-white">
                      View Details
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/agent-store"
            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 rounded-lg transition-all duration-300"
          >
            View All Agents
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AgentShowcaseSection;
