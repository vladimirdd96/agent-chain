import { useState, useCallback } from "react";
import { useMindMint } from "./useMindMint";
import { WalletAnalytics } from "@/lib/mindmint-sdk/types";

export function useWalletAnalytics() {
  const client = useMindMint();
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
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Failed to fetch wallet analytics";
        console.warn("Wallet analytics error (non-blocking):", errorMessage);
        setError(errorMessage);
        setAnalytics(null);
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
