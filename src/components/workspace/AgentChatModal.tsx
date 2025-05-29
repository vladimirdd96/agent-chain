"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AgentType } from "@/lib/mindmint-sdk/types";
import { PrebuiltAgent } from "@/types/agent";
import {
  XMarkIcon,
  PaperAirplaneIcon,
  SparklesIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface AgentChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  agent: AgentType | PrebuiltAgent;
  isPremium?: boolean; // Whether user has minted/owns this agent
}

export function AgentChatModal({
  isOpen,
  onClose,
  agent,
  isPremium = false,
}: AgentChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      // Initialize with welcome message
      const welcomeMessage: Message = {
        id: "welcome",
        role: "assistant",
        content: `Hello! I'm ${agent.name}. ${
          isPremium
            ? "As a premium user, you have access to all my advanced features!"
            : "You're using the free version. Mint me as an NFT to unlock my full capabilities!"
        } How can I help you today?`,
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    } else {
      setMessages([]);
    }
  }, [isOpen, agent.name, isPremium]);

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content: `You are ${agent.name}. ${agent.description}. ${
                isPremium
                  ? "This user has premium access, so provide detailed, advanced responses with all available features."
                  : "This user is using the free version, so provide helpful but limited responses and occasionally mention that premium features are available by minting the agent as an NFT."
              }`,
            },
            ...messages.map((msg) => ({
              role: msg.role,
              content: msg.content,
            })),
            {
              role: "user",
              content: inputValue,
            },
          ],
          isPremium,
          agentType: agent.name,
        }),
      });

      const data = await response.json();

      if (data.message) {
        const assistantMessage: Message = {
          id: Date.now().toString() + "_assistant",
          role: "assistant",
          content: data.message,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        id: Date.now().toString() + "_error",
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-black/90 backdrop-blur-xl border border-white/20 rounded-2xl w-full max-w-2xl h-[600px] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600/40 via-pink-500/40 to-blue-600/40 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                  <SparklesIcon className="w-5 h-5 text-white/80" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    {agent.name}
                    {isPremium && (
                      <ShieldCheckIcon className="w-4 h-4 text-green-400" />
                    )}
                  </h3>
                  <p className="text-sm text-white/70">
                    {isPremium ? "Premium Version" : "Free Version"}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-white/70 hover:text-white transition-colors"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                      message.role === "user"
                        ? "bg-purple-600 text-white"
                        : "bg-white/10 text-white"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white/10 text-white max-w-xs lg:max-w-md px-4 py-2 rounded-2xl">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce delay-75" />
                      <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce delay-150" />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-6 border-t border-white/10">
              {!isPremium && (
                <div className="mb-3 p-3 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
                  <p className="text-yellow-400 text-sm">
                    💡 You're using the free version. Mint this agent to unlock
                    premium features and unlimited conversations!
                  </p>
                </div>
              )}
              <div className="flex gap-3">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-purple-500 resize-none"
                  rows={1}
                  style={{ minHeight: "48px", maxHeight: "120px" }}
                />
                <button
                  onClick={sendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  className="p-3 bg-purple-600 hover:bg-purple-700 disabled:bg-white/10 disabled:text-white/30 text-white rounded-xl transition-colors"
                >
                  <PaperAirplaneIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
