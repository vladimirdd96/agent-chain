"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MagnifyingGlassIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ClipboardDocumentIcon,
  Bars3Icon,
  XMarkIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/Button";
import CodeBlock from "@/components/ui/CodeBlock";

// Type definitions
interface SubSection {
  id: string;
  title: string;
  href: string;
}

interface DocumentationSection {
  title: string;
  icon: string;
  sections: SubSection[];
}

interface ContentSection {
  title: string;
  content: string;
}

type DocumentationSections = Record<string, DocumentationSection>;
type ContentData = Record<string, ContentSection>;

// Documentation sections data
const documentationSections: DocumentationSections = {
  "getting-started": {
    title: "Getting Started",
    icon: "🚀",
    sections: [
      {
        id: "introduction",
        title: "Welcome to MindMint",
        href: "#introduction",
      },
      { id: "setup", title: "Platform Setup", href: "#setup" },
      {
        id: "wallet-connection",
        title: "Wallet Connection",
        href: "#wallet-connection",
      },
      { id: "first-steps", title: "Your First Steps", href: "#first-steps" },
    ],
  },
  "platform-overview": {
    title: "Platform Overview",
    icon: "🌟",
    sections: [
      {
        id: "architecture",
        title: "MindMint Architecture",
        href: "#architecture",
      },
      {
        id: "web3-integration",
        title: "Web3 Integration",
        href: "#web3-integration",
      },
      {
        id: "blockchain-support",
        title: "Supported Blockchains",
        href: "#blockchain-support",
      },
      {
        id: "user-roles",
        title: "User Roles & Permissions",
        href: "#user-roles",
      },
    ],
  },
  workspace: {
    title: "WorkSpace",
    icon: "💼",
    sections: [
      {
        id: "workspace-overview",
        title: "WorkSpace Overview",
        href: "#workspace-overview",
      },
      { id: "dashboard", title: "Dashboard Features", href: "#dashboard" },
      { id: "analytics", title: "Wallet Analytics", href: "#analytics" },
      {
        id: "agent-management",
        title: "Agent Management",
        href: "#agent-management",
      },
    ],
  },
  "agent-deployment": {
    title: "Agent Deployment",
    icon: "🤖",
    sections: [
      {
        id: "deployment-overview",
        title: "Deployment Overview",
        href: "#deployment-overview",
      },
      { id: "agent-types", title: "Agent Types", href: "#agent-types" },
      {
        id: "configuration",
        title: "Agent Configuration",
        href: "#configuration",
      },
      { id: "nft-minting", title: "NFT Minting Process", href: "#nft-minting" },
      {
        id: "deployment-costs",
        title: "Deployment Costs",
        href: "#deployment-costs",
      },
    ],
  },
  "agent-types": {
    title: "Agent Types & Capabilities",
    icon: "🤖",
    sections: [
      {
        id: "trading-agents",
        title: "Trading Agents",
        href: "#trading-agents",
      },
      { id: "defi-agents", title: "DeFi Agents", href: "#defi-agents" },
      {
        id: "analytics-agents",
        title: "Analytics Agents",
        href: "#analytics-agents",
      },
      {
        id: "specialized-agents",
        title: "Specialized Agents",
        href: "#specialized-agents",
      },
    ],
  },
  "store-overview": {
    title: "Agent Store Overview",
    icon: "🏪",
    sections: [
      {
        id: "store-categories",
        title: "Store Categories",
        href: "#store-categories",
      },
      {
        id: "agent-discovery",
        title: "Agent Discovery",
        href: "#agent-discovery",
      },
      {
        id: "pricing-models",
        title: "Pricing Models",
        href: "#pricing-models",
      },
      {
        id: "quality-assurance",
        title: "Quality Assurance",
        href: "#quality-assurance",
      },
    ],
  },
  "mcp-protocol": {
    title: "MCP Protocol",
    icon: "⚡",
    sections: [
      { id: "mcp-overview", title: "MCP Overview", href: "#mcp-overview" },
      { id: "mcp-store", title: "MCP Store", href: "#mcp-store" },
      {
        id: "service-integration",
        title: "Service Integration",
        href: "#service-integration",
      },
      {
        id: "publishing-services",
        title: "Publishing Services",
        href: "#publishing-services",
      },
      {
        id: "service-categories",
        title: "Service Categories",
        href: "#service-categories",
      },
    ],
  },
  "tools-ecosystem": {
    title: "Tools & Ecosystem",
    icon: "🛠️",
    sections: [
      {
        id: "available-tools",
        title: "Available Tools",
        href: "#available-tools",
      },
      { id: "trading-tools", title: "Trading Tools", href: "#trading-tools" },
      {
        id: "analytics-tools",
        title: "Analytics Tools",
        href: "#analytics-tools",
      },
      { id: "defi-tools", title: "DeFi Tools", href: "#defi-tools" },
      { id: "nft-tools", title: "NFT Tools", href: "#nft-tools" },
    ],
  },
  development: {
    title: "Development & API",
    icon: "💻",
    sections: [
      { id: "api-overview", title: "API Overview", href: "#api-overview" },
      { id: "sdk-usage", title: "SDK Usage", href: "#sdk-usage" },
      { id: "endpoints", title: "API Endpoints", href: "#endpoints" },
      {
        id: "authentication",
        title: "Authentication",
        href: "#authentication",
      },
      { id: "rate-limits", title: "Rate Limits", href: "#rate-limits" },
    ],
  },
  advanced: {
    title: "Advanced Features",
    icon: "⚙️",
    sections: [
      {
        id: "custom-agents",
        title: "Custom Agent Development",
        href: "#custom-agents",
      },
      {
        id: "marketplace",
        title: "Marketplace Operations",
        href: "#marketplace",
      },
      {
        id: "monetization",
        title: "Monetization Strategies",
        href: "#monetization",
      },
      {
        id: "integrations",
        title: "Third-party Integrations",
        href: "#integrations",
      },
    ],
  },
  support: {
    title: "Support & Troubleshooting",
    icon: "❓",
    sections: [
      { id: "common-issues", title: "Common Issues", href: "#common-issues" },
      {
        id: "best-practices",
        title: "Best Practices",
        href: "#best-practices",
      },
      { id: "security", title: "Security Guidelines", href: "#security" },
      { id: "community", title: "Community & Support", href: "#community" },
    ],
  },
  "mcp-overview": {
    title: "MCP Protocol Overview",
    icon: "⚡",
    sections: [
      {
        id: "mcp-architecture",
        title: "MCP Architecture",
        href: "#mcp-architecture",
      },
      {
        id: "service-categories",
        title: "Service Categories",
        href: "#service-categories",
      },
      {
        id: "integration-examples",
        title: "Integration Examples",
        href: "#integration-examples",
      },
      {
        id: "service-development",
        title: "Service Development",
        href: "#service-development",
      },
    ],
  },
};

const contentData: ContentData = {
  introduction: {
    title: "Welcome to MindMint Documentation",
    content: `
MindMint is the most sophisticated AI agent deployment framework in the blockchain space. Our platform enables users to deploy decentralized, LLM-based AI agents that are seamlessly integrated with blockchain functionalities.

## Key Features

- **Advanced AI Agents**: Deploy sophisticated AI agents with blockchain integration
- **Multi-Chain Support**: Works with Solana and EVM-compatible chains
- **NFT Integration**: Mint your agents as NFTs for verifiable ownership
- **MCP Protocol**: Built on the Model Context Protocol for interoperability
- **Marketplace**: Trade and monetize your AI agents

## What Makes MindMint Special

MindMint stands out as the most advanced and user-friendly platform for deploying decentralized AI agents. Our four foundational agents cater to different blockchain functionalities:

1. **Solana-Based Agent**: Real-time Solana blockchain data and analytics
2. **EVM-Based Agent**: Ethereum and EVM-compatible chain interactions
3. **Trade Bot**: Advanced crypto trading and market analysis
4. **Generalist Blockchain Bot**: Multi-ecosystem blockchain queries and insights

## Platform Architecture

MindMint combines cutting-edge AI technology with blockchain infrastructure to create a truly decentralized AI ecosystem. Our agents operate independently while maintaining verifiable ownership through NFT technology.
    `,
  },
  setup: {
    title: "Platform Setup",
    content: `
Get started with MindMint in just a few minutes.

## Prerequisites

- Web3 wallet (MetaMask, Phantom, WalletConnect compatible)
- Basic understanding of blockchain concepts
- Some SOL or ETH for transactions (testnet supported)

## Supported Wallets

### Solana Wallets
- **Phantom**: Most popular Solana wallet with excellent UX
- **Solflare**: Comprehensive Solana ecosystem wallet
- **Backpack**: Next-generation multi-chain wallet

### EVM Wallets
- **MetaMask**: Industry standard for Ethereum interactions
- **WalletConnect**: Connect any compatible mobile wallet
- **Coinbase Wallet**: Enterprise-grade security features

## Initial Setup Steps

1. **Install a compatible wallet**
2. **Connect to MindMint platform**
3. **Complete wallet verification**
4. **Fund your wallet with gas tokens**
5. **Access your workspace dashboard**

## Network Configuration

\`\`\`javascript
// Solana Configuration
const solanaConfig = {
  network: 'mainnet-beta', // or 'devnet' for testing
  rpcUrl: 'https://api.mainnet-beta.solana.com',
  commitment: 'confirmed'
};

// EVM Configuration  
const evmConfig = {
  chainId: 1, // Ethereum mainnet
  rpcUrl: 'https://mainnet.infura.io/v3/YOUR-PROJECT-ID',
  gasPrice: 'auto'
};
\`\`\`
    `,
  },
  "wallet-connection": {
    title: "Wallet Connection Guide",
    content: `
Connect your wallet to start using MindMint's powerful features.

## Connection Process

### Step 1: Choose Your Wallet
Select from our supported wallet providers based on your preferred blockchain.

### Step 2: Authorize Connection
Approve the connection request in your wallet to establish secure communication.

### Step 3: Verify Identity
Complete wallet verification to access advanced features and higher transaction limits.

## Security Best Practices

- **Never share your private keys**
- **Use hardware wallets for large amounts**
- **Verify transaction details before signing**
- **Keep your wallet software updated**

## Connection SDK

\`\`\`typescript
import { WalletAdapter } from '@mindmint/wallet-adapter';

// Initialize wallet connection
const walletAdapter = new WalletAdapter({
  network: 'mainnet',
  autoConnect: true
});

// Connect wallet
await walletAdapter.connect('phantom');

// Get wallet info
const walletInfo = walletAdapter.getWalletInfo();
console.log('Connected wallet:', walletInfo.publicKey);
\`\`\`

## Troubleshooting Connection Issues

- **Wallet not detected**: Ensure wallet extension is installed and enabled
- **Connection timeout**: Check network connection and try again
- **Transaction failed**: Verify sufficient balance for gas fees
- **Wrong network**: Switch to the correct network in your wallet
    `,
  },
  "first-steps": {
    title: "Your First Steps",
    content: `
Welcome to MindMint! Here's how to get the most out of the platform.

## 1. Explore the Dashboard

Your workspace dashboard provides:
- **Portfolio Overview**: Track your agents and earnings
- **Market Analytics**: Real-time blockchain data and insights
- **Agent Gallery**: Browse and deploy pre-built agents
- **Performance Metrics**: Monitor agent effectiveness

## 2. Deploy Your First Agent

### Quick Deploy Options:
1. **Use Pre-built Agents**: Start with our tested templates
2. **Customize Existing**: Modify parameters to fit your needs
3. **Build from Scratch**: Create unique agents with our visual builder

### Recommended First Agent: Trading Bot

\`\`\`json
{
  "name": "My First Trading Bot",
  "type": "trading",
  "blockchain": "solana",
  "config": {
    "riskLevel": "low",
    "maxTradeSize": 50,
    "strategies": ["momentum"],
    "stopLoss": 5,
    "takeProfit": 10
  }
}
\`\`\`

## 3. Monitor and Optimize

- **Real-time Tracking**: Watch your agent's performance
- **Adjust Parameters**: Fine-tune based on results
- **Scale Up**: Increase investment as confidence grows
- **Diversify**: Deploy multiple agents across strategies

## 4. Join the Community

- **Discord**: Connect with other users and developers
- **Documentation**: Stay updated with new features
- **Support**: Get help when you need it
    `,
  },
  architecture: {
    title: "MindMint Architecture",
    content: `
Understanding MindMint's technical architecture and design principles.

## System Overview

MindMint is built on a modular, scalable architecture that combines:
- **AI Layer**: Advanced language models and reasoning engines
- **Blockchain Layer**: Multi-chain support and smart contract integration
- **Protocol Layer**: MCP (Model Context Protocol) for interoperability
- **Application Layer**: User interfaces and developer tools

## Core Components

### 1. Agent Runtime Environment
- **Sandboxed Execution**: Secure agent operation
- **Resource Management**: CPU, memory, and network allocation
- **State Persistence**: Reliable agent memory and learning
- **Cross-chain Communication**: Seamless multi-blockchain operations

### 2. MCP Integration
- **Service Discovery**: Find and connect to external tools
- **Protocol Standardization**: Consistent service interfaces
- **Security Framework**: Verified service interactions
- **Performance Optimization**: Efficient resource utilization

### 3. Blockchain Infrastructure
- **Multi-chain Support**: Solana, Ethereum, and EVM-compatible chains
- **Smart Contracts**: Automated agent management and payments
- **NFT Integration**: Verifiable agent ownership
- **DeFi Protocols**: Trading and yield farming capabilities

## Technical Stack

\`\`\`yaml
Frontend:
  - Next.js 14 with App Router
  - TypeScript for type safety
  - TailwindCSS for styling
  - Framer Motion for animations

Backend:
  - Node.js runtime
  - Express.js API framework
  - WebSocket real-time communication
  - Redis for caching and sessions

Blockchain:
  - Solana Web3.js SDK
  - Ethers.js for EVM chains
  - Anchor framework for Solana programs
  - OpenZeppelin contracts for Ethereum

AI/ML:
  - OpenAI GPT models
  - Anthropic Claude integration
  - Custom fine-tuned models
  - Vector databases for embeddings
\`\`\`

## Security Architecture

- **Multi-layer Authentication**: Wallet-based and API key verification
- **Sandboxed Execution**: Isolated agent environments
- **Code Auditing**: Regular security reviews and penetration testing
- **Encryption**: End-to-end encryption for sensitive data
    `,
  },
  "web3-integration": {
    title: "Web3 Integration",
    content: `
How MindMint seamlessly integrates with Web3 technologies and protocols.

## Blockchain Connectivity

### Solana Integration
MindMint provides deep integration with the Solana ecosystem:

\`\`\`typescript
import { Connection, PublicKey } from '@solana/web3.js';
import { MindMintSolanaAgent } from '@mindmint/solana-sdk';

// Initialize Solana agent
const agent = new MindMintSolanaAgent({
  connection: new Connection('https://api.mainnet-beta.solana.com'),
  wallet: walletAdapter,
  cluster: 'mainnet-beta'
});

// Query token balances
const balances = await agent.getTokenBalances();

// Execute DEX trades
const tradeResult = await agent.executeSwap({
  inputToken: 'SOL',
  outputToken: 'USDC',
  amount: 1.5,
  slippage: 0.5
});
\`\`\`

### EVM Chain Support
Full compatibility with Ethereum and EVM-compatible chains:

\`\`\`typescript
import { ethers } from 'ethers';
import { MindMintEVMAgent } from '@mindmint/evm-sdk';

// Initialize EVM agent
const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
const agent = new MindMintEVMAgent({
  provider,
  signer: walletSigner,
  chainId: 1 // Ethereum mainnet
});

// Interact with DeFi protocols
const uniswapTrade = await agent.uniswapV3Swap({
  tokenIn: '0xA0b86a33E6Bc8b8E7b5B6B3b8B8B8B8B8B8B8B8',
  tokenOut: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  amountIn: ethers.utils.parseEther('1.0'),
  recipient: wallet.address
});
\`\`\`

## Smart Contract Integration

### Agent Management Contracts
- **Agent Registry**: Track deployed agents and ownership
- **Revenue Distribution**: Automatic profit sharing
- **Governance**: Community-driven protocol updates
- **Upgrades**: Seamless agent capability updates

### DeFi Protocol Access
- **DEX Integration**: Uniswap, PancakeSwap, Raydium, Orca
- **Lending Protocols**: Aave, Compound, Solend
- **Yield Farming**: Automated strategy execution
- **Liquid Staking**: Maximize idle token utility

## Cross-Chain Operations

MindMint agents can operate across multiple blockchains simultaneously:

\`\`\`typescript
// Cross-chain arbitrage example
const arbitrageAgent = new CrossChainAgent({
  chains: ['ethereum', 'polygon', 'solana'],
  strategy: 'price-arbitrage',
  maxSlippage: 0.5,
  minProfitThreshold: 0.1
});

await arbitrageAgent.scanOpportunities();
\`\`\`
    `,
  },
  "blockchain-support": {
    title: "Supported Blockchains",
    content: `
Comprehensive overview of blockchain networks supported by MindMint.

## Primary Networks

### Solana
- **Network Type**: High-performance blockchain
- **Consensus**: Proof of History + Proof of Stake
- **Transaction Speed**: 65,000+ TPS
- **Average Cost**: $0.00025 per transaction
- **Key Features**: Fast finality, low fees, rich DeFi ecosystem

**Supported Features:**
- Token swaps via Jupiter, Raydium, Orca
- NFT minting and trading
- Liquid staking with Marinade, Lido
- Yield farming across major protocols

### Ethereum
- **Network Type**: Smart contract platform
- **Consensus**: Proof of Stake (post-merge)
- **Transaction Speed**: 15 TPS
- **Average Cost**: Variable (depends on gas price)
- **Key Features**: Largest DeFi ecosystem, extensive tooling

**Supported Features:**
- DEX trading via Uniswap, SushiSwap, 1inch
- Lending and borrowing on Aave, Compound
- NFT operations on OpenSea, LooksRare
- Advanced DeFi strategies

## Layer 2 Networks

### Polygon
- **Type**: Ethereum scaling solution
- **Speed**: 7,000+ TPS
- **Cost**: ~$0.01 per transaction
- **Benefits**: Ethereum compatibility with faster/cheaper transactions

### Arbitrum
- **Type**: Optimistic rollup
- **Speed**: 4,000+ TPS
- **Cost**: 90% cheaper than Ethereum
- **Benefits**: Full EVM compatibility

### Optimism
- **Type**: Optimistic rollup
- **Speed**: 2,000+ TPS
- **Cost**: 90% cheaper than Ethereum
- **Benefits**: Retroactive public goods funding

## Network Configuration

\`\`\`typescript
// Multi-chain agent configuration
const multiChainConfig = {
  solana: {
    rpcUrl: 'https://api.mainnet-beta.solana.com',
    commitment: 'confirmed',
    programs: {
      jupiter: '6ZRCB7AAqGre6c72PRz3MHLC73VMYs6y8bTTidf5TD6N',
      raydium: '675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8'
    }
  },
  ethereum: {
    chainId: 1,
    rpcUrl: 'https://mainnet.infura.io/v3/YOUR-KEY',
    contracts: {
      uniswapV3Router: '0xE592427A0AEce92De3Edee1F18E0157C05861564',
      aavePool: '0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2'
    }
  },
  polygon: {
    chainId: 137,
    rpcUrl: 'https://polygon-mainnet.infura.io/v3/YOUR-KEY',
    gasMultiplier: 1.2
  }
};
\`\`\`

## Cross-Chain Bridges

MindMint agents can utilize various bridge protocols:
- **Wormhole**: Solana ↔ EVM chains
- **AllBridge**: Multi-chain asset transfers
- **Portal Bridge**: Token bridge for Solana
- **Polygon Bridge**: Ethereum ↔ Polygon
    `,
  },
  "user-roles": {
    title: "User Roles & Permissions",
    content: `
Understanding different user types and their capabilities within MindMint.

## User Hierarchy

### 1. Standard Users
**Capabilities:**
- Deploy pre-built agents
- Access basic trading strategies
- Use public MCP services
- View portfolio analytics
- Participate in community features

**Limitations:**
- Limited to 3 concurrent agents
- Basic customization options
- Standard support tier

### 2. Premium Users
**Enhanced Capabilities:**
- Deploy up to 10 concurrent agents
- Access advanced trading strategies
- Custom agent configurations
- Priority customer support
- Beta feature access

**Monthly Benefits:**
- Reduced platform fees (0.5% vs 1%)
- Advanced analytics dashboard
- Custom alert configurations
- Direct integration support

### 3. Developer Users
**Development Access:**
- MindMint SDK full access
- Custom agent development
- MCP service publishing
- API rate limit increases
- Development environment access

**Tools & Resources:**
- Agent development IDE
- Testing and simulation environments
- Performance profiling tools
- Community developer forums

### 4. Enterprise Users
**Institutional Features:**
- Unlimited agent deployment
- Custom infrastructure options
- Dedicated support team
- SLA guarantees
- White-label solutions

**Advanced Capabilities:**
- Multi-tenant management
- Advanced security features
- Custom compliance tools
- Direct protocol integrations

## Permission System

\`\`\`typescript
// Role-based access control
interface UserPermissions {
  agentDeployment: {
    maxConcurrent: number;
    customization: 'basic' | 'advanced' | 'unlimited';
    strategies: string[];
  };
  marketplace: {
    canPublish: boolean;
    canPurchase: boolean;
    commercialLicense: boolean;
  };
  api: {
    rateLimit: number;
    endpoints: string[];
    webhooks: boolean;
  };
  support: {
    tier: 'standard' | 'priority' | 'dedicated';
    channels: string[];
  };
}
\`\`\`

## Role Upgrades

Users can upgrade their roles through:
- **Subscription Plans**: Monthly/annual premium subscriptions
- **Usage-Based**: Automatic upgrades based on platform usage
- **Achievement System**: Unlock features through platform engagement
- **Enterprise Sales**: Custom enterprise agreements
    `,
  },
  "workspace-overview": {
    title: "WorkSpace Overview",
    content: `
Your MindMint workspace is your central command center for managing AI agents and blockchain operations.

## Dashboard Components

### 1. Portfolio Overview
Real-time view of your digital assets and agent performance:
- **Total Portfolio Value**: Aggregated value across all chains
- **Agent Performance**: Individual agent ROI and statistics
- **Recent Transactions**: Latest blockchain activities
- **Profit/Loss Analysis**: Detailed P&L breakdowns

### 2. Agent Management Panel
Central hub for all your deployed agents:
- **Active Agents**: Currently running agents and their status
- **Performance Metrics**: Success rates, profitability, uptime
- **Configuration Controls**: Adjust parameters and strategies
- **Deployment History**: Track of all agent deployments

### 3. Market Intelligence
Advanced analytics and market insights:
- **Price Feeds**: Real-time cryptocurrency prices
- **Market Trends**: Technical analysis and sentiment data
- **Opportunity Scanner**: Automated opportunity detection
- **Risk Assessment**: Portfolio risk metrics and alerts

## Navigation Structure

\`\`\`
WorkSpace/
├── Dashboard/          # Main overview and quick actions
├── Agents/            # Agent management and deployment
│   ├── Active/        # Currently running agents
│   ├── Templates/     # Pre-built agent templates
│   └── Custom/        # User-created agents
├── Analytics/         # Performance and market analysis
│   ├── Portfolio/     # Portfolio performance tracking
│   ├── Market/        # Market data and insights
│   └── Reports/       # Detailed analytical reports
├── Marketplace/       # Agent and tool marketplace
├── Settings/          # Account and platform configuration
└── Support/           # Help, documentation, and support
\`\`\`

## Quick Actions

From your workspace, you can:
- **Deploy Agents**: One-click deployment of pre-configured agents
- **Monitor Performance**: Real-time tracking of all activities
- **Adjust Strategies**: Modify agent parameters on the fly
- **View Analytics**: Access detailed performance reports
- **Manage Wallet**: Connect/disconnect wallets and view balances

## Customization Options

### Theme Selection
- **Dark Mode**: Default dark theme optimized for extended use
- **Light Mode**: Clean light theme for daytime usage
- **Auto Mode**: Automatically switches based on system preferences

### Layout Preferences
- **Compact View**: More information in less space
- **Detailed View**: Expanded cards with additional metrics
- **Custom Layouts**: Drag-and-drop dashboard customization

### Notification Settings
\`\`\`typescript
interface NotificationPreferences {
  agentAlerts: {
    profitTargets: boolean;
    lossLimits: boolean;
    errors: boolean;
    deployments: boolean;
  };
  marketAlerts: {
    priceMovements: number; // percentage threshold
    volumeSpikes: boolean;
    newsEvents: boolean;
  };
  deliveryMethods: {
    email: boolean;
    inApp: boolean;
    discord: boolean;
    webhook: string;
  };
}
\`\`\`
    `,
  },
  dashboard: {
    title: "Dashboard Features",
    content: `
Deep dive into MindMint's comprehensive dashboard functionality.

## Real-Time Metrics

### Performance Indicators
Your dashboard displays critical performance metrics:

\`\`\`typescript
interface DashboardMetrics {
  portfolio: {
    totalValue: number;
    dailyChange: number;
    weeklyChange: number;
    monthlyChange: number;
    allTimeReturn: number;
  };
  agents: {
    activeCount: number;
    totalTrades: number;
    successRate: number;
    averageReturn: number;
    topPerformer: string;
  };
  market: {
    opportunities: number;
    marketSentiment: 'bullish' | 'bearish' | 'neutral';
    volatilityIndex: number;
    recommendedActions: string[];
  };
}
\`\`\`

### Live Data Feeds
- **Price Streams**: Real-time price updates from major exchanges
- **Transaction Monitoring**: Live blockchain transaction tracking
- **Agent Activities**: Real-time agent decision logging
- **Market Events**: News and event impact tracking

## Interactive Charts

### Portfolio Performance Chart
Advanced charting with multiple timeframes:
- **1H, 4H, 1D, 1W, 1M, 1Y views**
- **Candlestick and line chart options**
- **Technical indicators overlay**
- **Custom date range selection**

### Agent Performance Comparison
- **Multi-agent performance overlay**
- **Risk-adjusted return calculations**
- **Drawdown analysis**
- **Correlation matrices**

## Widget System

### Customizable Widgets
Drag-and-drop widgets to customize your dashboard:

1. **Portfolio Summary Widget**
   - Total value and daily P&L
   - Asset allocation breakdown
   - Performance sparklines

2. **Top Agents Widget**
   - Best performing agents
   - Recent activity summary
   - Quick action buttons

3. **Market Overview Widget**
   - Major cryptocurrency prices
   - Market cap changes
   - Trending tokens

4. **Opportunity Scanner Widget**
   - Arbitrage opportunities
   - Yield farming suggestions
   - Market inefficiencies

5. **News & Events Widget**
   - Cryptocurrency news feed
   - Economic calendar
   - Social sentiment indicators

## Advanced Features

### AI-Powered Insights
- **Performance Predictions**: ML-based performance forecasting
- **Risk Warnings**: Automated risk detection and alerts
- **Optimization Suggestions**: AI-recommended strategy improvements
- **Market Timing**: Optimal entry/exit point recommendations

### Automation Hub
\`\`\`typescript
// Dashboard automation examples
const automationRules = {
  profitTaking: {
    trigger: 'portfolio_gain > 20%',
    action: 'reduce_position_size',
    parameters: { reduction: '25%' }
  },
  riskManagement: {
    trigger: 'agent_drawdown > 15%',
    action: 'pause_agent',
    notification: true
  },
  rebalancing: {
    trigger: 'allocation_drift > 10%',
    action: 'rebalance_portfolio',
    frequency: 'weekly'
  }
};
\`\`\`

### Export & Reporting
- **PDF Reports**: Professional portfolio reports
- **CSV Exports**: Transaction and performance data
- **Tax Reports**: Automated tax calculation and reporting
- **API Access**: Programmatic data access for advanced users
    `,
  },
  analytics: {
    title: "Wallet Analytics",
    content: `
Advanced analytics tools to track and optimize your cryptocurrency portfolio and agent performance.

## Portfolio Analytics

### Real-Time Tracking
Monitor your portfolio performance across all connected wallets and blockchains:

\`\`\`typescript
interface PortfolioAnalytics {
  totalValue: {
    current: number;
    change24h: number;
    changePercent24h: number;
    allTimeHigh: number;
    allTimeLow: number;
  };
  allocation: {
    [token: string]: {
      value: number;
      percentage: number;
      change24h: number;
    };
  };
  performance: {
    daily: number[];
    weekly: number[];
    monthly: number[];
    roi: number;
    sharpeRatio: number;
    maxDrawdown: number;
  };
}
\`\`\`

### Advanced Metrics
- **Sharpe Ratio**: Risk-adjusted return calculation
- **Maximum Drawdown**: Largest peak-to-trough decline
- **Value at Risk (VaR)**: Potential loss estimation
- **Beta Coefficient**: Market correlation analysis
- **Alpha Generation**: Excess return over market

## Agent Performance Analytics

### Individual Agent Metrics
Track each agent's performance with detailed analytics:

1. **Profitability Analysis**
   - Total profit/loss
   - Win rate percentage
   - Average trade size
   - Risk-reward ratio

2. **Execution Quality**
   - Slippage analysis
   - Fill rate statistics
   - Latency measurements
   - Error rate tracking

3. **Strategy Effectiveness**
   - Strategy comparison
   - Market condition performance
   - Adaptation metrics
   - Learning curve analysis

### Comparative Analysis
- **Agent vs Agent**: Side-by-side performance comparison
- **Agent vs Market**: Benchmark against market indices
- **Strategy Effectiveness**: Compare different trading strategies
- **Risk-Adjusted Returns**: Performance relative to risk taken

## Market Intelligence

### Price Analysis
Advanced charting and technical analysis tools:
- **Multiple Timeframes**: 1m to 1Y charts
- **Technical Indicators**: 50+ built-in indicators
- **Drawing Tools**: Trend lines, support/resistance
- **Alert System**: Price and indicator-based alerts

### Social Sentiment
- **Fear & Greed Index**: Market sentiment measurement
- **Social Media Sentiment**: Twitter, Reddit analysis
- **News Impact**: Price correlation with news events
- **Whale Activity**: Large transaction monitoring

## Risk Management

### Portfolio Risk Assessment
\`\`\`typescript
interface RiskMetrics {
  portfolioRisk: {
    volatility: number;
    correlation: number[][];
    concentrationRisk: number;
    liquidityRisk: number;
  };
  agentRisk: {
    [agentId: string]: {
      var95: number;
      expectedShortfall: number;
      maximumLoss: number;
      riskScore: number;
    };
  };
  recommendations: {
    diversification: string[];
    positionSizing: string[];
    hedging: string[];
  };
}
\`\`\`

### Automated Alerts
Set up intelligent alerts based on:
- **Portfolio thresholds**: Value changes, allocation drifts
- **Risk limits**: VaR breaches, drawdown limits
- **Market conditions**: Volatility spikes, volume alerts
- **Agent performance**: Profit targets, loss limits

## Reporting & Export

### Automated Reports
- **Daily Summaries**: Performance recap and insights
- **Weekly Analysis**: Detailed strategy performance
- **Monthly Reviews**: Comprehensive portfolio analysis
- **Tax Reports**: Realized gains/losses for tax purposes

### Export Options
- **CSV/Excel**: Raw data for external analysis
- **PDF Reports**: Professional presentation format
- **API Integration**: Real-time data feeds
- **Webhook Notifications**: Automated data streaming
    `,
  },
  "agent-management": {
    title: "Agent Management",
    content: `
Comprehensive guide to managing your AI agents throughout their lifecycle.

## Agent Lifecycle

### 1. Planning Phase
Before deploying an agent, consider:
- **Objective Definition**: Clear goals and success metrics
- **Risk Tolerance**: Maximum acceptable loss levels
- **Time Horizon**: Short-term vs long-term strategies
- **Market Conditions**: Current market environment suitability

### 2. Configuration Phase
Set up your agent with optimal parameters:

\`\`\`typescript
interface AgentConfiguration {
  strategy: {
    type: 'trading' | 'arbitrage' | 'yield-farming' | 'custom';
    parameters: {
      riskLevel: 'low' | 'medium' | 'high';
      maxPositionSize: number;
      stopLoss: number;
      takeProfit: number;
      timeframe: string;
    };
  };
  execution: {
    slippageTolerance: number;
    maxGasPrice: number;
    retryAttempts: number;
    cooldownPeriod: number;
  };
  monitoring: {
    alertThresholds: {
      profit: number;
      loss: number;
      drawdown: number;
    };
    reportingFrequency: 'real-time' | 'hourly' | 'daily';
  };
}
\`\`\`

### 3. Deployment Phase
Launch your agent with these deployment options:
- **Sandbox Mode**: Test with paper trading
- **Limited Deployment**: Start with small capital
- **Full Deployment**: Production with full capital
- **Gradual Scaling**: Incremental capital increases

### 4. Monitoring Phase
Continuously track agent performance:
- **Real-time Dashboards**: Live performance metrics
- **Alert Systems**: Automated notifications
- **Performance Reviews**: Regular strategy assessment
- **Risk Monitoring**: Ongoing risk evaluation

## Agent Types & Strategies

### Trading Agents
Specialized in cryptocurrency trading:

**Momentum Trading**
- Identifies and follows price trends
- Uses technical indicators for entry/exit
- Optimized for trending markets
- Risk management through stop-losses

**Mean Reversion**
- Profits from price corrections
- Identifies overbought/oversold conditions
- Works best in ranging markets
- Quick profit-taking strategies

**Arbitrage Agents**
- Cross-exchange price differences
- Cross-chain arbitrage opportunities
- Triangular arbitrage within exchanges
- Statistical arbitrage strategies

### DeFi Agents
Focused on decentralized finance:

**Yield Farming**
- Automatic yield optimization
- Pool hopping for best rates
- Compound interest strategies
- Impermanent loss management

**Liquidity Provision**
- AMM liquidity provision
- Dynamic fee collection
- Rebalancing strategies
- Risk-adjusted returns

## Advanced Management Features

### Multi-Agent Coordination
Coordinate multiple agents for enhanced performance:

\`\`\`typescript
// Multi-agent portfolio management
const portfolioManager = {
  agents: [
    { id: 'agent1', allocation: 0.4, strategy: 'momentum' },
    { id: 'agent2', allocation: 0.3, strategy: 'arbitrage' },
    { id: 'agent3', allocation: 0.3, strategy: 'yield-farming' }
  ],
  rebalancing: {
    frequency: 'weekly',
    threshold: 0.1, // 10% allocation drift
    method: 'performance-weighted'
  },
  riskManagement: {
    maxCorrelation: 0.7,
    maxDrawdown: 0.15,
    emergencyStop: true
  }
};
\`\`\`

### Performance Optimization
- **A/B Testing**: Compare strategy variations
- **Parameter Tuning**: Optimize agent parameters
- **Machine Learning**: Adaptive strategy improvement
- **Backtesting**: Historical performance validation

### Emergency Controls
- **Pause/Resume**: Temporary agent suspension
- **Emergency Stop**: Immediate position closure
- **Risk Override**: Manual risk limit adjustment
- **Capital Withdrawal**: Partial or full capital removal
    `,
  },
  "deployment-overview": {
    title: "Agent Deployment Overview",
    content: `
Complete guide to deploying AI agents on the MindMint platform.

## Deployment Process

### Pre-Deployment Checklist
Before deploying your agent, ensure:
- ✅ **Wallet Connected**: Verified wallet with sufficient funds
- ✅ **Strategy Defined**: Clear trading/operational strategy
- ✅ **Risk Parameters**: Defined risk tolerance and limits
- ✅ **Testing Complete**: Sandbox testing successful
- ✅ **Documentation**: Strategy and parameters documented

### Deployment Methods

#### 1. Quick Deploy (Recommended for Beginners)
Use pre-configured agent templates:
- **One-click deployment**
- **Vetted strategies**
- **Optimized parameters**
- **Built-in risk management**

#### 2. Custom Configuration
Modify existing templates:
- **Parameter adjustment**
- **Strategy customization**
- **Risk level modification**
- **Performance optimization**

#### 3. Advanced Development
Build from scratch:
- **Custom logic development**
- **Unique strategy implementation**
- **Advanced feature integration**
- **Full control over behavior**

## Deployment Environments

### Sandbox Environment
Risk-free testing environment:
\`\`\`typescript
const sandboxConfig = {
  environment: 'sandbox',
  virtualBalance: 10000, // Virtual USDC for testing
  realTimeData: true,    // Live market data
  transactionSim: true,  // Simulated transactions
  performance: {
    tracking: true,
    analytics: true,
    reporting: 'detailed'
  }
};
\`\`\`

**Sandbox Features:**
- **Paper Trading**: No real money at risk
- **Live Data**: Real market conditions
- **Full Analytics**: Complete performance tracking
- **Strategy Validation**: Test before real deployment

### Testnet Environment
Blockchain testnet deployment:
- **Real Blockchain**: Actual testnet transactions
- **Test Tokens**: Free test cryptocurrency
- **Network Testing**: Smart contract interaction
- **Gas Optimization**: Transaction cost optimization

### Mainnet Environment
Production deployment:
- **Real Assets**: Actual cryptocurrency trading
- **Live Markets**: Real market participation
- **Full Features**: All platform capabilities
- **Maximum Performance**: Optimized execution

## Deployment Configuration

### Basic Configuration
\`\`\`json
{
  "agentName": "My Trading Bot",
  "strategy": "momentum-trading",
  "blockchain": "solana",
  "initialCapital": 1000,
  "riskLevel": "medium",
  "maxDrawdown": 15,
  "stopLoss": 5,
  "takeProfit": 10,
  "timeframe": "4h"
}
\`\`\`

### Advanced Configuration
\`\`\`json
{
  "agentName": "Advanced Arbitrage Bot",
  "strategy": "cross-chain-arbitrage",
  "blockchains": ["ethereum", "polygon", "solana"],
  "capitalAllocation": {
    "ethereum": 0.5,
    "polygon": 0.3,
    "solana": 0.2
  },
  "parameters": {
    "minProfitThreshold": 0.5,
    "maxSlippage": 1.0,
    "gasOptimization": true,
    "frontRunProtection": true
  },
  "monitoring": {
    "alertsEnabled": true,
    "reportingInterval": "1h",
    "performanceTracking": "detailed"
  }
}
\`\`\`

## Post-Deployment Management

### Monitoring Dashboard
Real-time agent monitoring:
- **Live Performance**: Current profit/loss
- **Transaction History**: All executed trades
- **Strategy Analytics**: Effectiveness metrics
- **Risk Monitoring**: Current risk exposure

### Performance Optimization
- **Parameter Tuning**: Adjust based on performance
- **Strategy Refinement**: Improve based on results
- **Market Adaptation**: Adjust to changing conditions
- **Risk Adjustment**: Modify risk parameters

### Scaling Operations
- **Capital Increases**: Add more funds to successful agents
- **Multi-Agent Deployment**: Deploy multiple strategies
- **Cross-Chain Expansion**: Expand to additional blockchains
- **Strategy Diversification**: Add complementary strategies

## Deployment Best Practices

### Risk Management
1. **Start Small**: Begin with limited capital
2. **Gradual Scaling**: Increase investment gradually
3. **Diversification**: Use multiple strategies
4. **Regular Monitoring**: Check performance frequently
5. **Emergency Procedures**: Have exit strategies ready

### Performance Optimization
1. **Backtesting**: Validate strategies historically
2. **Paper Trading**: Test without risk first
3. **Parameter Optimization**: Fine-tune settings
4. **Market Analysis**: Understand market conditions
5. **Continuous Learning**: Adapt and improve

### Security Considerations
1. **Wallet Security**: Use hardware wallets for large amounts
2. **API Keys**: Secure and rotate regularly
3. **Access Control**: Limit deployment permissions
4. **Audit Trail**: Maintain deployment records
5. **Emergency Contacts**: Have support channels ready
    `,
  },
  "agent-types": {
    title: "Agent Types & Capabilities",
    content: `
Comprehensive overview of all agent types available on the MindMint platform.

## Core Agent Categories

### 1. Trading Agents
Sophisticated AI agents designed for cryptocurrency trading across multiple strategies.

#### Momentum Trading Agent
**Best For**: Trending markets with clear directional movement
**Strategy**: Identifies and rides price trends using technical indicators
**Features**:
- RSI, MACD, Moving Average analysis
- Dynamic stop-loss adjustment
- Volume-based confirmation
- Multi-timeframe analysis

\`\`\`typescript
const momentumAgent = {
  type: 'momentum-trading',
  parameters: {
    trendThreshold: 0.02,      // 2% minimum trend
    volumeMultiplier: 1.5,     // Volume confirmation
    indicators: ['RSI', 'MACD', 'EMA'],
    timeframes: ['4h', '1d'],
    riskManagement: {
      stopLoss: 0.05,          // 5% stop loss
      trailingStop: true,
      positionSizing: 'kelly'   // Kelly criterion
    }
  }
};
\`\`\`

### 2. DeFi Agents
Specialized in decentralized finance protocols and yield optimization.

#### Yield Farming Agent
**Capabilities**:
- Automatic yield optimization across protocols
- Impermanent loss calculation and mitigation
- Pool hopping for maximum APY
- Compound interest reinvestment

## Agent Selection Guide

### For Beginners
1. **Start with Trading Bots**: Simple momentum or mean reversion
2. **Use Pre-configured Templates**: Vetted parameters
3. **Begin with Small Capital**: Limit initial risk
4. **Focus on Learning**: Understand strategy mechanics
    `,
  },
  "store-overview": {
    title: "Agent Store Overview",
    content: `
Explore MindMint's comprehensive marketplace for AI agents, tools, and services.

## Store Categories

### Pre-built Agents
Ready-to-deploy agents created by the MindMint team and community developers.

#### Featured Agents
**Professional Grade**:
- Extensively backtested strategies
- Institutional-quality risk management
- Comprehensive documentation
- 24/7 monitoring and support

## Marketplace Features

### Agent Discovery
Advanced filtering and search capabilities for finding the perfect agent for your needs.

### Quality Assurance
All store agents undergo rigorous verification including code audits, backtesting validation, and comprehensive risk assessment.
    `,
  },
  "mcp-overview": {
    title: "MCP Protocol Overview",
    content: `
Understanding the Model Context Protocol (MCP) and its role in MindMint's ecosystem.

## What is MCP?

The Model Context Protocol (MCP) is an open standard that enables secure, controlled connections between AI applications and external data sources and tools.

### Key Benefits of MCP Integration

1. **Standardized Interfaces**: Consistent API patterns across all services
2. **Security**: Controlled access with permission management
3. **Scalability**: Easy addition of new services and capabilities
4. **Interoperability**: Cross-platform compatibility
5. **Transparency**: Clear service documentation and capabilities

## Available Service Categories

### 1. Data Services
- Real-time price feeds
- Historical data archives
- Trading volume analytics
- Market sentiment indicators

### 2. Trading Services
- Order placement and management
- Portfolio tracking
- Trade execution optimization
- Fee calculation and optimization

### 3. Analytics Services
- Chart pattern recognition
- Indicator calculations
- Signal generation
- Backtesting frameworks
    `,
  },
};

const getDocumentationContent = (sectionId: string) => {
  return contentData[sectionId as keyof typeof contentData] || null;
};

interface DocsSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
  expandedSections: Set<string>;
  onToggleSection: (sectionId: string) => void;
}

function DocsSidebar({
  isOpen,
  onToggle,
  activeSection,
  onSectionChange,
  expandedSections,
  onToggleSection,
}: DocsSidebarProps) {
  return (
    <>
      {/* Mobile backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
            onClick={onToggle}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-20 h-[calc(100vh-5rem)] w-80 bg-black/90 backdrop-blur-xl border-r border-purple-500/20 z-50 
          transition-transform duration-300 ease-in-out custom-scrollbar overflow-y-auto
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:relative lg:translate-x-0 lg:top-0 lg:h-auto lg:w-80 lg:flex-shrink-0 lg:block
        `}
      >
        {/* Animated gradient background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 opacity-50"
          animate={{
            background: [
              "linear-gradient(to bottom right, rgba(147, 51, 234, 0.1), transparent, rgba(59, 130, 246, 0.1))",
              "linear-gradient(to bottom right, rgba(59, 130, 246, 0.1), transparent, rgba(147, 51, 234, 0.1))",
              "linear-gradient(to bottom right, rgba(147, 51, 234, 0.1), transparent, rgba(59, 130, 246, 0.1))",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <motion.h2
              className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-300"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Documentation
            </motion.h2>
            <button
              onClick={onToggle}
              className="lg:hidden p-2 text-white/70 hover:text-white transition-colors"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {Object.entries(documentationSections).map(
              ([sectionId, section], index) => (
                <motion.div
                  key={sectionId}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  className="relative"
                >
                  <button
                    onClick={() => onToggleSection(sectionId)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-all duration-300 group ${
                      expandedSections.has(sectionId)
                        ? "bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 text-white"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <span className="text-lg">{section.icon}</span>
                    <span className="flex-1 font-medium">{section.title}</span>
                    <motion.div
                      animate={{
                        rotate: expandedSections.has(sectionId) ? 90 : 0,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronRightIcon className="w-4 h-4" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {expandedSections.has(sectionId) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="ml-10 mt-2 space-y-1">
                          {section.sections?.map((subsection) => (
                            <button
                              key={subsection.id}
                              onClick={() => onSectionChange(subsection.id)}
                              className={`block w-full px-3 py-2 text-sm text-left rounded-md transition-all duration-200 ${
                                activeSection === subsection.id
                                  ? "bg-gradient-to-r from-purple-500/30 to-blue-500/30 text-white"
                                  : "text-white/60 hover:text-white hover:bg-white/5"
                              }`}
                            >
                              {subsection.title}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            )}
          </nav>
        </div>
      </aside>
    </>
  );
}

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

function SearchBar({ searchQuery, onSearchChange }: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <div
        className={`relative transition-all duration-300 ${
          isFocused ? "transform scale-105" : ""
        }`}
      >
        <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
        <input
          type="text"
          placeholder="Search documentation..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-md border rounded-xl text-white placeholder-white/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
            isFocused
              ? "border-purple-500/50 bg-white/15"
              : "border-white/20 hover:border-white/30"
          }`}
        />
        {isFocused && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl -z-10 blur-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </div>
    </motion.div>
  );
}

interface DocsContentProps {
  activeSection: string;
  searchQuery: string;
}

function DocsContent({ activeSection, searchQuery }: DocsContentProps) {
  const content = contentData[activeSection as keyof typeof contentData];

  // Search functionality
  const getFilteredContent = () => {
    if (!searchQuery.trim()) {
      return content;
    }

    // Search through all content sections
    const searchLower = searchQuery.toLowerCase();
    const matchingSections: Array<{
      id: string;
      title: string;
      content: string;
      relevance: number;
    }> = [];

    Object.entries(contentData).forEach(([id, section]) => {
      const titleMatch = section.title.toLowerCase().includes(searchLower);
      const contentMatch = section.content.toLowerCase().includes(searchLower);

      if (titleMatch || contentMatch) {
        let relevance = 0;
        if (titleMatch) relevance += 10;
        if (contentMatch) relevance += 1;

        matchingSections.push({
          id,
          title: section.title,
          content: section.content,
          relevance,
        });
      }
    });

    // Sort by relevance
    matchingSections.sort((a, b) => b.relevance - a.relevance);

    if (matchingSections.length === 0) {
      return {
        title: "No Results Found",
        content: `No documentation found for "${searchQuery}". Try different keywords or browse the navigation sections.`,
      };
    }

    // If searching, show combined results
    if (matchingSections.length === 1) {
      return {
        title: matchingSections[0].title,
        content: matchingSections[0].content,
      };
    }

    // Multiple results - show summary
    const resultsSummary = matchingSections
      .map((section) => {
        const snippet =
          section.content
            .replace(/```[\s\S]*?```/g, "") // Remove code blocks
            .replace(/#{1,6}\s/g, "") // Remove markdown headers
            .substring(0, 200)
            .trim() + "...";

        return `## ${section.title}\n${snippet}\n`;
      })
      .join("\n");

    return {
      title: `Search Results for "${searchQuery}"`,
      content: `Found ${matchingSections.length} results:\n\n${resultsSummary}`,
    };
  };

  const displayContent = getFilteredContent();

  if (!displayContent) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center min-h-[400px] text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <SparklesIcon className="w-16 h-16 text-purple-500 mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Coming Soon</h2>
        <p className="text-white/70">
          This section is being prepared with comprehensive documentation.
        </p>
      </motion.div>
    );
  }

  const highlightSearchTerm = (text: string, searchTerm: string) => {
    if (!searchTerm.trim()) return text;

    const regex = new RegExp(
      `(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
      "gi"
    );
    return text.replace(regex, "**$1**");
  };

  const renderContent = (text: string) => {
    const processedText = searchQuery
      ? highlightSearchTerm(text, searchQuery)
      : text;
    const lines = processedText.split("\n");
    const elements: JSX.Element[] = [];
    let currentCodeBlock = "";
    let currentLanguage = "";
    let inCodeBlock = false;

    lines.forEach((line, index) => {
      if (line.startsWith("```")) {
        if (inCodeBlock) {
          // End of code block
          elements.push(
            <CodeBlock
              key={`code-${index}`}
              code={currentCodeBlock.trim()}
              language={currentLanguage}
            />
          );
          currentCodeBlock = "";
          currentLanguage = "";
          inCodeBlock = false;
        } else {
          // Start of code block
          currentLanguage = line.replace("```", "") || "text";
          inCodeBlock = true;
        }
      } else if (inCodeBlock) {
        currentCodeBlock += line + "\n";
      } else if (line.startsWith("## ")) {
        elements.push(
          <motion.h3
            key={`h3-${index}`}
            className="text-xl font-bold text-white mt-8 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-300"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            dangerouslySetInnerHTML={{
              __html: line
                .replace("## ", "")
                .replace(
                  /\*\*(.*?)\*\*/g,
                  '<mark class="bg-purple-500/30 text-white">$1</mark>'
                ),
            }}
          />
        );
      } else if (line.startsWith("# ")) {
        elements.push(
          <motion.h2
            key={`h2-${index}`}
            className="text-2xl font-bold text-white mt-6 mb-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            dangerouslySetInnerHTML={{
              __html: line
                .replace("# ", "")
                .replace(
                  /\*\*(.*?)\*\*/g,
                  '<mark class="bg-purple-500/30 text-white">$1</mark>'
                ),
            }}
          />
        );
      } else if (line.startsWith("- ")) {
        elements.push(
          <motion.li
            key={`li-${index}`}
            className="text-white/80 mb-2 ml-6"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            dangerouslySetInnerHTML={{
              __html: line
                .replace("- ", "")
                .replace(
                  /\*\*(.*?)\*\*/g,
                  '<mark class="bg-purple-500/30 text-white">$1</mark>'
                ),
            }}
          />
        );
      } else if (line.match(/^\d+\. /)) {
        elements.push(
          <motion.li
            key={`oli-${index}`}
            className="text-white/80 mb-2 ml-6"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            dangerouslySetInnerHTML={{
              __html: line
                .replace(/^\d+\. /, "")
                .replace(
                  /\*\*(.*?)\*\*/g,
                  '<mark class="bg-purple-500/30 text-white">$1</mark>'
                ),
            }}
          />
        );
      } else if (line.trim()) {
        elements.push(
          <motion.p
            key={`p-${index}`}
            className="text-white/80 mb-4 leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            dangerouslySetInnerHTML={{
              __html: line.replace(
                /\*\*(.*?)\*\*/g,
                '<mark class="bg-purple-500/30 text-white">$1</mark>'
              ),
            }}
          />
        );
      }
    });

    return elements;
  };

  return (
    <motion.div
      className="max-w-4xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      key={searchQuery} // Re-animate when search changes
    >
      <motion.h1
        className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-blue-300"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {displayContent.title}
      </motion.h1>

      {searchQuery && (
        <motion.div
          className="mb-6 p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-purple-300 text-sm">
            <MagnifyingGlassIcon className="w-4 h-4 inline mr-2" />
            Searching for: <strong>"{searchQuery}"</strong>
            <button
              onClick={() => window.history.replaceState({}, "", "/docs")}
              className="ml-4 text-purple-400 hover:text-purple-300 underline"
            >
              Clear search
            </button>
          </p>
        </motion.div>
      )}

      <motion.div
        className="prose prose-invert max-w-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        {renderContent(displayContent.content)}
      </motion.div>
    </motion.div>
  );
}

export default function DocsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("introduction");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(["getting-started"])
  );

  // Set sidebar open by default on desktop
  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth >= 1024) {
        // lg breakpoint
        setIsSidebarOpen(true);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
    setSearchQuery(""); // Clear search when changing sections
    setIsSidebarOpen(false); // Close mobile sidebar when section changes
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    // If searching, don't change active section
    if (query.trim()) {
      // Optional: could set to a special "search" section
    }
  };

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isSidebarOpen &&
        !(event.target as Element).closest("aside") &&
        !(event.target as Element).closest("[data-sidebar-toggle]")
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-3/4 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10 pt-20">
        {/* Hero Section */}
        <motion.section
          className="px-6 py-16 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="flex items-center justify-center mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
          >
            <motion.div
              className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mr-4"
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <SparklesIcon className="w-8 h-8 text-white" />
            </motion.div>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-blue-300"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            MindMint Documentation
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-white/70 mb-12 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            All you need to know about using, integrating, and building with
            MindMint agents, tools, and MCP services.
          </motion.p>

          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
          />
        </motion.section>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row">
          {/* Mobile menu button */}
          <motion.button
            data-sidebar-toggle
            onClick={toggleSidebar}
            className="lg:hidden fixed top-24 left-4 z-50 p-3 bg-black/90 backdrop-blur-xl border border-purple-500/30 rounded-lg text-white hover:bg-purple-500/20 transition-all duration-300"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bars3Icon className="w-6 h-6" />
          </motion.button>

          {/* Sidebar */}
          <DocsSidebar
            isOpen={isSidebarOpen}
            onToggle={toggleSidebar}
            activeSection={activeSection}
            onSectionChange={handleSectionChange}
            expandedSections={expandedSections}
            onToggleSection={toggleSection}
          />

          {/* Content Area */}
          <motion.main
            className="flex-1 px-6 lg:px-12 py-8 lg:py-16"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <DocsContent
              activeSection={activeSection}
              searchQuery={searchQuery}
            />
          </motion.main>
        </div>
      </div>
    </div>
  );
}
