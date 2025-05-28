import { useMemo } from "react";
import { MindMintClient } from "@/lib/mindmint-sdk";

export function useMindMint() {
  const client = useMemo(() => {
    return new MindMintClient({
      baseUrl: process.env.NEXT_PUBLIC_APP_URL + "/api",
    });
  }, []);

  return client;
}
