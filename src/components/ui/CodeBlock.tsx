"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneDark,
  oneLight,
  vscDarkPlus,
  materialDark,
  atomDark,
  nord,
  nightOwl,
  duotoneDark,
  duotoneLight,
  synthwave84,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  ClipboardDocumentIcon,
  CheckIcon,
  CodeBracketIcon,
} from "@heroicons/react/24/outline";

interface CodeBlockProps {
  code: string;
  language: string;
  fileName?: string;
  showLineNumbers?: boolean;
  theme?: "dark" | "light" | "auto";
  variant?: "default" | "compact" | "minimal";
  maxHeight?: string;
  className?: string;
}

const themes = {
  dark: {
    oneDark,
    vscDarkPlus,
    materialDark,
    atomDark,
    nord,
    nightOwl,
    duotoneDark,
    synthwave84,
  },
  light: {
    oneLight,
    duotoneLight,
  },
};

const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language,
  fileName,
  showLineNumbers = true,
  theme = "dark",
  variant = "default",
  maxHeight = "500px",
  className = "",
}) => {
  const [copied, setCopied] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("oneDark");

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const getStyle = () => {
    if (theme === "dark") {
      return themes.dark[currentTheme as keyof typeof themes.dark] || oneDark;
    } else if (theme === "light") {
      return (
        themes.light[currentTheme as keyof typeof themes.light] || oneLight
      );
    }
    // Auto theme - for now defaulting to dark, but could be extended to detect system preference
    return oneDark;
  };

  const getLanguageIcon = (lang: string) => {
    const iconMap: { [key: string]: string } = {
      javascript: "🟨",
      typescript: "🔷",
      jsx: "⚛️",
      tsx: "⚛️",
      python: "🐍",
      java: "☕",
      html: "🌐",
      css: "🎨",
      scss: "🎨",
      json: "📄",
      yaml: "📋",
      sql: "🗄️",
      bash: "💻",
      shell: "💻",
      solidity: "💎",
      rust: "🦀",
      go: "🐹",
    };
    return iconMap[lang.toLowerCase()] || "📝";
  };

  const variantStyles = {
    default: "border border-white/10 rounded-xl backdrop-blur-md",
    compact: "border border-white/5 rounded-lg",
    minimal: "border-l-4 border-purple-500/50 rounded-r-lg",
  };

  if (variant === "minimal") {
    return (
      <motion.div
        className={`relative group ${variantStyles[variant]} ${className}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between bg-black/30 backdrop-blur-md px-4 py-2">
          <div className="flex items-center gap-2">
            <span className="text-lg">{getLanguageIcon(language)}</span>
            <span className="text-sm text-white/70 font-medium">
              {language}
            </span>
          </div>
          <motion.button
            onClick={copyToClipboard}
            className="flex items-center gap-2 px-2 py-1 text-xs text-white/60 hover:text-white transition-colors rounded-md hover:bg-white/10"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {copied ? (
              <CheckIcon className="w-3 h-3" />
            ) : (
              <ClipboardDocumentIcon className="w-3 h-3" />
            )}
          </motion.button>
        </div>
        <div
          className="bg-black/20 backdrop-blur-md overflow-x-auto"
          style={{ maxHeight }}
        >
          <SyntaxHighlighter
            language={language}
            style={getStyle()}
            showLineNumbers={false}
            customStyle={{
              margin: 0,
              padding: "12px 16px",
              background: "transparent",
              fontSize: "14px",
              lineHeight: "1.5",
            }}
            codeTagProps={{
              style: {
                fontFamily:
                  '"Fira Code", "JetBrains Mono", Consolas, "Courier New", monospace',
              },
            }}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`relative group ${variantStyles[variant]} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between bg-gray-900/50 backdrop-blur-md border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="text-xl">{getLanguageIcon(language)}</span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-white/90 font-medium">
                {language}
              </span>
              {fileName && (
                <>
                  <span className="text-white/30">•</span>
                  <span className="text-xs text-white/60 font-mono">
                    {fileName}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Theme selector for variants that support it */}
          {variant === "default" && theme !== "auto" && (
            <div className="flex items-center gap-1 mr-2">
              {Object.keys(themes[theme as keyof typeof themes])
                .slice(0, 3)
                .map((themeName) => (
                  <button
                    key={themeName}
                    onClick={() => setCurrentTheme(themeName)}
                    className={`w-3 h-3 rounded-full border transition-all ${
                      currentTheme === themeName
                        ? "border-white/60 scale-110"
                        : "border-white/20 hover:border-white/40"
                    }`}
                    style={{
                      background:
                        themeName.includes("Dark") ||
                        themeName.includes("night")
                          ? "#1a1a1a"
                          : themeName.includes("Light")
                          ? "#f8f8f8"
                          : "#2d3748",
                    }}
                  />
                ))}
            </div>
          )}

          <motion.button
            onClick={copyToClipboard}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-white/70 hover:text-white transition-colors rounded-md hover:bg-white/10"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {copied ? (
              <>
                <CheckIcon className="w-4 h-4" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <ClipboardDocumentIcon className="w-4 h-4" />
                <span>Copy</span>
              </>
            )}
          </motion.button>
        </div>
      </div>

      {/* Code Content */}
      <div
        className="bg-gray-900/30 backdrop-blur-md overflow-x-auto custom-scrollbar"
        style={{ maxHeight }}
      >
        <SyntaxHighlighter
          language={language}
          style={getStyle()}
          showLineNumbers={showLineNumbers}
          customStyle={{
            margin: 0,
            padding: variant === "compact" ? "12px 16px" : "20px 24px",
            background: "transparent",
            fontSize: "14px",
            lineHeight: "1.6",
          }}
          lineNumberStyle={{
            color: "rgba(255, 255, 255, 0.3)",
            paddingRight: "16px",
            userSelect: "none",
            fontSize: "12px",
          }}
          codeTagProps={{
            style: {
              fontFamily:
                '"Fira Code", "JetBrains Mono", Consolas, "Courier New", monospace',
            },
          }}
          wrapLines={true}
          wrapLongLines={true}
        >
          {code}
        </SyntaxHighlighter>
      </div>

      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 rounded-xl pointer-events-none" />
    </motion.div>
  );
};

export default CodeBlock;
