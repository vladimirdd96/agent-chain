"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Disclosure, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";

const faqs = [
  {
    question: "What is DeepCore's Grand Vision and How to Achieve It?",
    answer:
      "DeepCore aims to revolutionize Web3 AI infrastructure by creating a seamless ecosystem for composable AI agents. We achieve this through our MCP protocol, advanced agent architecture, and comprehensive development tools.",
  },
  {
    question:
      "Why is DeepCore the Leader in Next-Gen Web3 AI Agent Architecture?",
    answer:
      "DeepCore leads through its innovative MCP protocol, extensive model hub integration, and powerful agent composition capabilities. Our platform enables unprecedented flexibility and interoperability in AI agent development.",
  },
  {
    question: "Target Audiences: How to Accelerate Ecosystem Adoption?",
    answer:
      "DeepCore caters to developers, traders, researchers, and businesses in the Web3 space. We accelerate adoption through comprehensive documentation, easy-to-use APIs, and ready-to-deploy agent templates.",
  },
  {
    question: "Why Choose MCP as DeepCore's Core Development Framework?",
    answer:
      "MCP (Model Context Protocol) provides a standardized way to create, compose, and deploy AI agents. It ensures interoperability, scalability, and seamless integration with existing tools and platforms.",
  },
  {
    question: "Use Cases: How Do Developers and Users Profit?",
    answer:
      "Developers can monetize their agents through our marketplace, while users benefit from powerful AI tools for trading, research, and automation. Our ecosystem creates value through agent composition and specialization.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Disclosure>
                {({ open }) => (
                  <div className="bg-black/50 backdrop-blur-md border border-white/10 rounded-lg overflow-hidden">
                    <Disclosure.Button className="flex justify-between items-center w-full px-6 py-4">
                      <span className="text-lg font-medium text-white">
                        {faq.question}
                      </span>
                      <ChevronUpIcon
                        className={`${
                          open ? "transform rotate-180" : ""
                        } w-5 h-5 text-purple-400 transition-transform duration-300`}
                      />
                    </Disclosure.Button>

                    <Transition
                      enter="transition duration-100 ease-out"
                      enterFrom="transform scale-95 opacity-0"
                      enterTo="transform scale-100 opacity-100"
                      leave="transition duration-75 ease-out"
                      leaveFrom="transform scale-100 opacity-100"
                      leaveTo="transform scale-95 opacity-0"
                    >
                      <Disclosure.Panel className="px-6 py-4 text-white/70">
                        {faq.answer}
                      </Disclosure.Panel>
                    </Transition>
                  </div>
                )}
              </Disclosure>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
