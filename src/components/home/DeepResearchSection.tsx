"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const DeepResearchSection = () => {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20" />
      <div className="container mx-auto relative">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Deep Research Agent, Seriously.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-black/50 backdrop-blur-md border border-white/10 rounded-xl p-8 hover:border-purple-500/30 transition-all duration-300"
          >
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-white/70 mb-6">
                Deep Research is a specialized project research assistant
                designed for the crypto space that generates comprehensive
                reports on any topic following a workflow similar to OpenAI and
                Gemini Deep Research.
              </p>
              <p className="text-lg text-white/70 mb-8">
                It allows you to customize the models, prompts, report
                structure, search API, and research depth to get the most
                accurate and relevant information for your needs.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white">
                    Key Features
                  </h3>
                  <ul className="space-y-2 text-white/70">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-purple-400" />
                      <span>Customizable research workflows</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-purple-400" />
                      <span>Multi-model integration</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-purple-400" />
                      <span>Advanced data sourcing</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-purple-400" />
                      <span>Structured report generation</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white">
                    Use Cases
                  </h3>
                  <ul className="space-y-2 text-white/70">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-purple-400" />
                      <span>Project due diligence</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-purple-400" />
                      <span>Market analysis</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-purple-400" />
                      <span>Competitor research</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-purple-400" />
                      <span>Technology evaluation</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 text-center">
                <Link
                  href="/agent-store/deep-research"
                  className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 rounded-lg transition-all duration-300"
                >
                  Try Deep Research
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DeepResearchSection;
