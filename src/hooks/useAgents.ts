import { useState, useCallback } from "react";
import { useAgentChain } from "./useAgentChain";
import {
  AgentType,
  AgentWithStats,
  PaginationParams,
} from "@/lib/agentchain-sdk/types";

export function useAgents() {
  const client = useAgentChain();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const listAgents = useCallback(
    async (params?: PaginationParams) => {
      try {
        setLoading(true);
        setError(null);
        const response = await client.listAgents(params);
        return response;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch agents");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [client]
  );

  const getAgent = useCallback(
    async (id: string) => {
      try {
        setLoading(true);
        setError(null);
        const agent = await client.getAgent(id);
        return agent;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch agent");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [client]
  );

  const deployAgent = useCallback(
    async (
      name: string,
      description: string,
      type: AgentType["type"],
      parameters: Record<string, any>,
      walletAddress: string
    ) => {
      try {
        setLoading(true);
        setError(null);
        const agent = await client.deployAgent({
          name,
          description,
          type,
          parameters,
          walletAddress,
        });
        return agent;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to deploy agent");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [client]
  );

  return {
    loading,
    error,
    listAgents,
    getAgent,
    deployAgent,
  };
}
