import { useMemo } from "react";
import { MindMintClient } from "@/lib/mindmint-sdk";

export function useMindMint() {
  const client = useMemo(() => {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL
      ? process.env.NEXT_PUBLIC_APP_URL + "/api"
      : typeof window !== "undefined"
      ? window.location.origin + "/api"
      : "/api";

    return new MindMintClient({
      baseUrl,
    });
  }, []);

  return client;
}
