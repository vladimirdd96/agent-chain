import { NextResponse } from "next/server";
import Moralis from "moralis";

// Initialize Moralis
const initMoralis = async () => {
  if (!process.env.NEXT_PUBLIC_MORALIS_API_KEY) {
    throw new Error("Moralis API key not configured");
  }

  if (!Moralis.Core.isStarted) {
    await Moralis.start({
      apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY,
    });
  }
};

interface RouteParams {
  params: {
    address: string;
  };
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    await initMoralis();

    const { address } = params;
    const { searchParams } = new URL(request.url);
    const chain = searchParams.get("chain") || "solana";

    let analytics: any = {
      address,
      chain,
      balance: null,
      tokens: [],
      nfts: [],
      recentTransactions: [],
    };

    if (chain === "solana") {
      // Fetch Solana wallet data
      const [balance, tokens, nfts] = await Promise.all([
        Moralis.SolApi.account.getBalance({
          address,
          network: "mainnet",
        }),
        Moralis.SolApi.account.getSPL({
          address,
          network: "mainnet",
        }),
        Moralis.SolApi.account.getNFTs({
          address,
          network: "mainnet",
        }),
      ]);

      analytics = {
        ...analytics,
        balance: balance.toJSON(),
        tokens: tokens.toJSON(),
        nfts: nfts.toJSON(),
      };
    } else {
      // Fetch EVM wallet data
      const [balance, tokens, nfts, transactions] = await Promise.all([
        Moralis.EvmApi.balance.getNativeBalance({
          address,
          chain: chain as any,
        }),
        Moralis.EvmApi.token.getWalletTokenBalances({
          address,
          chain: chain as any,
        }),
        Moralis.EvmApi.nft.getWalletNFTs({
          address,
          chain: chain as any,
        }),
        Moralis.EvmApi.transaction.getWalletTransactions({
          address,
          chain: chain as any,
        }),
      ]);

      analytics = {
        ...analytics,
        balance: balance.toJSON(),
        tokens: tokens.toJSON(),
        nfts: nfts.toJSON(),
        recentTransactions: transactions.toJSON(),
      };
    }

    // Add some derived analytics
    analytics.totalTokenValue = analytics.tokens.reduce(
      (sum: number, token: any) => sum + (token.value || 0),
      0
    );
    analytics.uniqueNFTCollections = new Set(
      analytics.nfts.map((nft: any) => nft.collection?.name)
    ).size;
    analytics.transactionCount = analytics.recentTransactions?.length || 0;

    // Cache the response for 1 minute
    return NextResponse.json(
      { analytics },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
        },
      }
    );
  } catch (error) {
    console.error("Error in GET /wallet/[address]/analytics:", error);

    // Check if it's a Moralis configuration error
    if (
      error instanceof Error &&
      error.message.includes("Moralis API key not configured")
    ) {
      return NextResponse.json(
        { error: "Wallet analytics unavailable - API configuration needed" },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: "Failed to fetch wallet analytics" },
      { status: 500 }
    );
  }
}
