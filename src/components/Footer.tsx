"use client";

import React from "react";
import type { FC } from "react";
import Link from "next/link";

const Footer: FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-8 px-4 bg-black/50 backdrop-blur-md border-t border-white/10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Agent Chain</h3>
            <p className="text-white/70">
              Building the future of automated AI agents
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Products</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/agent-store"
                  className="text-white/70 hover:text-white"
                >
                  Agent Store
                </Link>
              </li>
              <li>
                <Link href="/tools" className="text-white/70 hover:text-white">
                  Tools
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-white/70 hover:text-white"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/docs" className="text-white/70 hover:text-white">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-white/70 hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="text-white/70 hover:text-white"
                >
                  Support
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Connect</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="https://twitter.com/agentchain"
                  className="text-white/70 hover:text-white"
                >
                  Twitter
                </Link>
              </li>
              <li>
                <Link
                  href="https://discord.gg/agentchain"
                  className="text-white/70 hover:text-white"
                >
                  Discord
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/agentchain"
                  className="text-white/70 hover:text-white"
                >
                  GitHub
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center text-white/50">
          <p>&copy; {currentYear} Agent Chain. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
