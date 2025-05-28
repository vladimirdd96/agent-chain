export interface AgentType {
  id: string;
  name: string;
  description: string;
  type: "solana" | "evm" | "trade" | "blockchain";
  parameters: Record<string, any>;
  creator_wallet: string;
  is_public: boolean;
  status: "pending" | "active" | "failed";
  nft_mint_address?: string;
  created_at: string;
  updated_at: string;
}

export interface AgentStats {
  deployments: number;
  success_rate: number;
  avg_return: number;
}

export interface AgentWithStats extends AgentType {
  stats: AgentStats;
}

export interface TokenInfo {
  address: string;
  chain: string;
  name: string;
  symbol: string;
  decimals: number;
  price: number;
  price_change_24h?: number;
  market_cap?: number;
}

export interface WalletAnalytics {
  address: string;
  chain: string;
  balance: {
    balance: string;
    decimals: number;
  };
  tokens: Array<{
    token_address: string;
    name: string;
    symbol: string;
    balance: string;
    decimals: number;
    value?: number;
  }>;
  nfts: Array<{
    token_address: string;
    token_id: string;
    amount: string;
    token_uri?: string;
    metadata?: any;
    name?: string;
    symbol?: string;
    collection?: {
      name: string;
      family?: string;
    };
  }>;
  recentTransactions?: Array<{
    hash: string;
    from: string;
    to: string;
    value: string;
    gas_price: string;
    timestamp: string;
  }>;
  totalTokenValue: number;
  uniqueNFTCollections: number;
  transactionCount: number;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: "asc" | "desc";
  creator_wallet?: string;
}

export interface AgentListResponse {
  agents: AgentType[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface AgentDeployParams {
  name: string;
  description: string;
  type: AgentType["type"];
  parameters: Record<string, any>;
  walletAddress: string;
}

export interface ClientConfig {
  baseUrl?: string;
  apiKey?: string;
}
