import { useMemo } from "react";
import { AgentChainClient } from "@/lib/agentchain-sdk";

export function useAgentChain() {
  const client = useMemo(() => {
    return new AgentChainClient({
      baseUrl: process.env.NEXT_PUBLIC_APP_URL + "/api",
    });
  }, []);

  return client;
}
