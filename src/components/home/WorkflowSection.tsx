"use client";

import React from "react";
import { motion } from "framer-motion";

const modelHub = [
  {
    name: "DeepSeek R1",
    description: "Advanced language model for research and analysis",
  },
  {
    name: "DeepSeek V3",
    description: "Vision-language model for multimodal tasks",
  },
  {
    name: "OpenAI 4O",
    description: "Latest GPT model for advanced reasoning",
  },
  {
    name: "OpenAI O3/O1",
    description: "Efficient models for various tasks",
  },
];

const agents = [
  {
    title: "Analyst",
    description:
      "Analyze on-chain and off-chain data multi-dimensionally to deliver precise project evaluations for traders.",
    token: {
      ca: "DEzkpE...7LZ9Pr6hBz3",
      value: "0.5 M",
    },
    functions: ["On-chain API", "RPC Node", "Twitter Agent", "Built-in"],
  },
  {
    title: "Trade Agent",
    description:
      "A Web3 transaction agent operates as an intelligent intermediary facilitating seamless transactions within decentralized exchanges.",
    token: {
      ca: "79vpE...7LZ9PASDAS1",
      value: "2.5 M",
    },
    functions: ["Quote&Swap API", "Jupiter", "Analyst Agent", "Built-in"],
  },
  {
    title: "Twitter Knowledge Graph",
    description:
      "By identifying and linking tweets, users, and hashtags related to WEB3 KOLs, it uncovers hidden relationship networks.",
    token: {
      ca: "D9vpE...7LZPwDCDZ1",
      value: "1.2 M",
    },
    dataProcess: [
      "Model Definition",
      "Graph Extraction",
      "Graph Fusion",
      "Graph Database",
    ],
  },
];

const WorkflowSection = () => {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20" />
      <div className="container mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            DeepCore WorkFlow
          </h2>
        </motion.div>

        {/* Model Hub */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-white mb-6">Model Hub</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {modelHub.map((model, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-black/50 backdrop-blur-md border border-white/10 rounded-lg p-4"
              >
                <h4 className="text-lg font-semibold text-white mb-2">
                  {model.name}
                </h4>
                <p className="text-sm text-white/70">{model.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Agents */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {agents.map((agent, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-black/50 backdrop-blur-md border border-white/10 rounded-lg p-6"
            >
              <h3 className="text-xl font-semibold text-white mb-4">
                {agent.title}
              </h3>
              <p className="text-white/70 mb-6">{agent.description}</p>

              <div className="mb-6">
                <h4 className="text-sm font-medium text-white/70 mb-2">
                  TOKEN CA
                </h4>
                <div className="flex justify-between items-center">
                  <code className="text-xs text-purple-400">
                    {agent.token.ca}
                  </code>
                  <span className="text-white font-medium">
                    {agent.token.value}
                  </span>
                </div>
              </div>

              {agent.functions ? (
                <div>
                  <h4 className="text-sm font-medium text-white/70 mb-2">
                    FUNCTIONS
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {agent.functions.map((func, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs text-white"
                      >
                        {func}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <h4 className="text-sm font-medium text-white/70 mb-2">
                    Data process
                  </h4>
                  <div className="space-y-2">
                    {agent.dataProcess?.map((step, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-white/70"
                      >
                        <span className="w-2 h-2 rounded-full bg-purple-400" />
                        <span className="text-sm">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection;
