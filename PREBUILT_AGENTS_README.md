# AgentChain Prebuilt Agents

This implementation provides a complete prebuilt agents system for the AgentChain platform, featuring AI agents with live blockchain data access via Moralis API.

## 🚀 Features

### Prebuilt Agents Collection

- **CryptoAnalyst Pro**: Real-time crypto analysis with sentiment tracking
- **DeFi Strategist AI**: Yield farming and liquidity provision optimization
- **NFT Curator Expert**: NFT collection analysis and market intelligence
- **Trading Bot Alpha**: Advanced technical analysis and trading signals
- **Blockchain Researcher**: Comprehensive on-chain data analysis
- **Portfolio Optimizer Pro**: AI-driven portfolio management

### Core Functionality

- **Agent Store**: Browse and filter agents by category and blockchain
- **NFT Minting**: Mint agents as NFTs to unlock premium features
- **Live Data Access**: Real-time blockchain data via Moralis API
- **Capability System**: Free and premium features based on minting status
- **Interaction Tracking**: User interaction analytics and history

## 🛠️ Setup Instructions

### 1. Environment Variables

Create a `.env.local` file with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_supabase_service_role_key

# Moralis Configuration
MORALIS_API_KEY=your_moralis_api_key
```

### 2. Database Setup

Run the migration to create the prebuilt agents tables:

```bash
# If using Supabase CLI
supabase migration up

# Or manually run the SQL in supabase/migrations/0002_create_prebuilt_agents_tables.sql
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start Development Server

```bash
npm run dev
```

## 📁 File Structure

```
src/
├── types/
│   └── agent.ts                    # Type definitions
├── data/
│   └── prebuiltAgents.ts          # Agent data configuration
├── services/
│   ├── prebuiltAgents.ts          # Agent management service
│   └── moralis/
│       └── blockchain-data.ts      # Blockchain data service
├── app/
│   ├── api/
│   │   └── prebuilt-agents/       # API routes
│   └── agent-store/               # Store pages
└── components/
    └── AgentCard.tsx              # Agent display component
```

## 🔧 API Endpoints

### GET /api/prebuilt-agents

Fetch all prebuilt agents with optional filtering:

- `?category=Analytics` - Filter by category
- `?chain=Ethereum` - Filter by blockchain

### GET /api/prebuilt-agents/[id]

Fetch specific agent details

### POST /api/prebuilt-agents/[id]

Agent operations:

- `action: "mint"` - Mint agent as NFT
- `action: "track_interaction"` - Track user interaction

### POST /api/prebuilt-agents/[id]/data

Get live blockchain data from agent capabilities

## 🏗️ Architecture

### Agent System

Each agent has:

- **Metadata**: Name, description, category, supported chains
- **Capabilities**: Free and premium features
- **Blockchain Integration**: Moralis API endpoints
- **Minting Status**: NFT ownership and unlocked features

### Data Flow

1. User browses agents in the store
2. Agent details show free vs premium capabilities
3. User can mint agent to unlock premium features
4. Live data is fetched from Moralis API based on capabilities
5. Interactions are tracked for analytics

### Database Schema

- `prebuilt_agents`: Agent metadata and minting status
- `agent_capabilities`: Agent feature definitions
- `agent_interactions`: User interaction tracking

## 🎯 Usage Examples

### Free Capabilities

All users can access basic features like:

- Token price tracking
- Basic NFT analysis
- Simple portfolio overview

### Premium Capabilities (Requires Minting)

- Advanced sentiment analysis
- Whale transaction monitoring
- DeFi yield optimization
- Risk assessment tools

## 🔮 Future Enhancements

1. **Real Wallet Integration**: Connect with MetaMask/WalletConnect
2. **Advanced Analytics**: Machine learning predictions
3. **Custom Agents**: User-created agent marketplace
4. **Cross-Chain Integration**: Support for more blockchains
5. **Social Features**: Agent sharing and collaboration

## 🧪 Testing

The implementation includes:

- Mock wallet addresses for testing
- Sample blockchain data responses
- Interactive capability demonstrations
- Error handling and loading states

## 📊 Monitoring

Track agent performance via:

- Interaction analytics
- Minting conversion rates
- Feature usage statistics
- User engagement metrics

---

This implementation provides a solid foundation for the AgentChain prebuilt agents system with room for future expansion and customization.
