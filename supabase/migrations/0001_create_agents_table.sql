-- Agents Table Schema

CREATE TABLE agents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    name TEXT NOT NULL,
    description TEXT,
    chain TEXT NOT NULL CHECK (chain IN ('Solana', 'EVM')), -- Solana or EVM
    agent_type TEXT NOT NULL, -- e.g., 'Analyst', 'Trade Bot', 'Generalist'
    image_url TEXT, -- URL to agent's display image/icon
    creator_wallet_address TEXT, -- Wallet address of the user who deployed it (can be null if predefined)
    is_public BOOLEAN DEFAULT TRUE, -- Whether the agent is listed in the public store
    is_nft BOOLEAN DEFAULT FALSE, -- Whether the agent has been minted as an NFT
    nft_mint_address TEXT, -- Solana or EVM address of the minted NFT
    -- Add other metadata fields as needed in the future, e.g.:
    -- functionality_flags JSONB, -- Store specific capabilities 
    -- usage_count BIGINT DEFAULT 0
);

-- Enable Row Level Security (RLS)
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;

-- Policies for public access (read-only for public agents)
CREATE POLICY "Allow public read access to public agents" 
ON agents 
FOR SELECT 
USING (is_public = TRUE);

-- Policies for authenticated users (allow creating agents)
-- TODO: Define policy for inserting agents (requires user to be authenticated)
-- CREATE POLICY "Allow authenticated users to insert agents" 
-- ON agents 
-- FOR INSERT 
-- WITH CHECK (auth.role() = 'authenticated');

-- Policies for creators (allow updating/deleting their own agents)
-- TODO: Define policies for update/delete based on creator_wallet_address and auth

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to update updated_at on row update
CREATE TRIGGER update_agents_updated_at
BEFORE UPDATE ON agents
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Add indexes for common query patterns
CREATE INDEX idx_agents_chain ON agents(chain);
CREATE INDEX idx_agents_type ON agents(agent_type);
CREATE INDEX idx_agents_creator ON agents(creator_wallet_address);
CREATE INDEX idx_agents_public ON agents(is_public); 