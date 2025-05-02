import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id } = params;

    // Fetch agent details from Supabase
    const { data: agent, error } = await supabase
      .from("agents")
      .select(
        `
        *,
        creator:creator_wallet (
          wallet_address,
          display_name
        ),
        stats:agent_stats (
          deployments,
          success_rate,
          avg_return
        )
      `
      )
      .eq("id", id)
      .single();

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json(
        { error: "Failed to fetch agent details" },
        { status: 500 }
      );
    }

    if (!agent) {
      return NextResponse.json({ error: "Agent not found" }, { status: 404 });
    }

    // If the agent has an NFT, fetch its metadata
    if (agent.nft_mint_address) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_APP_URL}/api/metadata/${agent.id}`
        );
        const nftMetadata = await response.json();
        agent.nft_metadata = nftMetadata;
      } catch (nftError) {
        console.error("Failed to fetch NFT metadata:", nftError);
        // Don't fail the request if NFT metadata fetch fails
      }
    }

    return NextResponse.json({ agent });
  } catch (error) {
    console.error("Error in GET /agent/[id]:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
