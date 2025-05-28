import { NextResponse } from "next/server";

const tools = {
  "solana-agent": {
    name: "Solana-Based Agent",
    description:
      "Real-time Solana token data and wallet interaction capabilities",
    capabilities: [
      {
        name: "Token Data",
        description: "Fetch real-time token prices, market data, and analytics",
        parameters: {
          token_address: "string",
          include_history: "boolean",
          timeframe: "string",
        },
      },
      {
        name: "Wallet Analysis",
        description: "Analyze wallet holdings, transactions, and patterns",
        parameters: {
          wallet_address: "string",
          analysis_depth: "number",
        },
      },
      {
        name: "NFT Operations",
        description: "Mint, transfer, and manage NFTs via Metaplex",
        parameters: {
          operation: "string",
          metadata: "object",
        },
      },
    ],
  },
  "evm-agent": {
    name: "EVM-Based Agent",
    description: "Ethereum and EVM-compatible chain interaction capabilities",
    capabilities: [
      {
        name: "Token Analytics",
        description: "Track ERC-20 tokens and their market performance",
        parameters: {
          contract_address: "string",
          chain_id: "number",
        },
      },
      {
        name: "Wallet Insights",
        description: "Deep analysis of EVM wallet activity and holdings",
        parameters: {
          address: "string",
          include_tokens: "boolean",
        },
      },
    ],
  },
  "trade-bot": {
    name: "Trade Bot",
    description: "Automated trading and market analysis capabilities",
    capabilities: [
      {
        name: "Market Analysis",
        description: "Real-time market trend analysis and predictions",
        parameters: {
          pairs: "string[]",
          timeframe: "string",
        },
      },
      {
        name: "Trade Execution",
        description: "Execute trades based on predefined strategies",
        parameters: {
          strategy: "object",
          risk_level: "number",
        },
      },
      {
        name: "Portfolio Tracking",
        description: "Track and optimize trading portfolio performance",
        parameters: {
          portfolio_id: "string",
          rebalance: "boolean",
        },
      },
    ],
  },
  "blockchain-agent": {
    name: "Generalist Blockchain Agent",
    description: "General blockchain data and interaction capabilities",
    capabilities: [
      {
        name: "Cross-Chain Data",
        description: "Fetch and analyze data across multiple chains",
        parameters: {
          chains: "string[]",
          data_type: "string",
        },
      },
      {
        name: "Smart Contract Info",
        description: "Analyze and interact with smart contracts",
        parameters: {
          address: "string",
          chain: "string",
        },
      },
      {
        name: "Activity Monitoring",
        description: "Monitor blockchain activities and events",
        parameters: {
          filters: "object",
          alert_threshold: "number",
        },
      },
    ],
  },
  "ai-analyst": {
    name: "AI Market Analyst",
    description:
      "Advanced AI-powered market analysis and prediction tools for crypto trading and investment decisions",
    capabilities: [
      {
        name: "Price Prediction",
        description:
          "AI-powered price prediction models using multiple data sources",
        parameters: {
          token_symbol: "string",
          timeframe: "string",
          confidence_level: "number",
        },
      },
      {
        name: "Sentiment Analysis",
        description:
          "Analyze market sentiment from social media and news sources",
        parameters: {
          token_address: "string",
          data_sources: "string[]",
          time_period: "string",
        },
      },
      {
        name: "Risk Assessment",
        description:
          "AI-driven risk analysis for portfolios and individual tokens",
        parameters: {
          portfolio_data: "object",
          risk_tolerance: "string",
        },
      },
    ],
  },
  "trading-api": {
    name: "Advanced Trading API",
    description:
      "Professional-grade trading tools with DEX aggregation, arbitrage detection, and automated execution",
    capabilities: [
      {
        name: "DEX Aggregation",
        description: "Find best prices across multiple decentralized exchanges",
        parameters: {
          token_in: "string",
          token_out: "string",
          amount: "string",
          slippage: "number",
        },
      },
      {
        name: "Arbitrage Scanner",
        description: "Real-time arbitrage opportunity detection across chains",
        parameters: {
          chains: "string[]",
          min_profit: "number",
          max_gas_fee: "string",
        },
      },
      {
        name: "Smart Order Routing",
        description: "Optimize trade execution across multiple venues",
        parameters: {
          order_size: "string",
          execution_strategy: "string",
          time_limit: "number",
        },
      },
      {
        name: "Position Management",
        description:
          "Advanced position tracking and automated stop-loss/take-profit",
        parameters: {
          position_id: "string",
          stop_loss: "number",
          take_profit: "number",
        },
      },
    ],
  },
  "research-engine": {
    name: "Blockchain Research Engine",
    description:
      "Comprehensive on-chain and off-chain research tools for due diligence and project analysis",
    capabilities: [
      {
        name: "Token Analysis",
        description:
          "Deep dive analysis of token metrics, holder distribution, and liquidity",
        parameters: {
          token_address: "string",
          analysis_depth: "string",
          include_holders: "boolean",
        },
      },
      {
        name: "Project Audit",
        description:
          "Automated security audit and risk assessment for DeFi projects",
        parameters: {
          contract_address: "string",
          audit_level: "string",
          check_rugpull: "boolean",
        },
      },
      {
        name: "Whale Tracking",
        description: "Monitor large wallet movements and whale activity",
        parameters: {
          wallet_addresses: "string[]",
          min_transaction: "string",
          alert_threshold: "number",
        },
      },
      {
        name: "Social Intelligence",
        description:
          "Gather intelligence from social media, forums, and community channels",
        parameters: {
          project_name: "string",
          platforms: "string[]",
          sentiment_analysis: "boolean",
        },
      },
    ],
  },
  "search-indexer": {
    name: "Blockchain Search & Indexer",
    description:
      "High-performance blockchain data indexing and search capabilities across multiple networks",
    capabilities: [
      {
        name: "Transaction Search",
        description:
          "Fast transaction lookup and analysis across multiple chains",
        parameters: {
          transaction_hash: "string",
          chain: "string",
          include_trace: "boolean",
        },
      },
      {
        name: "Address Indexing",
        description: "Comprehensive address activity indexing and search",
        parameters: {
          address: "string",
          start_block: "number",
          end_block: "number",
        },
      },
      {
        name: "Smart Contract Events",
        description: "Index and search smart contract events and logs",
        parameters: {
          contract_address: "string",
          event_signature: "string",
          block_range: "object",
        },
      },
      {
        name: "Cross-Chain Analytics",
        description:
          "Search and analyze data across multiple blockchain networks",
        parameters: {
          chains: "string[]",
          search_query: "string",
          data_type: "string",
        },
      },
    ],
  },
  "defi-toolkit": {
    name: "DeFi Development Toolkit",
    description:
      "Complete toolkit for DeFi protocol development, yield farming, and liquidity management",
    capabilities: [
      {
        name: "Yield Optimization",
        description:
          "Find optimal yield farming opportunities across protocols",
        parameters: {
          token_pair: "string",
          min_apy: "number",
          max_risk: "string",
        },
      },
      {
        name: "Liquidity Analysis",
        description: "Analyze liquidity pools and calculate impermanent loss",
        parameters: {
          pool_address: "string",
          time_period: "string",
          calculate_il: "boolean",
        },
      },
      {
        name: "Protocol Integration",
        description: "Easy integration with major DeFi protocols",
        parameters: {
          protocol_name: "string",
          action_type: "string",
          parameters: "object",
        },
      },
      {
        name: "Flash Loan Executor",
        description: "Execute complex flash loan strategies across protocols",
        parameters: {
          loan_amount: "string",
          strategy: "object",
          profit_threshold: "number",
        },
      },
    ],
  },
  "nft-analytics": {
    name: "NFT Analytics & Tools",
    description:
      "Advanced NFT market analysis, rarity scoring, and collection management tools",
    capabilities: [
      {
        name: "Collection Analysis",
        description: "Comprehensive NFT collection metrics and trend analysis",
        parameters: {
          collection_address: "string",
          include_rarity: "boolean",
          time_period: "string",
        },
      },
      {
        name: "Rarity Calculator",
        description: "Calculate rarity scores and rank NFTs within collections",
        parameters: {
          collection_id: "string",
          trait_weights: "object",
          algorithm: "string",
        },
      },
      {
        name: "Floor Price Tracker",
        description: "Real-time floor price monitoring and alerts",
        parameters: {
          collections: "string[]",
          alert_threshold: "number",
          marketplaces: "string[]",
        },
      },
      {
        name: "Mint Tracker",
        description:
          "Track new NFT mints and identify promising projects early",
        parameters: {
          chains: "string[]",
          min_volume: "string",
          categories: "string[]",
        },
      },
    ],
  },
};

export async function GET() {
  try {
    return NextResponse.json({ tools });
  } catch (error) {
    console.error("Error in GET /tools:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
