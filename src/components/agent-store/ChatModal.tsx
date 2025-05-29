"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  XMarkIcon,
  PaperAirplaneIcon,
  SparklesIcon,
  UserIcon,
  ChevronDownIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { PrebuiltAgent } from "@/types/agent";
import { useWallet } from "@/components/auth/hooks/useWallet";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  agent: PrebuiltAgent;
}

const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose, agent }) => {
  const { connected } = useWallet();
  const isOwned = (connected && agent.isOwned) || agent.isMinted;
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: `Hello! I'm ${
        agent.name
      }, your AI assistant. I specialize in ${agent.category.toLowerCase()} and I'm here to help you with ${agent.description.toLowerCase()}. ${
        isOwned
          ? "As an owner, you have full access to all my premium features and capabilities!"
          : "You're currently using the free version with limited features. Consider minting me as an NFT to unlock my full potential!"
      } How can I assist you today?`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(({ role, content }) => ({
            role,
            content,
          })),
          agentContext: {
            name: agent.name,
            description: agent.description,
            category: agent.category,
            capabilities: agent.capabilities,
            isOwned,
          },
          isPremium: isOwned,
          agentType: agent.category,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.message,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "I apologize, but I'm having trouble connecting right now. Please try again in a moment.",
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
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", duration: 0.3 }}
          className="bg-black/90 backdrop-blur-xl border border-white/20 rounded-2xl w-full max-w-4xl h-[80vh] flex flex-col overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center text-2xl">
                  {agent.visualRepresentation}
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-black/90"></div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{agent.name}</h3>
                <p className="text-sm text-white/60">
                  {agent.category} •{" "}
                  {isOwned ? (
                    <span className="flex items-center gap-1 text-green-400">
                      <CheckCircleIcon className="w-3 h-3" />
                      Premium Access
                    </span>
                  ) : (
                    "Try Free Version"
                  )}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-white/60 hover:text-white transition-colors"
              >
                <ChevronDownIcon className="w-5 h-5" />
              </motion.button>
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-white/60 hover:text-white transition-colors"
              >
                <XMarkIcon className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.role === "assistant" && (
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-lg flex-shrink-0">
                    {agent.visualRepresentation}
                  </div>
                )}

                <div
                  className={`max-w-[70%] ${
                    message.role === "user"
                      ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                      : "bg-white/10 text-white"
                  } rounded-2xl px-4 py-3`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {message.content}
                  </p>
                  <div
                    className={`text-xs mt-2 ${
                      message.role === "user"
                        ? "text-white/70"
                        : "text-white/50"
                    }`}
                  >
                    {formatTime(message.timestamp)}
                  </div>
                </div>

                {message.role === "user" && (
                  <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <UserIcon className="w-4 h-4 text-white/70" />
                  </div>
                )}
              </motion.div>
            ))}

            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-3 justify-start"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-lg">
                  {agent.visualRepresentation}
                </div>
                <div className="bg-white/10 rounded-2xl px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
                      <div
                        className="w-2 h-2 bg-white/60 rounded-full animate-pulse"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-white/60 rounded-full animate-pulse"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                    <span className="text-xs text-white/50">Thinking...</span>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-6 border-t border-white/10">
            <div className="relative">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={`Chat with ${agent.name}...`}
                rows={3}
                className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 pr-12 text-white placeholder-white/50 resize-none focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all"
                disabled={isLoading}
              />
              <motion.button
                onClick={handleSendMessage}
                disabled={!input.trim() || isLoading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="absolute bottom-3 right-3 p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <PaperAirplaneIcon className="w-4 h-4" />
              </motion.button>
            </div>
            <div className="flex items-center justify-between mt-3 text-xs text-white/50">
              <div className="flex items-center gap-2">
                <SparklesIcon className="w-4 h-4" />
                <span>
                  {isOwned
                    ? "Premium access • Full features unlocked"
                    : "Free version • Limited features"}
                </span>
              </div>
              <span>Press Enter to send, Shift+Enter for new line</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ChatModal;
