"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const Header = () => {
  return (
    <Disclosure
      as="nav"
      className="bg-black/50 backdrop-blur-md border-b border-white/10"
    >
      {({ open }) => (
        <>
          <div className="container mx-auto px-4">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex items-center">
                <Link href="/" className="text-xl font-bold text-white">
                  Agent Chain
                </Link>
              </div>

              {/* Mobile menu button */}
              <div className="flex md:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-white/10">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              {/* Desktop menu */}
              <div className="hidden md:flex md:items-center md:space-x-8">
                <Link
                  href="/agent-store"
                  className="text-white/70 hover:text-white"
                >
                  Agent Store
                </Link>
                <Link href="/tools" className="text-white/70 hover:text-white">
                  Tools
                </Link>
                <Link
                  href="/pricing"
                  className="text-white/70 hover:text-white"
                >
                  Pricing
                </Link>
                <Link href="/docs" className="text-white/70 hover:text-white">
                  Docs
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile menu panel */}
          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 px-4 pb-3 pt-2">
              <Disclosure.Button
                as={Link}
                href="/agent-store"
                className="block text-white/70 hover:text-white py-2"
              >
                Agent Store
              </Disclosure.Button>
              <Disclosure.Button
                as={Link}
                href="/tools"
                className="block text-white/70 hover:text-white py-2"
              >
                Tools
              </Disclosure.Button>
              <Disclosure.Button
                as={Link}
                href="/pricing"
                className="block text-white/70 hover:text-white py-2"
              >
                Pricing
              </Disclosure.Button>
              <Disclosure.Button
                as={Link}
                href="/docs"
                className="block text-white/70 hover:text-white py-2"
              >
                Docs
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Header;
