"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";

export interface GlowingButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "outline";
  disabled?: boolean;
  glowColor?: string;
}

export const GlowingButton = ({
  children,
  className,
  onClick,
  size = "md",
  variant = "primary",
  disabled = false,
  glowColor = "purple",
}: GlowingButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white",
    secondary:
      "bg-white/10 hover:bg-white/20 text-white border border-white/20",
    outline: "border border-white/30 hover:bg-white/10 text-white",
  };

  const glowColors = {
    purple: "shadow-purple-500/50",
    blue: "shadow-blue-500/50",
    green: "shadow-green-500/50",
    pink: "shadow-pink-500/50",
  };

  return (
    <motion.button
      className={clsx(
        "relative inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 overflow-hidden group",
        sizeClasses[size],
        variantClasses[variant],
        isHovered && !disabled && "shadow-2xl",
        isHovered &&
          !disabled &&
          glowColors[glowColor as keyof typeof glowColors],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={disabled ? {} : { scale: 1.05 }}
      whileTap={disabled ? {} : { scale: 0.95 }}
      disabled={disabled}
    >
      {/* Background glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-purple-500/20"
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Animated border */}
      <motion.div
        className="absolute inset-0 rounded-lg"
        style={{
          background: `linear-gradient(45deg, transparent, ${
            glowColor === "purple"
              ? "rgba(147, 51, 234, 0.3)"
              : "rgba(59, 130, 246, 0.3)"
          }, transparent)`,
          backgroundSize: "400% 400%",
        }}
        animate={{
          backgroundPosition: isHovered ? ["0% 0%", "100% 100%"] : ["0% 0%"],
        }}
        transition={{
          duration: 1.5,
          repeat: isHovered ? Infinity : 0,
          ease: "linear",
        }}
      />

      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
        animate={{
          x: isHovered ? ["-100%", "200%"] : ["-100%"],
        }}
        transition={{
          duration: 1.5,
          repeat: isHovered ? Infinity : 0,
          repeatDelay: 1,
          ease: "easeInOut",
        }}
      />

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">{children}</span>

      {/* Particle effects on hover */}
      {isHovered && !disabled && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/60 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                y: [-10, -30],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      )}
    </motion.button>
  );
};

export default GlowingButton;
