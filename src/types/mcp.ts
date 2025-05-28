export interface MCPService {
  id: string;
  name: string;
  description: string;
  fullDescription?: string;
  icon: string;
  category: MCPCategory;
  supportedChains: string[];
  features: string[];
  integrationModes: IntegrationMode[];
  usageStats: {
    totalCalls: number;
    activeAgents: number;
    successRate: number;
  };
  owner: {
    name: string;
    wallet: string;
    avatar?: string;
  };
  endpoint: string;
  apiDocumentation?: string;
  isPublic: boolean;
  isVerified: boolean;
  price: number; // Price in ETH for premium services
  isPremium: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IntegrationMode {
  type: 'STDIO' | 'SSE' | 'HTTP' | 'WebSocket';
  description: string;
  configuration?: Record<string, any>;
}

export type MCPCategory = 
  | 'Analytics'
  | 'Data Feed'
  | 'DeFi'
  | 'NFT'
  | 'Trading'
  | 'Research'
  | 'AI/ML'
  | 'Social'
  | 'Infrastructure'
  | 'Security';

export interface MCPServiceFilter {
  search?: string;
  categories: MCPCategory[];
  chains: string[];
  features: string[];
  integrationModes: string[];
  priceRange?: {
    min: number;
    max: number;
  };
  showFreeOnly?: boolean;
  showVerifiedOnly?: boolean;
}

export interface CreateMCPServiceRequest {
  name: string;
  description: string;
  fullDescription: string;
  icon: string;
  category: MCPCategory;
  supportedChains: string[];
  features: string[];
  integrationModes: IntegrationMode[];
  endpoint: string;
  apiDocumentation?: string;
  isPublic: boolean;
  price: number;
  isPremium: boolean;
}

export interface MCPServiceStats {
  totalServices: number;
  totalCategories: number;
  totalIntegrations: number;
  averageRating: number;
} 