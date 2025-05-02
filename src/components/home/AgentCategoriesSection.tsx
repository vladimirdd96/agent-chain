"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const categories = [
  {
    title: "Trading Bot Agent",
    description: "Automated trading strategies and market analysis",
    image: "/images/trading-bot.jpg",
  },
  {
    title: "Data Analyst Agent",
    description: "Deep data analysis and insights generation",
    image: "/images/data-analyst.jpg",
  },
  {
    title: "Content Generator",
    description: "AI-powered content creation and optimization",
    image: "/images/content-gen.jpg",
  },
  {
    title: "Market Research",
    description: "Comprehensive market analysis and reporting",
    image: "/images/market-research.jpg",
  },
  {
    title: "Social Media Agent",
    description: "Social media monitoring and engagement",
    image: "/images/social-media.jpg",
  },
  {
    title: "Code Assistant",
    description: "Intelligent coding help and code review",
    image: "/images/code-assistant.jpg",
  },
];

const AgentCategoriesSection = () => {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20" />
      <div className="container mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Agent Categories
          </h2>
          <p className="text-lg text-white/70">
            Explore our diverse collection of specialized AI agents designed to
            meet your specific needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-xl bg-black/50 backdrop-blur-md border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-[1.02]"
            >
              <div className="aspect-video relative">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {category.title}
                </h3>
                <p className="text-white/70">{category.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AgentCategoriesSection;
