"use client";

import React, { useState } from "react";
import { useWallet } from "./hooks/useWallet";

const WalletButton = () => {
  const { connected, connecting, connect, disconnect } = useWallet();
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    try {
      setError(null);
      if (connected) {
        await disconnect();
      } else {
        await connect();
      }
    } catch (error) {
      console.error("Wallet connection error:", error);
      setError(
        error instanceof Error ? error.message : "Failed to connect wallet"
      );

      setTimeout(() => setError(null), 5000);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        disabled={connecting}
        className={`
          inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-lg transition-all duration-300
          ${
            connected
              ? "text-white bg-red-500/20 hover:bg-red-500/30 border border-red-500/50"
              : "text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
          }
          ${connecting ? "opacity-50 cursor-not-allowed" : ""}
        `}
      >
        {connecting
          ? "Connecting..."
          : connected
          ? "Disconnect Wallet"
          : "Connect Wallet"}
      </button>

      {error && (
        <div className="absolute top-full left-0 right-0 mt-2 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}
    </div>
  );
};

export default WalletButton;
