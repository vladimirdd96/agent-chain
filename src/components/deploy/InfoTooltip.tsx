"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

interface InfoTooltipProps {
  content: string;
  title?: string;
  position?: "top" | "bottom" | "left" | "right";
}

const InfoTooltip: React.FC<InfoTooltipProps> = ({
  content,
  title,
  position = "top",
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 transform -translate-x-1/2 mt-2",
    left: "right-full top-1/2 transform -translate-y-1/2 mr-2",
    right: "left-full top-1/2 transform -translate-y-1/2 ml-2",
  };

  const arrowClasses = {
    top: "top-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-white/20",
    bottom:
      "bottom-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-b-white/20",
    left: "left-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-l-white/20",
    right:
      "right-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-r-white/20",
  };

  return (
    <div className="relative inline-block">
      <motion.div
        className="cursor-pointer"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <InformationCircleIcon className="w-4 h-4 text-white/60 hover:text-white/80 transition-colors" />
      </motion.div>

      <AnimatePresence>
        {isVisible && (
          <>
            {/* Tooltip */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.8,
                y: position === "top" ? 10 : -10,
              }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{
                opacity: 0,
                scale: 0.8,
                y: position === "top" ? 10 : -10,
              }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={`absolute z-50 ${positionClasses[position]} w-64`}
            >
              <div className="bg-black/90 backdrop-blur-xl border border-white/20 rounded-lg p-3 shadow-2xl">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg -z-10 blur-sm" />

                <div className="relative z-10">
                  {title && (
                    <div className="text-white font-semibold text-sm mb-1">
                      {title}
                    </div>
                  )}
                  <div className="text-white/80 text-xs leading-relaxed">
                    {content}
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div
                className={`absolute ${arrowClasses[position]} w-0 h-0 border-4`}
                style={{ borderColor: "transparent" }}
              />
            </motion.div>

            {/* Background overlay for mobile */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
              onClick={() => setIsVisible(false)}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InfoTooltip;
