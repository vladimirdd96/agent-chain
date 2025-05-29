"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  MagnifyingGlassIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  CpuChipIcon,
  SparklesIcon,
  LightBulbIcon,
  BeakerIcon,
} from "@heroicons/react/24/outline";

// Import our new Aceternity-style components
import { BackgroundBeams } from "@/components/ui/background-beams";
import { HoverCard } from "@/components/ui/card-hover-effect";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { Spotlight } from "@/components/ui/spotlight";
import { GlowingButton } from "@/components/ui/glowing-button";

const DeepResearchSection = () => {
  const keyFeatures = [
    {
      icon: <CpuChipIcon className="w-6 h-6 text-white" />,
      title: "Customizable research workflows",
      description:
        "Tailor your research process to match your specific needs and preferences.",
    },
    {
      icon: <SparklesIcon className="w-6 h-6 text-white" />,
      title: "Multi-model integration",
      description:
        "Leverage multiple AI models for comprehensive and accurate analysis.",
    },
    {
      icon: <BeakerIcon className="w-6 h-6 text-white" />,
      title: "Advanced data sourcing",
      description:
        "Access data from multiple APIs and web sources for thorough research.",
    },
    {
      icon: <DocumentTextIcon className="w-6 h-6 text-white" />,
      title: "Structured report generation",
      description:
        "Generate well-organized reports with executive summaries and insights.",
    },
  ];

  const useCases = [
    {
      icon: <ShieldCheckIcon className="w-6 h-6 text-white" />,
      title: "Project due diligence",
      description:
        "Comprehensive analysis of crypto projects, teams, and tokenomics.",
    },
    {
      icon: <ChartBarIcon className="w-6 h-6 text-white" />,
      title: "Market analysis",
      description:
        "Deep market research with trend analysis and competitive intelligence.",
    },
    {
      icon: <LightBulbIcon className="w-6 h-6 text-white" />,
      title: "Competitor research",
      description:
        "Detailed competitive landscape analysis and strategic positioning.",
    },
    {
      icon: <MagnifyingGlassIcon className="w-6 h-6 text-white" />,
      title: "Technology evaluation",
      description:
        "Technical assessment of blockchain projects and innovations.",
    },
  ];

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20" />
      <BackgroundBeams />

      {/* Spotlight Effect */}
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="rgba(147, 51, 234, 0.3)"
      />

      <div className="container mx-auto relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header Section with DRAMATIC Text Generate Effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            {/* SCREAMING Title with enhanced effects */}
            <div className="relative">
              {/* Background glow effect for the title */}
              <motion.div
                className="absolute inset-0 blur-3xl opacity-30"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="w-full h-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500" />
              </motion.div>

              <TextGenerateEffect
                words="DEEP RESEARCH"
                className="text-7xl md:text-9xl lg:text-[12rem] font-black mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent drop-shadow-2xl"
                filter={true}
                duration={0.8}
              />

              {/* Dramatic subtitle */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 2 }}
                className="relative"
              >
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-2 tracking-wider">
                  Deep Research agent,
                </h2>
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-2 tracking-wider">
                  SERIOUSLY!
                </h2>

                {/* Animated underline */}
                <motion.div
                  className="h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "200px" }}
                  transition={{ duration: 1, delay: 2.5, ease: "easeOut" }}
                />
              </motion.div>

              {/* Floating particles around the title */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"
                  style={{
                    left: `${10 + Math.random() * 80}%`,
                    top: `${10 + Math.random() * 80}%`,
                  }}
                  animate={{
                    y: [-20, -40, -20],
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.5 + 2,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 3 }}
              className="max-w-4xl mx-auto space-y-6 mt-12"
            >
              <p className="text-xl text-white/80 leading-relaxed">
                Deep Research is a specialized project research assistant
                designed for the crypto space that generates comprehensive
                reports on any topic following a workflow similar to{" "}
                <span className="text-purple-300 font-semibold">OpenAI</span>{" "}
                and{" "}
                <span className="text-blue-300 font-semibold">
                  Gemini Deep Research
                </span>
                .
              </p>
              <p className="text-lg text-white/70 leading-relaxed">
                It allows you to customize the models, prompts, report
                structure, search API, and research depth to get the most
                accurate and relevant information for your needs.
              </p>
            </motion.div>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Key Features */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 3.5 }}
            >
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <SparklesIcon className="w-5 h-5 text-white" />
                </div>
                Key Features
              </h3>
              <div className="space-y-4">
                {keyFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 3.6 + index * 0.1 }}
                  >
                    <HoverCard className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                          {feature.icon}
                        </div>
                        <div>
                          <h4 className="text-white font-semibold mb-2">
                            {feature.title}
                          </h4>
                          <p className="text-white/70 text-sm">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </HoverCard>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Use Cases */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 3.7 }}
            >
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <LightBulbIcon className="w-5 h-5 text-white" />
                </div>
                Use Cases
              </h3>
              <div className="space-y-4">
                {useCases.map((useCase, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 3.8 + index * 0.1 }}
                  >
                    <HoverCard className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                          {useCase.icon}
                        </div>
                        <div>
                          <h4 className="text-white font-semibold mb-2">
                            {useCase.title}
                          </h4>
                          <p className="text-white/70 text-sm">
                            {useCase.description}
                          </p>
                        </div>
                      </div>
                    </HoverCard>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 4.5 }}
            className="text-center"
          >
            <Link href="/agent-store/deep-research">
              <GlowingButton
                size="lg"
                glowColor="purple"
                className="font-semibold tracking-wide"
              >
                <SparklesIcon className="w-5 h-5" />
                Try Deep Research
              </GlowingButton>
            </Link>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 4.7 }}
              className="mt-4 text-white/60 text-sm"
            >
              Experience the future of crypto research • No setup required
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DeepResearchSection;
