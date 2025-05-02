import { useState, useCallback } from "react";
import { useAgentChain } from "./useAgentChain";
import { WalletAnalytics } from "@/lib/agentchain-sdk/types";

export function useWalletAnalytics() {
  const client = useAgentChain();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analytics, setAnalytics] = useState<WalletAnalytics | null>(null);

  const getAnalytics = useCallback(
    async (address: string, chain: string = "solana") => {
      try {
        setLoading(true);
        setError(null);
        const data = await client.getWalletAnalytics(address, chain);
        setAnalytics(data);
        return data;
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to fetch wallet analytics"
        );
        return null;
      } finally {
        setLoading(false);
      }
    },
    [client]
  );

  const refreshAnalytics = useCallback(async () => {
    if (analytics?.address) {
      return getAnalytics(analytics.address, analytics.chain);
    }
    return null;
  }, [analytics, getAnalytics]);

  return {
    loading,
    error,
    analytics,
    getAnalytics,
    refreshAnalytics,
  };
}
