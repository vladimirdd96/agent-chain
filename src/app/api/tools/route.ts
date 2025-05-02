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
