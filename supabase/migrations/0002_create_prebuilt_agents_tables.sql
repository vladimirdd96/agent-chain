-- Prebuilt Agents Tables

-- Table for storing prebuilt agent metadata
CREATE TABLE prebuilt_agents (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    chain_compatibility TEXT[] NOT NULL,
    features TEXT[] NOT NULL,
    visual_representation TEXT NOT NULL,
    avatar TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Analytics', 'DeFi', 'NFT', 'Trading', 'Research')),
    is_minted BOOLEAN DEFAULT FALSE,
    owner_wallet TEXT,
    mint_date TIMESTAMP WITH TIME ZONE,
    price DECIMAL(10, 6) NOT NULL, -- Price in ETH
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table for agent capabilities
CREATE TABLE agent_capabilities (
    id TEXT PRIMARY KEY,
    agent_id TEXT REFERENCES prebuilt_agents(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    requires_minting BOOLEAN DEFAULT FALSE,
    moralis_endpoints TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table for tracking agent interactions
CREATE TABLE agent_interactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    agent_id TEXT REFERENCES prebuilt_agents(id) ON DELETE CASCADE,
    user_wallet TEXT NOT NULL,
    interaction_type TEXT NOT NULL CHECK (interaction_type IN ('view', 'mint', 'use_feature')),
    interaction_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable Row Level Security
ALTER TABLE prebuilt_agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_capabilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_interactions ENABLE ROW LEVEL SECURITY;

-- Policies for public read access to prebuilt agents
CREATE POLICY "Allow public read access to prebuilt agents" 
ON prebuilt_agents 
FOR SELECT 
USING (true);

CREATE POLICY "Allow public read access to agent capabilities" 
ON agent_capabilities 
FOR SELECT 
USING (true);

-- Policies for agent interactions (users can only see their own interactions)
CREATE POLICY "Users can read their own interactions" 
ON agent_interactions 
FOR SELECT 
USING (true); -- For now, allow all reads

CREATE POLICY "Users can insert their own interactions" 
ON agent_interactions 
FOR INSERT 
WITH CHECK (true); -- For now, allow all inserts

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to update updated_at on row update
CREATE TRIGGER update_prebuilt_agents_updated_at
BEFORE UPDATE ON prebuilt_agents
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Indexes for better performance
CREATE INDEX idx_prebuilt_agents_category ON prebuilt_agents(category);
CREATE INDEX idx_prebuilt_agents_minted ON prebuilt_agents(is_minted);
CREATE INDEX idx_prebuilt_agents_owner ON prebuilt_agents(owner_wallet);
CREATE INDEX idx_agent_capabilities_agent_id ON agent_capabilities(agent_id);
CREATE INDEX idx_agent_interactions_agent_id ON agent_interactions(agent_id);
CREATE INDEX idx_agent_interactions_user ON agent_interactions(user_wallet);
CREATE INDEX idx_agent_interactions_type ON agent_interactions(interaction_type);

-- Insert prebuilt agents data
INSERT INTO prebuilt_agents (id, name, description, chain_compatibility, features, visual_representation, avatar, category, price) VALUES
('crypto-analyst-pro', 'CryptoAnalyst Pro', 'Advanced real-time cryptocurrency analysis with market sentiment tracking and price predictions', 
 ARRAY['Ethereum', 'Polygon', 'Binance Smart Chain'], 
 ARRAY['Live token price tracking across multiple chains', 'Advanced market sentiment analysis using social data', 'Historical performance charts with technical indicators', 'Price prediction algorithms based on on-chain data', 'Portfolio risk assessment and diversification recommendations', 'Real-time whale transaction monitoring', 'DeFi protocol yield tracking'], 
 '📈', '/images/agents/crypto-analyst.svg', 'Analytics', 0.5),

('defi-strategist-ai', 'DeFi Strategist AI', 'Intelligent DeFi investment assistant for optimal yield farming and liquidity provision strategies',
 ARRAY['Solana', 'Binance Smart Chain', 'Avalanche'],
 ARRAY['Real-time yield farming opportunity scanner', 'Automated risk assessment for DeFi protocols', 'Liquidity pool performance analytics', 'Impermanent loss calculations and predictions', 'Cross-chain yield comparison tools', 'Smart contract security analysis', 'Portfolio rebalancing recommendations'],
 '🏦', '/images/agents/defi-strategist.svg', 'DeFi', 0.75),

('nft-curator-expert', 'NFT Curator Expert', 'Professional NFT collection analysis and market intelligence for collectors and traders',
 ARRAY['Ethereum', 'Solana'],
 ARRAY['Advanced NFT rarity analysis and scoring', 'Collection performance tracking and analytics', 'Upcoming drops calendar with rarity predictions', 'Floor price monitoring and trend analysis', 'Whale collector activity tracking', 'Cross-platform arbitrage opportunities', 'AI-powered authenticity verification'],
 '🖼️', '/images/agents/nft-curator.svg', 'NFT', 0.3),

('trading-bot-alpha', 'Trading Bot Alpha', 'Sophisticated algorithmic trading assistant with advanced technical analysis and automated strategies',
 ARRAY['Ethereum', 'Polygon', 'Arbitrum'],
 ARRAY['Advanced technical analysis with 50+ indicators', 'Automated trading signal generation', 'Risk management and position sizing', 'Backtesting capabilities for strategies', 'Real-time market scanning and alerts', 'Portfolio performance analytics', 'Multi-timeframe analysis'],
 '🤖', '/images/agents/trading-bot.svg', 'Trading', 1.0),

('blockchain-researcher', 'Blockchain Researcher', 'Comprehensive blockchain data analysis and research assistant for in-depth market intelligence',
 ARRAY['Ethereum', 'Solana', 'Polygon', 'Binance Smart Chain'],
 ARRAY['On-chain data analysis and visualization', 'Network health and activity monitoring', 'Smart contract interaction analysis', 'Token economics and tokenomics research', 'Governance proposal tracking and analysis', 'Cross-chain activity correlation', 'Institutional flow tracking'],
 '🔬', '/images/agents/blockchain-researcher.svg', 'Research', 0.6),

('portfolio-optimizer', 'Portfolio Optimizer Pro', 'AI-driven portfolio management with risk optimization and automated rebalancing strategies',
 ARRAY['Ethereum', 'Polygon', 'Solana'],
 ARRAY['Multi-chain portfolio tracking and analysis', 'Risk-adjusted return optimization', 'Automated rebalancing recommendations', 'Correlation analysis across assets', 'Tax optimization strategies', 'Performance benchmarking', 'Diversification scoring and recommendations'],
 '📊', '/images/agents/portfolio-optimizer.svg', 'Analytics', 0.8);

-- Insert agent capabilities
INSERT INTO agent_capabilities (id, agent_id, name, description, requires_minting, moralis_endpoints) VALUES
('price-tracking', 'crypto-analyst-pro', 'Real-time Price Tracking', 'Track token prices across multiple chains', false, ARRAY['token/price', 'token/stats']),
('sentiment-analysis', 'crypto-analyst-pro', 'Market Sentiment Analysis', 'Analyze market sentiment from social media and trading data', true, ARRAY['token/price', 'token/metadata']),
('whale-tracking', 'crypto-analyst-pro', 'Whale Transaction Monitoring', 'Monitor large transactions and wallet movements', true, ARRAY['account/transactions', 'account/balance']),
('risk-assessment', 'crypto-analyst-pro', 'Portfolio Risk Assessment', 'Comprehensive portfolio analysis and risk scoring', true, ARRAY['account/portfolio', 'token/price']),

('yield-scanning', 'defi-strategist-ai', 'Yield Opportunity Scanner', 'Scan for high-yield farming opportunities across protocols', false, ARRAY['defi/protocol', 'defi/positions']),
('risk-analysis', 'defi-strategist-ai', 'DeFi Risk Analysis', 'Comprehensive risk assessment for DeFi protocols', true, ARRAY['defi/protocol', 'defi/tvl']),
('impermanent-loss', 'defi-strategist-ai', 'Impermanent Loss Calculator', 'Calculate and predict impermanent loss for LP positions', true, ARRAY['defi/pairs', 'token/price']),
('portfolio-optimization', 'defi-strategist-ai', 'Portfolio Optimization', 'AI-driven portfolio rebalancing and optimization', true, ARRAY['account/portfolio', 'defi/positions']),

('rarity-analysis', 'nft-curator-expert', 'NFT Rarity Analysis', 'Advanced rarity scoring and trait analysis', false, ARRAY['nft/collection', 'nft/metadata']),
('collection-tracking', 'nft-curator-expert', 'Collection Performance Tracking', 'Track collection metrics and market performance', true, ARRAY['nft/collection/stats', 'nft/trades']),
('whale-tracking-nft', 'nft-curator-expert', 'NFT Whale Activity', 'Monitor high-value NFT transactions and collector activity', true, ARRAY['nft/transfers', 'account/nfts']),
('arbitrage-finder', 'nft-curator-expert', 'Cross-Platform Arbitrage', 'Find arbitrage opportunities across NFT marketplaces', true, ARRAY['nft/collection', 'nft/lowest-price']),

('technical-analysis', 'trading-bot-alpha', 'Technical Analysis Suite', 'Comprehensive technical analysis with multiple indicators', false, ARRAY['token/price', 'token/stats']),
('signal-generation', 'trading-bot-alpha', 'Trading Signal Generation', 'AI-powered trading signals with confidence scores', true, ARRAY['token/price', 'token/stats']),
('backtesting', 'trading-bot-alpha', 'Strategy Backtesting', 'Test trading strategies against historical data', true, ARRAY['token/price']),
('risk-management', 'trading-bot-alpha', 'Advanced Risk Management', 'Sophisticated position sizing and risk control', true, ARRAY['account/portfolio', 'token/price']),

('onchain-analysis', 'blockchain-researcher', 'On-Chain Data Analysis', 'Deep dive into blockchain transaction data', false, ARRAY['block/stats', 'account/transactions']),
('network-monitoring', 'blockchain-researcher', 'Network Health Monitoring', 'Monitor blockchain network performance and health', true, ARRAY['block/stats', 'transaction/verbose']),
('governance-tracking', 'blockchain-researcher', 'Governance Proposal Tracking', 'Track and analyze DAO governance proposals', true, ARRAY['token/metadata', 'account/transactions']),
('institutional-flows', 'blockchain-researcher', 'Institutional Flow Analysis', 'Track large institutional blockchain movements', true, ARRAY['account/transactions', 'account/balance']),

('portfolio-tracking', 'portfolio-optimizer', 'Multi-Chain Portfolio Tracking', 'Comprehensive portfolio tracking across multiple chains', false, ARRAY['account/portfolio', 'account/balance']),
('risk-optimization', 'portfolio-optimizer', 'Risk-Return Optimization', 'Optimize portfolio for risk-adjusted returns', true, ARRAY['account/portfolio', 'token/price', 'token/stats']),
('rebalancing', 'portfolio-optimizer', 'Automated Rebalancing', 'AI-powered portfolio rebalancing recommendations', true, ARRAY['account/portfolio', 'token/price']),
('tax-optimization', 'portfolio-optimizer', 'Tax Loss Harvesting', 'Optimize portfolio for tax efficiency', true, ARRAY['account/transactions', 'token/price']); 