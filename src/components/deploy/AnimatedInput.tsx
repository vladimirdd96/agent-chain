"use client";

import React, { useState, forwardRef } from "react";
import { motion } from "framer-motion";

interface AnimatedInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "text" | "textarea" | "select";
  options?: { value: string; label: string }[];
  rows?: number;
  required?: boolean;
  tooltip?: React.ReactNode;
}

const AnimatedInput = forwardRef<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
  AnimatedInputProps
>(
  (
    {
      label,
      value,
      onChange,
      placeholder,
      type = "text",
      options,
      rows = 4,
      required = false,
      tooltip,
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    const handleChange = (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const newValue = e.target.value;
      onChange(newValue);
      setHasValue(newValue.length > 0);
    };

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    const baseInputClasses =
      "w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 transition-all duration-300 focus:outline-none";
    const focusClasses = isFocused
      ? "border-purple-500 shadow-lg shadow-purple-500/20"
      : "hover:border-white/20";
    const valueClasses = hasValue ? "border-white/30" : "";

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-2"
      >
        {/* Label with tooltip */}
        <div className="flex items-center justify-between">
          <motion.label
            className={`block text-white font-medium transition-colors duration-300 ${
              isFocused ? "text-purple-300" : "text-white"
            }`}
            animate={{
              scale: isFocused ? 1.02 : 1,
              color: isFocused ? "#c084fc" : "#ffffff",
            }}
            transition={{ duration: 0.2 }}
          >
            {label}
            {required && (
              <motion.span
                className="text-red-400 ml-1"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                *
              </motion.span>
            )}
          </motion.label>
          {tooltip && <div className="ml-2">{tooltip}</div>}
        </div>

        {/* Input field with glow effect */}
        <div className="relative">
          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: isFocused ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Input element */}
          <div className="relative">
            {type === "select" ? (
              <motion.select
                ref={ref as React.Ref<HTMLSelectElement>}
                value={value}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={`${baseInputClasses} ${focusClasses} ${valueClasses} cursor-pointer`}
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <option value="" disabled className="bg-black text-white/60">
                  {placeholder || `Select ${label.toLowerCase()}`}
                </option>
                {options?.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    className="bg-black text-white"
                  >
                    {option.label}
                  </option>
                ))}
              </motion.select>
            ) : type === "textarea" ? (
              <motion.textarea
                ref={ref as React.Ref<HTMLTextAreaElement>}
                value={value}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder={placeholder}
                rows={rows}
                className={`${baseInputClasses} ${focusClasses} ${valueClasses} resize-none`}
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              />
            ) : (
              <motion.input
                ref={ref as React.Ref<HTMLInputElement>}
                type="text"
                value={value}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder={placeholder}
                className={`${baseInputClasses} ${focusClasses} ${valueClasses}`}
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              />
            )}

            {/* Character count for textarea */}
            {type === "textarea" && value && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute bottom-2 right-2 text-xs text-white/40"
              >
                {value.length} chars
              </motion.div>
            )}

            {/* Success indicator */}
            {hasValue && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", damping: 15, stiffness: 300 }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              </motion.div>
            )}
          </div>

          {/* Floating particles on focus */}
          {isFocused && (
            <>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-60 pointer-events-none"
                  style={{
                    left: `${20 + i * 30}%`,
                    top: `${20 + (i % 2) * 60}%`,
                  }}
                  animate={{
                    y: [-5, -15, -5],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.4,
                  }}
                />
              ))}
            </>
          )}
        </div>

        {/* Helper text */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isFocused ? 1 : 0,
            height: isFocused ? "auto" : 0,
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="text-xs text-white/60 mt-1">
            {type === "select" && "Choose the type of agent you want to deploy"}
            {type === "text" &&
              "Enter a unique and descriptive name for your agent"}
            {type === "textarea" &&
              "Provide a detailed description of your agent's capabilities and purpose"}
          </div>
        </motion.div>
      </motion.div>
    );
  }
);

AnimatedInput.displayName = "AnimatedInput";

export default AnimatedInput;
