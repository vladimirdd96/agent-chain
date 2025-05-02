import { motion } from "framer-motion";

export const AuroraBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      <motion.div
        className="absolute -inset-[10px] opacity-50"
        style={{
          background: "linear-gradient(to right, #4f46e5, #e11d48, #3b82f6)",
          filter: "blur(100px)",
        }}
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
    </div>
  );
};
