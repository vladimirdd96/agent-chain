import {
  AgentType,
  AgentWithStats,
  TokenInfo,
  WalletAnalytics,
  PaginationParams,
  AgentListResponse,
  AgentDeployParams,
  ClientConfig,
} from "./types";

export class AgentChainClient {
  private baseUrl: string;
  private apiKey?: string;

  constructor(config: ClientConfig = {}) {
    this.baseUrl = config.baseUrl || "https://api.agentchain.dev";
    this.apiKey = config.apiKey;
  }

  private async fetch<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const headers = {
      "Content-Type": "application/json",
      ...(this.apiKey && { "X-API-Key": this.apiKey }),
      ...options.headers,
    };

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || "Request failed");
    }

    return response.json();
  }

  async listAgents(params?: PaginationParams): Promise<AgentListResponse> {
    // TODO: Implement actual API call
    return {
      agents: [],
      pagination: {
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0,
      },
    };
  }

  async getAgent(id: string): Promise<AgentWithStats | null> {
    // TODO: Implement actual API call
    return null;
  }

  async deployAgent(params: AgentDeployParams): Promise<AgentType> {
    // TODO: Implement actual API call
    throw new Error("Not implemented");
  }

  async getTokenInfo(
    address: string,
    chain: string = "solana"
  ): Promise<TokenInfo> {
    return this.fetch<{ token: TokenInfo }>(
      `/token-info?address=${address}&chain=${chain}`
    ).then((res) => res.token);
  }

  async getWalletAnalytics(
    address: string,
    chain: string = "solana"
  ): Promise<WalletAnalytics> {
    return this.fetch<{ analytics: WalletAnalytics }>(
      `/wallet/${address}/analytics?chain=${chain}`
    ).then((res) => res.analytics);
  }

  async getTools(): Promise<Record<string, any>> {
    return this.fetch<{ tools: Record<string, any> }>("/tools").then(
      (res) => res.tools
    );
  }
}
