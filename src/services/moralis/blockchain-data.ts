import { moralis, initMoralis } from "./client";
import {
  BlockchainData,
  NFTData,
  DeFiData,
  TokenAnalysis,
  YieldOpportunity,
} from "@/types/agent";

// Ensure Moralis is initialized before making API calls
const ensureInitialized = async () => {
  await initMoralis();
};

export class BlockchainDataService {
  static async getTokenPrice(
    address: string,
    chain: string = "eth"
  ): Promise<BlockchainData> {
    await ensureInitialized();

    try {
      const response = await moralis.EvmApi.token.getTokenPrice({
        address,
        chain: chain as any,
      });

      const result = response.result as any;

      return {
        tokenPrice: result?.usdPrice || 0,
        marketCap: undefined,
        priceChange24h: result?.["24hrPercentChange"] || 0,
      };
    } catch (error) {
      console.error("Error fetching token price:", error);
      return {
        tokenPrice: 0,
        priceChange24h: 0,
      };
    }
  }

  static async getTokenStats(
    address: string,
    chain: string = "eth"
  ): Promise<BlockchainData> {
    await ensureInitialized();

    try {
      const priceData = await this.getTokenPrice(address, chain);

      return {
        tokenPrice: priceData.tokenPrice || 0,
        priceChange24h: priceData.priceChange24h || 0,
        marketCap: undefined, // Would need additional calculations
        volume24h: 0, // Would need additional API call
        holders: 0, // Would need additional API call
        transactions24h: 0, // Would need additional API call
      };
    } catch (error) {
      console.error("Error fetching token stats:", error);
      return {
        tokenPrice: 0,
        priceChange24h: 0,
      };
    }
  }

  static async getWalletPortfolio(
    address: string,
    chain: string = "eth"
  ): Promise<any[]> {
    await ensureInitialized();

    try {
      const response = await moralis.EvmApi.wallets.getWalletTokenBalancesPrice(
        {
          address,
          chain: chain as any,
        }
      );

      return (
        response.result?.map((token) => ({
          address: token.tokenAddress,
          symbol: token.symbol,
          name: token.name,
          balance: token.balanceFormatted,
          usdValue: token.usdValue,
          priceUsd: token.usdPrice,
          priceChange24h: token.usdPrice24hrPercentChange,
        })) || []
      );
    } catch (error) {
      console.error("Error fetching wallet portfolio:", error);
      return [];
    }
  }

  static async getWalletTransactions(
    address: string,
    chain: string = "eth",
    limit: number = 10
  ): Promise<any[]> {
    await ensureInitialized();

    try {
      const response = await moralis.EvmApi.transaction.getWalletTransactions({
        address,
        chain: chain as any,
        limit,
      });

      return (
        response.result?.map((tx) => ({
          hash: tx.hash,
          from: tx.from,
          to: tx.to,
          value: tx.value,
          gasPrice: tx.gasPrice,
          gasUsed: tx.gasUsed,
          blockTimestamp: tx.blockTimestamp,
          blockNumber: tx.blockNumber,
        })) || []
      );
    } catch (error) {
      console.error("Error fetching wallet transactions:", error);
      return [];
    }
  }

  static async getNFTCollectionStats(
    address: string,
    chain: string = "eth"
  ): Promise<NFTData> {
    await ensureInitialized();

    try {
      // For now, return mock data structure since NFT stats API might vary
      return {
        collection: address,
        floorPrice: 0,
        volume24h: 0,
        sales24h: 0,
        owners: 0,
        totalSupply: 0,
      };
    } catch (error) {
      console.error("Error fetching NFT collection stats:", error);
      return {
        collection: address,
        floorPrice: 0,
        volume24h: 0,
        sales24h: 0,
        owners: 0,
        totalSupply: 0,
      };
    }
  }

  static async getNFTsByWallet(
    address: string,
    chain: string = "eth",
    limit: number = 10
  ): Promise<any[]> {
    await ensureInitialized();

    try {
      const response = await moralis.EvmApi.nft.getWalletNFTs({
        address,
        chain: chain as any,
        limit,
      });

      return (
        response.result?.map((nft) => ({
          tokenAddress: nft.tokenAddress,
          tokenId: nft.tokenId,
          name: nft.name,
          symbol: nft.symbol,
          metadata: nft.metadata,
          tokenUri: nft.tokenUri,
          lastMetadataSync: nft.lastMetadataSync,
          lastTokenUriSync: nft.lastTokenUriSync,
        })) || []
      );
    } catch (error) {
      console.error("Error fetching wallet NFTs:", error);
      return [];
    }
  }

  static async analyzeToken(
    address: string,
    chain: string = "eth"
  ): Promise<TokenAnalysis> {
    await ensureInitialized();

    try {
      const priceData = await this.getTokenPrice(address, chain);

      // Simple sentiment analysis based on price change
      const sentiment: "bullish" | "bearish" | "neutral" =
        (priceData.priceChange24h || 0) > 5
          ? "bullish"
          : (priceData.priceChange24h || 0) < -5
          ? "bearish"
          : "neutral";

      // Simple risk score calculation
      const riskScore = Math.min(
        100,
        Math.max(0, 50 + (priceData.priceChange24h || 0) * 2)
      );

      // Simple recommendation logic
      const recommendation: "buy" | "sell" | "hold" =
        sentiment === "bullish" && riskScore < 70
          ? "buy"
          : sentiment === "bearish" && riskScore > 80
          ? "sell"
          : "hold";

      return {
        symbol: "TOKEN",
        address,
        chain,
        price: priceData.tokenPrice || 0,
        marketCap: priceData.marketCap || 0,
        volume24h: priceData.volume24h || 0,
        priceChange24h: priceData.priceChange24h || 0,
        sentiment,
        riskScore,
        recommendation,
      };
    } catch (error) {
      console.error("Error analyzing token:", error);
      throw new Error("Failed to analyze token");
    }
  }

  // Mock DeFi data (would integrate with specific DeFi protocols in production)
  static async getDeFiOpportunities(
    chain: string = "eth"
  ): Promise<YieldOpportunity[]> {
    return [
      {
        protocol: "Uniswap V3",
        pair: "ETH/USDC",
        apy: 12.5,
        tvl: 250000000,
        risk: "medium",
        chain: "Ethereum",
      },
      {
        protocol: "Aave",
        pair: "USDC Lending",
        apy: 8.2,
        tvl: 1200000000,
        risk: "low",
        chain: "Ethereum",
      },
      {
        protocol: "Compound",
        pair: "ETH Lending",
        apy: 6.8,
        tvl: 800000000,
        risk: "low",
        chain: "Ethereum",
      },
    ];
  }

  static async getNetworkStats(chain: string = "eth"): Promise<any> {
    await ensureInitialized();

    try {
      return {
        blockHeight: 0,
        avgBlockTime: 0,
        networkHashrate: 0,
        difficulty: 0,
        gasPrice: 0,
      };
    } catch (error) {
      console.error("Error fetching network stats:", error);
      throw new Error("Failed to fetch network statistics");
    }
  }
}
