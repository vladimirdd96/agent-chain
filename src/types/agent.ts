export interface PrebuiltAgent {
  id: string;
  name: string;
  description: string;
  chainCompatibility: string[];
  features: string[];
  visualRepresentation: string;
  avatar: string;
  category:
    | "Analytics"
    | "DeFi"
    | "NFT"
    | "Trading"
    | "Research"
    | "Generalist";
  isMinted: boolean;
  owner?: string;
  ownerWallet?: string;
  mintDate?: Date | string;
  price: number;
  interactionHistory?: AgentInteraction[];
  capabilities?: AgentCapability[];
  type?: "prebuilt" | "minted";
  nftMintAddress?: string;
  isOwned?: boolean;
}

export interface AgentCapability {
  id: string;
  name: string;
  description: string;
  requiresMinting: boolean;
  moralisEndpoints?: string[];
}

export interface AgentInteraction {
  id: string;
  agentId: string;
  userId: string;
  interactionType: "view" | "mint" | "use_feature";
  timestamp: Date;
  data?: any;
}

export interface BlockchainData {
  tokenPrice?: number;
  marketCap?: number;
  volume24h?: number;
  priceChange24h?: number;
  holders?: number;
  transactions24h?: number;
}

export interface NFTData {
  collection: string;
  floorPrice?: number;
  volume24h?: number;
  sales24h?: number;
  owners?: number;
  totalSupply?: number;
}

export interface DeFiData {
  protocol: string;
  tvl?: number;
  apy?: number;
  yieldOpportunities?: YieldOpportunity[];
}

export interface YieldOpportunity {
  protocol: string;
  pair: string;
  apy: number;
  tvl: number;
  risk: "low" | "medium" | "high";
  chain: string;
}

export interface TokenAnalysis {
  symbol: string;
  address: string;
  chain: string;
  price: number;
  marketCap: number;
  volume24h: number;
  priceChange24h: number;
  sentiment: "bullish" | "bearish" | "neutral";
  riskScore: number;
  recommendation: "buy" | "sell" | "hold";
}
