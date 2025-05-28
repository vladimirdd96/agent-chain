"use client";

import React from "react";
import { motion } from "framer-motion";

const features = [
  {
    title: "AI-Powered Automation",
    description:
      "Leverage cutting-edge AI models to automate complex workflows and tasks",
    icon: "🤖",
  },
  {
    title: "Secure & Reliable",
    description:
      "Enterprise-grade security with end-to-end encryption and redundancy",
    icon: "🔒",
  },
  {
    title: "Customizable Chains",
    description:
      "Build and customize AI agents to match your specific requirements",
    icon: "⚡",
  },
  {
    title: "Real-time Monitoring",
    description: "Track and analyze your AI agents' performance in real-time",
    icon: "📊",
  },
  {
    title: "API Integration",
    description: "Seamlessly integrate with your existing tools and workflows",
    icon: "🔌",
  },
  {
    title: "24/7 Support",
    description:
      "Get help when you need it with our round-the-clock support team",
    icon: "💬",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Powerful Features
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Everything you need to build and manage intelligent AI agents
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-black/50 backdrop-blur-md border border-white/10 rounded-lg p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{feature.icon}</span>
                <h3 className="text-xl font-semibold text-white">
                  {feature.title}
                </h3>
              </div>
              <p className="text-white/70">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
