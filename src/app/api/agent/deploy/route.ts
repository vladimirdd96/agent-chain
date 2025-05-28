import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Connection, PublicKey } from "@solana/web3.js";
import { Metaplex } from "@metaplex-foundation/js";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

// Initialize Solana connection
const connection = new Connection(
  process.env.NEXT_PUBLIC_SOLANA_RPC_URL ||
    "https://api.mainnet-beta.solana.com"
);
const metaplex = new Metaplex(connection);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, type, parameters, walletAddress } = body;

    if (!walletAddress) {
      return NextResponse.json(
        { error: "Wallet address is required" },
        { status: 400 }
      );
    }

    // Validate required fields
    if (!name || !description || !type) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create agent record in Supabase
    const { data: agent, error: dbError } = await supabase
      .from("agents")
      .insert([
        {
          name,
          description,
          agent_type: type,
          chain: type === "solana" ? "Solana" : "EVM",
          creator_wallet_address: walletAddress,
          is_public: true,
          is_nft: false,
        },
      ])
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      return NextResponse.json(
        { error: "Failed to create agent" },
        { status: 500 }
      );
    }

    // Mint NFT for the agent
    try {
      const { nft } = await metaplex.nfts().create({
        uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/metadata/${agent.id}`,
        name: agent.name,
        sellerFeeBasisPoints: 500, // 5% royalty
        tokenOwner: new PublicKey(walletAddress),
      });

      // Update agent with NFT mint address
      const { error: updateError } = await supabase
        .from("agents")
        .update({
          nft_mint_address: nft.address.toString(),
          is_nft: true,
        })
        .eq("id", agent.id);

      if (updateError) {
        console.error("Failed to update agent with NFT address:", updateError);
      }

      return NextResponse.json({
        agent: {
          ...agent,
          nft_mint_address: nft.address.toString(),
          is_nft: true,
        },
      });
    } catch (nftError) {
      console.error("NFT minting error:", nftError);

      // Agent remains with is_nft: false if minting fails
      return NextResponse.json(
        { error: "Failed to mint agent NFT" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error in POST /agent/deploy:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
