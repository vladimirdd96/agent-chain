"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronDownIcon,
  SparklesIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/Button";
import DemoAgentCard from "./DemoAgentCard";
import AnimatedOrb from "./AnimatedOrb";
import ParticleField from "./ParticleField";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Aurora Background Effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -inset-[10px] opacity-40">
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/30 to-purple-500/30 animate-aurora blur-3xl" />
            </div>
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 animate-aurora2 blur-3xl" />
            </div>
          </div>
        </div>

        {/* Animated Orb */}
        <AnimatedOrb />

        {/* Particle Field */}
        <ParticleField />

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-screen py-20">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 px-4 py-2 text-sm text-purple-300 ring-1 ring-inset ring-purple-500/20 backdrop-blur-sm">
                <SparklesIcon className="w-4 h-4" />
                Powered by Moralis & OpenAI
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-white">
                Own the Future of AI —{" "}
              </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400">
                Mint Your Agent as an NFT
              </span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              Unlock live blockchain intelligence and advanced analytics with a
              single click.
              <span className="block mt-2 text-lg text-purple-300">
                Transform your AI agent into a powerful NFT with unlimited
                on-chain capabilities.
              </span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
            >
              <Link href="/deploy">
                <Button
                  variant="primary"
                  size="lg"
                  className="group relative overflow-hidden w-full sm:w-auto"
                >
                  <RocketLaunchIcon className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" />
                  Mint Your Agent
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                </Button>
              </Link>

              <Link href="/store">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Explore Agents
                </Button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0"
            >
              {[
                { label: "Agents Minted", value: "2,847" },
                { label: "Total Volume", value: "$1.2M" },
                { label: "Active Users", value: "15.3K" },
              ].map((stat, index) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="text-2xl font-bold text-white mb-1"
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm text-white/60">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Content - Demo Card */}
          <div className="flex justify-center lg:justify-end">
            <DemoAgentCard />
          </div>
        </div>

        {/* Scroll Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center"
        >
          <div className="text-sm text-white/60 mb-2">Learn how it works</div>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-8 h-8 mx-auto rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center"
          >
            <ChevronDownIcon className="w-5 h-5 text-white/60" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
