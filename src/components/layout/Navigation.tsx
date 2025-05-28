"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bars3Icon,
  XMarkIcon,
  SparklesIcon,
  RocketLaunchIcon,
  WalletIcon,
} from "@heroicons/react/24/outline";
import WalletButton from "@/components/auth/WalletButton";
import { Button } from "@/components/ui/Button";

export function Navigation() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showWalletTooltip, setShowWalletTooltip] = useState(false);

  const navItems = [
    { name: "WorkSpace", href: "/workspace" },
    { name: "Agent Store", href: "/agent-store" },
    { name: "Tools", href: "/tools" },
    { name: "Docs", href: "/docs" },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        !(event.target as Element).closest(".mobile-menu")
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-black/80 backdrop-blur-xl border-b border-purple-500/20 shadow-lg shadow-purple-500/10"
            : "bg-black/30 backdrop-blur-md border-b border-white/10"
        }`}
      >
        {/* Animated border glow */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"
          animate={{
            opacity: [0.3, 0.8, 0.3],
            scaleX: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <nav className="container mx-auto px-4 h-20 flex items-center justify-between">
          {/* Logo Section */}
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.02 }}
          >
            <Link href="/" className="group relative">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                {/* Logo glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                <div className="relative flex items-center space-x-2">
                  <motion.div
                    className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 flex items-center justify-center"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <SparklesIcon className="w-5 h-5 text-white" />
                  </motion.div>

                  <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-blue-300">
                    AgentChain
                  </span>
                </div>
              </motion.div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
              >
                <Link
                  href={item.href}
                  className={`relative group px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    pathname === item.href
                      ? "text-white"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {/* Active item glow */}
                  {pathname === item.href && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg border border-purple-500/30"
                      initial={false}
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}

                  {/* Hover effect */}
                  <motion.div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Animated underline */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />

                  <span className="relative z-10">{item.name}</span>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            {/* Create Agent Button - Desktop */}
            <motion.div
              className="hidden md:block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Link href="/deploy">
                <motion.div
                  className="group relative overflow-hidden px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Animated background gradient */}
                  <motion.div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />

                  {/* Shimmer effect */}
                  <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000" />

                  <div className="relative flex items-center space-x-2">
                    <RocketLaunchIcon className="w-4 h-4" />
                    <span>Create Agent</span>
                  </div>
                </motion.div>
              </Link>
            </motion.div>

            {/* Wallet Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <WalletButton />
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              className="lg:hidden p-2 text-white hover:text-purple-300 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <span className="sr-only">Toggle menu</span>
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Bars3Icon className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 120 }}
              className="mobile-menu fixed top-0 right-0 z-50 h-full w-80 bg-black/90 backdrop-blur-xl border-l border-purple-500/20 lg:hidden"
            >
              {/* Mobile menu content */}
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                  <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-300">
                    Menu
                  </span>
                  <motion.button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-white/70 hover:text-white transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </motion.button>
                </div>

                {/* Navigation Items */}
                <div className="flex-1 px-6 py-8 space-y-4">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                    >
                      <Link
                        href={item.href}
                        className={`block group relative px-4 py-4 text-lg font-medium transition-all duration-300 rounded-xl ${
                          pathname === item.href
                            ? "text-white bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30"
                            : "text-white/70 hover:text-white hover:bg-white/5"
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <motion.div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span className="relative z-10">{item.name}</span>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Mobile Action Buttons */}
                <div className="p-6 border-t border-white/10 space-y-4">
                  <Link
                    href="/deploy"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <motion.div
                      className="group relative overflow-hidden w-full px-6 py-4 text-center font-medium text-white bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                      <div className="relative flex items-center justify-center space-x-2">
                        <RocketLaunchIcon className="w-5 h-5" />
                        <span>Create Agent</span>
                      </div>
                    </motion.div>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
