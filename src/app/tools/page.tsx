"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAgentChain } from "@/hooks/useAgentChain";

interface Tool {
  name: string;
  description: string;
  capabilities: Array<{
    name: string;
    description: string;
    parameters: Record<string, string>;
  }>;
}

export default function ToolsPage() {
  const client = useAgentChain();
  const [tools, setTools] = useState<Record<string, Tool>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTools();
  }, []);

  const loadTools = async () => {
    try {
      const data = await client.getTools();
      setTools(data);
    } catch (error) {
      console.error("Failed to load tools:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-black/50 backdrop-blur-md border border-white/10 rounded-xl p-8 h-64 animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
              Agent Tools
            </h1>
            <p className="text-white/70 text-lg">
              Explore our collection of powerful tools for building AI agents
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(tools).map(([key, tool]) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-black/50 backdrop-blur-md border border-white/10 rounded-xl p-8"
              >
                <h2 className="text-2xl font-semibold text-white mb-2">
                  {tool.name}
                </h2>
                <p className="text-white/70 mb-6">{tool.description}</p>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-white">
                    Capabilities
                  </h3>
                  {tool.capabilities.map((capability, index) => (
                    <div
                      key={index}
                      className="bg-white/5 rounded-lg p-4 space-y-2"
                    >
                      <h4 className="text-white font-medium">
                        {capability.name}
                      </h4>
                      <p className="text-white/70 text-sm">
                        {capability.description}
                      </p>
                      {Object.keys(capability.parameters).length > 0 && (
                        <div className="mt-2 pt-2 border-t border-white/10">
                          <p className="text-white/50 text-xs mb-2">
                            Parameters:
                          </p>
                          <div className="grid grid-cols-2 gap-2">
                            {Object.entries(capability.parameters).map(
                              ([name, type]) => (
                                <code
                                  key={name}
                                  className="text-xs px-2 py-1 bg-white/5 rounded"
                                >
                                  {name}: {type}
                                </code>
                              )
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
