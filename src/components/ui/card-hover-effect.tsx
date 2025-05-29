"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";

export interface HoverCardProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

export const HoverCard = ({
  children,
  className,
  containerClassName,
}: HoverCardProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  return (
    <div
      className={clsx("relative group", containerClassName)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <motion.div
        className={clsx(
          "relative bg-black/50 backdrop-blur-md border border-white/10 rounded-xl p-6 transition-all duration-300 group-hover:border-purple-500/30",
          className
        )}
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Spotlight effect */}
        {isHovering && (
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl"
            style={{
              background: `radial-gradient(200px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(147, 51, 234, 0.1), transparent 70%)`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovering ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        )}

        {/* Animated border */}
        <motion.div
          className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            backgroundSize: "200% 200%",
            padding: "1px",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "xor",
          }}
        />

        {children}
      </motion.div>
    </div>
  );
};

export interface HoverCardItemProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  className?: string;
}

export const HoverCardItem = ({
  title,
  description,
  icon,
  className,
}: HoverCardItemProps) => {
  return (
    <HoverCard className={className}>
      <div className="space-y-4">
        {icon && (
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
            {icon}
          </div>
        )}
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
          <p className="text-white/70">{description}</p>
        </div>
      </div>
    </HoverCard>
  );
};
