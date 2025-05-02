"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import WalletButton from "@/components/auth/WalletButton";

export function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { name: "WorkSpace", href: "/workspace" },
    { name: "Agent Store", href: "/store" },
    { name: "Tools", href: "/tools" },
    { name: "Docs", href: "/docs" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-xl font-bold text-white">
            AgentChain
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? "text-white"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Link
            href="/deploy"
            className="hidden md:block px-4 py-2 text-sm font-medium text-white bg-purple-500/20 rounded-lg border border-purple-500/30 hover:bg-purple-500/30 transition-colors"
          >
            Create Agent
          </Link>
          <WalletButton />
        </div>
      </nav>
    </header>
  );
}
