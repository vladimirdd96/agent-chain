import { NextResponse } from "next/server";
import Moralis from "moralis";

// Initialize Moralis
const initMoralis = async () => {
  if (!Moralis.Core.isStarted) {
    await Moralis.start({
      apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY,
    });
  }
};

export async function GET(request: Request) {
  try {
    await initMoralis();

    const { searchParams } = new URL(request.url);
    const address = searchParams.get("address");
    const chain = searchParams.get("chain") || "solana";

    if (!address) {
      return NextResponse.json(
        { error: "Token address is required" },
        { status: 400 }
      );
    }

    let tokenData;

    if (chain === "solana") {
      // Fetch Solana token data
      const response = await Moralis.SolApi.token.getTokenPrice({
        address,
        network: "mainnet",
      });

      tokenData = {
        ...response.toJSON(),
        chain: "solana",
      };
    } else {
      // Fetch EVM token data
      const response = await Moralis.EvmApi.token.getTokenPrice({
        address,
        chain: chain as any,
      });

      tokenData = {
        ...response.toJSON(),
        chain,
      };
    }

    // Cache the response for 5 minutes
    return NextResponse.json(
      { token: tokenData },
      {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60",
        },
      }
    );
  } catch (error) {
    console.error("Error in GET /token-info:", error);
    return NextResponse.json(
      { error: "Failed to fetch token information" },
      { status: 500 }
    );
  }
}
