-- MCP Services Table

-- Table for storing MCP service metadata
CREATE TABLE mcp_services (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    full_description TEXT,
    icon TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Analytics', 'Data Feed', 'DeFi', 'NFT', 'Trading', 'Research', 'AI/ML', 'Social', 'Infrastructure', 'Security')),
    supported_chains TEXT[] NOT NULL,
    features TEXT[] NOT NULL,
    integration_modes JSONB NOT NULL, -- Array of integration mode objects
    usage_stats JSONB DEFAULT '{"totalCalls": 0, "activeAgents": 0, "successRate": 100}',
    owner_name TEXT NOT NULL,
    owner_wallet TEXT NOT NULL,
    owner_avatar TEXT,
    endpoint TEXT NOT NULL,
    api_documentation TEXT,
    is_public BOOLEAN DEFAULT TRUE,
    is_verified BOOLEAN DEFAULT FALSE,
    price DECIMAL(10, 6) DEFAULT 0, -- Price in ETH
    is_premium BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table for tracking MCP service integrations
CREATE TABLE mcp_service_integrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    service_id TEXT REFERENCES mcp_services(id) ON DELETE CASCADE,
    user_wallet TEXT NOT NULL,
    agent_id TEXT, -- Optional reference to agent using this service
    integration_type TEXT NOT NULL CHECK (integration_type IN ('trial', 'integration', 'purchase')),
    integration_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable Row Level Security
ALTER TABLE mcp_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE mcp_service_integrations ENABLE ROW LEVEL SECURITY;

-- Policies for public read access to MCP services
CREATE POLICY "Allow public read access to public mcp services" 
ON mcp_services 
FOR SELECT 
USING (is_public = true);

-- Policies for service owners to manage their services
CREATE POLICY "Allow owners to update their own services" 
ON mcp_services 
FOR UPDATE 
USING (true); -- For now, allow all updates (will be restricted later with auth)

CREATE POLICY "Allow authenticated users to create services" 
ON mcp_services 
FOR INSERT 
WITH CHECK (true); -- For now, allow all inserts

-- Policies for service integrations
CREATE POLICY "Allow users to read their own integrations" 
ON mcp_service_integrations 
FOR SELECT 
USING (true); -- For now, allow all reads

CREATE POLICY "Allow users to insert their own integrations" 
ON mcp_service_integrations 
FOR INSERT 
WITH CHECK (true); -- For now, allow all inserts

-- Trigger to update updated_at on row update
CREATE TRIGGER update_mcp_services_updated_at
BEFORE UPDATE ON mcp_services
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Indexes for better performance
CREATE INDEX idx_mcp_services_category ON mcp_services(category);
CREATE INDEX idx_mcp_services_owner ON mcp_services(owner_wallet);
CREATE INDEX idx_mcp_services_verified ON mcp_services(is_verified);
CREATE INDEX idx_mcp_services_premium ON mcp_services(is_premium);
CREATE INDEX idx_mcp_service_integrations_service_id ON mcp_service_integrations(service_id);
CREATE INDEX idx_mcp_service_integrations_user ON mcp_service_integrations(user_wallet);

-- Insert sample MCP services
INSERT INTO mcp_services (id, name, description, full_description, icon, category, supported_chains, features, integration_modes, owner_name, owner_wallet, endpoint, is_verified, price, is_premium) VALUES
('moralis-web3-api', 'Moralis Web3 API', 'Comprehensive Web3 data provider with real-time blockchain analytics', 'The Moralis Web3 API provides developers with powerful tools to access blockchain data across multiple chains. Features include real-time token prices, NFT metadata, transaction history, and DeFi analytics. Trusted by thousands of developers worldwide.', '🔗', 'Data Feed', 
 ARRAY['Ethereum', 'Polygon', 'Binance Smart Chain', 'Avalanche'], 
 ARRAY['Real-time data', 'Historical analytics', 'NFT metadata', 'Token prices', 'Transaction tracking'], 
 '[{"type": "HTTP", "description": "RESTful API with comprehensive endpoints"}, {"type": "WebSocket", "description": "Real-time data streaming"}]',
 'Moralis', '0x742d35Cc6634C0532925a3b8D9C9B5643C8G4567', 'https://api.moralis.io/v2', true, 0.1, true),

('the-graph-protocol', 'The Graph Protocol', 'Decentralized indexing protocol for blockchain data', 'The Graph is an indexing protocol for querying networks like Ethereum and IPFS. It enables developers to build and publish open APIs called subgraphs that applications can query using GraphQL.', '📊', 'Infrastructure', 
 ARRAY['Ethereum', 'Polygon', 'Arbitrum', 'Optimism'], 
 ARRAY['GraphQL queries', 'Custom subgraphs', 'Real-time indexing', 'Decentralized'], 
 '[{"type": "HTTP", "description": "GraphQL API endpoint"}, {"type": "WebSocket", "description": "Subscription-based real-time updates"}]',
 'The Graph Foundation', '0x9542d35Cc6634C0532925a3b8D9C9B5643C8F1234', 'https://api.thegraph.com/subgraphs/name/', true, 0.05, true),

('chainlink-price-feeds', 'Chainlink Price Feeds', 'Decentralized oracle network providing secure price data', 'Chainlink Price Feeds provide tamper-proof inputs and outputs for complex smart contracts on any blockchain. Access real-time price data for thousands of assets with proven reliability and security.', '🔮', 'Analytics', 
 ARRAY['Ethereum', 'Polygon', 'Binance Smart Chain', 'Avalanche', 'Arbitrum'], 
 ARRAY['Price feeds', 'Decentralized oracles', 'High reliability', 'Tamper-proof'], 
 '[{"type": "HTTP", "description": "REST API for price data"}, {"type": "STDIO", "description": "Direct smart contract integration"}]',
 'Chainlink Labs', '0x1542d35Cc6634C0532925a3b8D9C9B5643C8F5678', 'https://api.chain.link/v1', true, 0, false),

('opensea-api', 'OpenSea NFT API', 'Comprehensive NFT marketplace data and trading capabilities', 'Access the world''s largest NFT marketplace data including collections, assets, events, and trading functionality. Perfect for building NFT applications and analytics tools.', '🌊', 'NFT', 
 ARRAY['Ethereum', 'Polygon'], 
 ARRAY['NFT collections', 'Asset metadata', 'Trading events', 'Market analytics'], 
 '[{"type": "HTTP", "description": "REST API with comprehensive NFT data"}, {"type": "WebSocket", "description": "Real-time event streaming"}]',
 'OpenSea', '0x2542d35Cc6634C0532925a3b8D9C9B5643C8F9012', 'https://api.opensea.io/api/v1', true, 0.08, true),

('uniswap-v3-analytics', 'Uniswap V3 Analytics', 'Advanced DeFi analytics for Uniswap V3 protocol', 'Deep insights into Uniswap V3 liquidity pools, trading volumes, fees, and yield opportunities. Essential for DeFi traders and liquidity providers.', '🦄', 'DeFi', 
 ARRAY['Ethereum', 'Polygon', 'Arbitrum', 'Optimism'], 
 ARRAY['Pool analytics', 'Volume tracking', 'Fee calculations', 'Yield optimization'], 
 '[{"type": "HTTP", "description": "RESTful analytics API"}, {"type": "SSE", "description": "Server-sent events for real-time updates"}]',
 'Uniswap Labs', '0x3542d35Cc6634C0532925a3b8D9C9B5643C8F3456', 'https://api.uniswap.org/v1', true, 0.12, true),

('social-sentiment-ai', 'Social Sentiment AI', 'AI-powered social media sentiment analysis for crypto', 'Advanced natural language processing to analyze sentiment across Twitter, Reddit, and Discord for cryptocurrency projects. Get early signals from social data.', '🧠', 'AI/ML', 
 ARRAY['Ethereum', 'Solana', 'Polygon'], 
 ARRAY['Sentiment analysis', 'Social monitoring', 'AI predictions', 'Multi-platform'], 
 '[{"type": "HTTP", "description": "REST API for sentiment data"}, {"type": "WebSocket", "description": "Real-time sentiment streaming"}]',
 'SentimentLabs', '0x4542d35Cc6634C0532925a3b8D9C9B5643C8F7890', 'https://api.sentimentlabs.ai/v1', false, 0.15, true),

('defillama-tvl-api', 'DeFiLlama TVL API', 'Total Value Locked data across all DeFi protocols', 'Comprehensive TVL tracking for DeFi protocols across all major blockchains. Essential for DeFi analysis and research with historical data and trends.', '🦙', 'Analytics', 
 ARRAY['Ethereum', 'Binance Smart Chain', 'Polygon', 'Avalanche', 'Solana'], 
 ARRAY['TVL tracking', 'Protocol analytics', 'Historical data', 'Cross-chain'], 
 '[{"type": "HTTP", "description": "Public REST API for TVL data"}]',
 'DeFiLlama', '0x5542d35Cc6634C0532925a3b8D9C9B5643C8F2345', 'https://api.llama.fi', true, 0, false),

('whale-alert-api', 'Whale Alert API', 'Large transaction monitoring across blockchains', 'Track large cryptocurrency transactions in real-time. Monitor whale movements, exchange flows, and significant market-moving transactions across multiple blockchains.', '🐋', 'Security', 
 ARRAY['Ethereum', 'Bitcoin', 'Binance Smart Chain', 'Polygon'], 
 ARRAY['Whale tracking', 'Large transactions', 'Exchange monitoring', 'Alert system'], 
 '[{"type": "HTTP", "description": "REST API for whale transaction data"}, {"type": "WebSocket", "description": "Real-time whale alerts"}]',
 'Whale Alert', '0x6542d35Cc6634C0532925a3b8D9C9B5643C8F6789', 'https://api.whale-alert.io/v1', true, 0.2, true);

-- Update usage stats for some services to show activity
UPDATE mcp_services SET usage_stats = '{"totalCalls": 156789, "activeAgents": 42, "successRate": 99.2}' WHERE id = 'moralis-web3-api';
UPDATE mcp_services SET usage_stats = '{"totalCalls": 89234, "activeAgents": 28, "successRate": 98.8}' WHERE id = 'the-graph-protocol';
UPDATE mcp_services SET usage_stats = '{"totalCalls": 234567, "activeAgents": 67, "successRate": 99.9}' WHERE id = 'chainlink-price-feeds';
UPDATE mcp_services SET usage_stats = '{"totalCalls": 45678, "activeAgents": 19, "successRate": 97.5}' WHERE id = 'opensea-api';
UPDATE mcp_services SET usage_stats = '{"totalCalls": 78901, "activeAgents": 33, "successRate": 98.3}' WHERE id = 'uniswap-v3-analytics';
UPDATE mcp_services SET usage_stats = '{"totalCalls": 12345, "activeAgents": 8, "successRate": 95.7}' WHERE id = 'social-sentiment-ai';
UPDATE mcp_services SET usage_stats = '{"totalCalls": 98765, "activeAgents": 45, "successRate": 99.5}' WHERE id = 'defillama-tvl-api';
UPDATE mcp_services SET usage_stats = '{"totalCalls": 34567, "activeAgents": 22, "successRate": 96.8}' WHERE id = 'whale-alert-api'; 