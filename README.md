# MindMint

A powerful decentralized AI agent deployment platform for Solana and EVM chains.

## Features

- Deploy AI agents as NFTs on Solana and EVM chains
- Real-time blockchain data integration via Moralis
- Wallet authentication with Phantom
- Agent marketplace with filter, sort, and search
- SDK for external integrations
- Beautiful dark-themed UI with animations

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Supabase
- Moralis
- Solana Web3.js
- Metaplex
- Framer Motion

## Prerequisites

- Node.js 18+
- Phantom Wallet
- Supabase account
- Moralis account

## Environment Variables

Create a `.env.local` file with:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_supabase_service_key

# Moralis
MORALIS_API_KEY=your_moralis_api_key

# Solana
NEXT_PUBLIC_SOLANA_RPC_URL=your_solana_rpc_url

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Setup

1. Install dependencies:

```bash
npm install
```

2. Set up Supabase database:

```sql
-- Create tables
CREATE TABLE agents (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('solana', 'evm', 'trade', 'blockchain')),
  parameters JSONB NOT NULL DEFAULT '{}'::jsonb,
  creator_wallet TEXT NOT NULL,
  is_public BOOLEAN NOT NULL DEFAULT true,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'failed')),
  nft_mint_address TEXT
);

CREATE TABLE agent_stats (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  agent_id UUID NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  deployments INTEGER NOT NULL DEFAULT 0,
  success_rate NUMERIC(5,2) NOT NULL DEFAULT 0,
  avg_return NUMERIC(10,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE wallets (
  address TEXT PRIMARY KEY,
  display_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes
CREATE INDEX agents_creator_wallet_idx ON agents(creator_wallet);
CREATE INDEX agents_type_idx ON agents(type);
CREATE INDEX agent_stats_agent_id_idx ON agent_stats(agent_id);
```

3. Run the development server:

```bash
npm run dev
```

## SDK Usage

```typescript
import { MindMintClient } from "@mindmint/sdk";

const client = new MindMintClient({
  baseUrl: "http://localhost:3000/api",
  apiKey: "optional_api_key",
});

// List agents
const { agents, pagination } = await client.listAgents({
  page: 1,
  limit: 10,
  sort: "created_at",
  order: "desc",
});

// Deploy agent
const agent = await client.deployAgent({
  name: "Trading Bot",
  description: "Automated trading bot",
  type: "trade",
  parameters: {
    strategy: "momentum",
    risk_level: 2,
  },
  walletAddress: "your_wallet_address",
});

// Get wallet analytics
const analytics = await client.getWalletAnalytics("wallet_address", "solana");
```

## API Routes

- `GET /api/agents` - List agents with pagination
- `GET /api/agent/:id` - Get agent details
- `POST /api/agent/deploy` - Deploy new agent
- `GET /api/tools` - List available agent tools
- `GET /api/token-info` - Get token information
- `GET /api/wallet/:address/analytics` - Get wallet analytics

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see the [LICENSE](LICENSE) file for details
