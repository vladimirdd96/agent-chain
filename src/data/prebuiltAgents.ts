import { PrebuiltAgent } from "@/types/agent";

export const prebuiltAgents: PrebuiltAgent[] = [
  {
    id: "crypto-analyst-pro",
    name: "CryptoAnalyst Pro",
    description:
      "Advanced real-time cryptocurrency analysis with market sentiment tracking and price predictions",
    chainCompatibility: ["Ethereum", "Polygon", "Binance Smart Chain"],
    features: [
      "Live token price tracking across multiple chains",
      "Advanced market sentiment analysis using social data",
      "Historical performance charts with technical indicators",
      "Price prediction algorithms based on on-chain data",
      "Portfolio risk assessment and diversification recommendations",
      "Real-time whale transaction monitoring",
      "DeFi protocol yield tracking",
    ],
    visualRepresentation: "📈",
    avatar: "/images/agents/crypto-analyst.svg",
    category: "Analytics",
    isMinted: false,
    price: 0.5, // in ETH
    interactionHistory: [],
    capabilities: [
      {
        id: "price-tracking",
        name: "Real-time Price Tracking",
        description: "Track token prices across multiple chains",
        requiresMinting: false,
        moralisEndpoints: ["token/price", "token/stats"],
      },
      {
        id: "sentiment-analysis",
        name: "Market Sentiment Analysis",
        description:
          "Analyze market sentiment from social media and trading data",
        requiresMinting: true,
        moralisEndpoints: ["token/price", "token/metadata"],
      },
      {
        id: "whale-tracking",
        name: "Whale Transaction Monitoring",
        description: "Monitor large transactions and wallet movements",
        requiresMinting: true,
        moralisEndpoints: ["account/transactions", "account/balance"],
      },
      {
        id: "risk-assessment",
        name: "Portfolio Risk Assessment",
        description: "Comprehensive portfolio analysis and risk scoring",
        requiresMinting: true,
        moralisEndpoints: ["account/portfolio", "token/price"],
      },
    ],
  },
  {
    id: "defi-strategist-ai",
    name: "DeFi Strategist AI",
    description:
      "Intelligent DeFi investment assistant for optimal yield farming and liquidity provision strategies",
    chainCompatibility: ["Solana", "Binance Smart Chain", "Avalanche"],
    features: [
      "Real-time yield farming opportunity scanner",
      "Automated risk assessment for DeFi protocols",
      "Liquidity pool performance analytics",
      "Impermanent loss calculations and predictions",
      "Cross-chain yield comparison tools",
      "Smart contract security analysis",
      "Portfolio rebalancing recommendations",
    ],
    visualRepresentation: "🏦",
    avatar: "/images/agents/defi-strategist.svg",
    category: "DeFi",
    isMinted: false,
    price: 0.75, // in ETH
    interactionHistory: [],
    capabilities: [
      {
        id: "yield-scanning",
        name: "Yield Opportunity Scanner",
        description:
          "Scan for high-yield farming opportunities across protocols",
        requiresMinting: false,
        moralisEndpoints: ["defi/protocol", "defi/positions"],
      },
      {
        id: "risk-analysis",
        name: "DeFi Risk Analysis",
        description: "Comprehensive risk assessment for DeFi protocols",
        requiresMinting: true,
        moralisEndpoints: ["defi/protocol", "defi/tvl"],
      },
      {
        id: "impermanent-loss",
        name: "Impermanent Loss Calculator",
        description: "Calculate and predict impermanent loss for LP positions",
        requiresMinting: true,
        moralisEndpoints: ["defi/pairs", "token/price"],
      },
      {
        id: "portfolio-optimization",
        name: "Portfolio Optimization",
        description: "AI-driven portfolio rebalancing and optimization",
        requiresMinting: true,
        moralisEndpoints: ["account/portfolio", "defi/positions"],
      },
    ],
  },
  {
    id: "nft-curator-expert",
    name: "NFT Curator Expert",
    description:
      "Professional NFT collection analysis and market intelligence for collectors and traders",
    chainCompatibility: ["Ethereum", "Solana"],
    features: [
      "Advanced NFT rarity analysis and scoring",
      "Collection performance tracking and analytics",
      "Upcoming drops calendar with rarity predictions",
      "Floor price monitoring and trend analysis",
      "Whale collector activity tracking",
      "Cross-platform arbitrage opportunities",
      "AI-powered authenticity verification",
    ],
    visualRepresentation: "🖼️",
    avatar: "/images/agents/nft-curator.svg",
    category: "NFT",
    isMinted: false,
    price: 0.3, // in ETH
    interactionHistory: [],
    capabilities: [
      {
        id: "rarity-analysis",
        name: "NFT Rarity Analysis",
        description: "Advanced rarity scoring and trait analysis",
        requiresMinting: false,
        moralisEndpoints: ["nft/collection", "nft/metadata"],
      },
      {
        id: "collection-tracking",
        name: "Collection Performance Tracking",
        description: "Track collection metrics and market performance",
        requiresMinting: true,
        moralisEndpoints: ["nft/collection/stats", "nft/trades"],
      },
      {
        id: "whale-tracking-nft",
        name: "NFT Whale Activity",
        description:
          "Monitor high-value NFT transactions and collector activity",
        requiresMinting: true,
        moralisEndpoints: ["nft/transfers", "account/nfts"],
      },
      {
        id: "arbitrage-finder",
        name: "Cross-Platform Arbitrage",
        description: "Find arbitrage opportunities across NFT marketplaces",
        requiresMinting: true,
        moralisEndpoints: ["nft/collection", "nft/lowest-price"],
      },
    ],
  },
  {
    id: "trading-bot-alpha",
    name: "Trading Bot Alpha",
    description:
      "Sophisticated algorithmic trading assistant with advanced technical analysis and automated strategies",
    chainCompatibility: ["Ethereum", "Polygon", "Arbitrum"],
    features: [
      "Advanced technical analysis with 50+ indicators",
      "Automated trading signal generation",
      "Risk management and position sizing",
      "Backtesting capabilities for strategies",
      "Real-time market scanning and alerts",
      "Portfolio performance analytics",
      "Multi-timeframe analysis",
    ],
    visualRepresentation: "🤖",
    avatar: "/images/agents/trading-bot.svg",
    category: "Trading",
    isMinted: false,
    price: 1.0, // in ETH
    interactionHistory: [],
    capabilities: [
      {
        id: "technical-analysis",
        name: "Technical Analysis Suite",
        description:
          "Comprehensive technical analysis with multiple indicators",
        requiresMinting: false,
        moralisEndpoints: ["token/price", "token/stats"],
      },
      {
        id: "signal-generation",
        name: "Trading Signal Generation",
        description: "AI-powered trading signals with confidence scores",
        requiresMinting: true,
        moralisEndpoints: ["token/price", "token/stats"],
      },
      {
        id: "backtesting",
        name: "Strategy Backtesting",
        description: "Test trading strategies against historical data",
        requiresMinting: true,
        moralisEndpoints: ["token/price"],
      },
      {
        id: "risk-management",
        name: "Advanced Risk Management",
        description: "Sophisticated position sizing and risk control",
        requiresMinting: true,
        moralisEndpoints: ["account/portfolio", "token/price"],
      },
    ],
  },
  {
    id: "blockchain-researcher",
    name: "Blockchain Researcher",
    description:
      "Comprehensive blockchain data analysis and research assistant for in-depth market intelligence",
    chainCompatibility: [
      "Ethereum",
      "Solana",
      "Polygon",
      "Binance Smart Chain",
    ],
    features: [
      "On-chain data analysis and visualization",
      "Network health and activity monitoring",
      "Smart contract interaction analysis",
      "Token economics and tokenomics research",
      "Governance proposal tracking and analysis",
      "Cross-chain activity correlation",
      "Institutional flow tracking",
    ],
    visualRepresentation: "🔬",
    avatar: "/images/agents/blockchain-researcher.svg",
    category: "Research",
    isMinted: false,
    price: 0.6, // in ETH
    interactionHistory: [],
    capabilities: [
      {
        id: "onchain-analysis",
        name: "On-Chain Data Analysis",
        description: "Deep dive into blockchain transaction data",
        requiresMinting: false,
        moralisEndpoints: ["block/stats", "account/transactions"],
      },
      {
        id: "network-monitoring",
        name: "Network Health Monitoring",
        description: "Monitor blockchain network performance and health",
        requiresMinting: true,
        moralisEndpoints: ["block/stats", "transaction/verbose"],
      },
      {
        id: "governance-tracking",
        name: "Governance Proposal Tracking",
        description: "Track and analyze DAO governance proposals",
        requiresMinting: true,
        moralisEndpoints: ["token/metadata", "account/transactions"],
      },
      {
        id: "institutional-flows",
        name: "Institutional Flow Analysis",
        description: "Track large institutional blockchain movements",
        requiresMinting: true,
        moralisEndpoints: ["account/transactions", "account/balance"],
      },
    ],
  },
  {
    id: "portfolio-optimizer",
    name: "Portfolio Optimizer Pro",
    description:
      "AI-driven portfolio management with risk optimization and automated rebalancing strategies",
    chainCompatibility: ["Ethereum", "Polygon", "Solana"],
    features: [
      "Multi-chain portfolio tracking and analysis",
      "Risk-adjusted return optimization",
      "Automated rebalancing recommendations",
      "Correlation analysis across assets",
      "Tax optimization strategies",
      "Performance benchmarking",
      "Diversification scoring and recommendations",
    ],
    visualRepresentation: "📊",
    avatar: "/images/agents/portfolio-optimizer.svg",
    category: "Analytics",
    isMinted: false,
    price: 0.8, // in ETH
    interactionHistory: [],
    capabilities: [
      {
        id: "portfolio-tracking",
        name: "Multi-Chain Portfolio Tracking",
        description: "Comprehensive portfolio tracking across multiple chains",
        requiresMinting: false,
        moralisEndpoints: ["account/portfolio", "account/balance"],
      },
      {
        id: "risk-optimization",
        name: "Risk-Return Optimization",
        description: "Optimize portfolio for risk-adjusted returns",
        requiresMinting: true,
        moralisEndpoints: ["account/portfolio", "token/price", "token/stats"],
      },
      {
        id: "rebalancing",
        name: "Automated Rebalancing",
        description: "AI-powered portfolio rebalancing recommendations",
        requiresMinting: true,
        moralisEndpoints: ["account/portfolio", "token/price"],
      },
      {
        id: "tax-optimization",
        name: "Tax Loss Harvesting",
        description: "Optimize portfolio for tax efficiency",
        requiresMinting: true,
        moralisEndpoints: ["account/transactions", "token/price"],
      },
    ],
  },
  {
    id: "deep-research-agent",
    name: "Deep Research Agent",
    description:
      "A specialized project research assistant designed for the crypto space that generates comprehensive reports on any topic following a workflow similar to OpenAI and Gemini Deep Research.",
    chainCompatibility: ["Ethereum", "Solana", "Polygon", "Binance Smart Chain", "Arbitrum", "Avalanche"],
    features: [
      "Customizable research workflows",
      "Multi-model integration with OpenAI o1-preview for deep reasoning",
      "Advanced data sourcing from multiple APIs and web sources",
      "Structured report generation with executive summaries",
      "Project due diligence analysis",
      "Market analysis and competitor research",
      "Technology evaluation and risk assessment",
      "Real-time data integration and fact-checking",
    ],
    visualRepresentation: "🔬",
    avatar: "/images/agents/deep-research.svg",
    category: "Research",
    isMinted: false,
    price: 0.8, // in ETH
    interactionHistory: [],
    capabilities: [
      {
        id: "quick-research",
        name: "Quick Research Summary",
        description: "Generate a brief research summary on any crypto project or topic",
        requiresMinting: false,
      },
      {
        id: "comprehensive-report",
        name: "Comprehensive Research Report",
        description: "Generate detailed research reports with multi-dimensional analysis, risk assessment, and market intelligence",
        requiresMinting: true,
      },
      {
        id: "due-diligence",
        name: "Project Due Diligence",
        description: "In-depth due diligence analysis including tokenomics, team background, and technical assessment",
        requiresMinting: true,
      },
      {
        id: "market-analysis",
        name: "Advanced Market Analysis",
        description: "Comprehensive market analysis with competitive landscape, trend analysis, and growth projections",
        requiresMinting: true,
      },
      {
        id: "real-time-monitoring",
        name: "Real-time Project Monitoring",
        description: "Continuous monitoring and alerts for project developments, news, and market changes",
        requiresMinting: true,
      },
    ],
  },
];

export const getAgentById = (id: string): PrebuiltAgent | undefined => {
  return prebuiltAgents.find((agent) => agent.id === id);
};

export const getAgentsByCategory = (
  category: PrebuiltAgent["category"]
): PrebuiltAgent[] => {
  return prebuiltAgents.filter((agent) => agent.category === category);
};

export const getAgentsByChain = (chain: string): PrebuiltAgent[] => {
  return prebuiltAgents.filter((agent) =>
    agent.chainCompatibility.includes(chain)
  );
};
