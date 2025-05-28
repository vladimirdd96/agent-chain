import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const chain = searchParams.get("chain");
    const creator_wallet = searchParams.get("creator_wallet");
    const sort = searchParams.get("sort") || "created_at";
    const order = searchParams.get("order") || "desc";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const offset = (page - 1) * limit;

    let query = supabase.from("agents").select("*", { count: "exact" });

    // Apply creator wallet filter if provided (for user's own agents)
    if (creator_wallet) {
      query = query.eq("creator_wallet_address", creator_wallet);
    }

    // Apply agent type filter if provided
    if (type) {
      query = query.eq("agent_type", type);
    }

    // Apply chain filter if provided
    if (chain) {
      query = query.eq("chain", chain);
    }

    // Apply sorting
    query = query.order(sort, { ascending: order === "asc" });

    // Apply pagination
    query = query.range(offset, offset + limit - 1);

    const { data: agents, error, count } = await query;

    if (error) {
      console.error("Error fetching agents:", error);
      return NextResponse.json(
        { error: "Failed to fetch agents" },
        { status: 500 }
      );
    }

    // Transform the data to match the expected AgentType interface
    const transformedAgents =
      agents?.map((agent) => ({
        id: agent.id,
        name: agent.name,
        description: agent.description || "",
        type: agent.agent_type || "blockchain", // Map agent_type to type
        parameters: {}, // Default empty parameters
        creator_wallet: agent.creator_wallet_address || "",
        is_public: agent.is_public || false,
        status: agent.is_nft ? "active" : "pending", // Map based on NFT status
        nft_mint_address: agent.nft_mint_address || undefined,
        created_at: agent.created_at,
        updated_at: agent.updated_at,
        // Additional fields for UI
        chain: agent.chain,
        image_url: agent.image_url,
      })) || [];

    return NextResponse.json({
      agents: transformedAgents,
      pagination: {
        total: count,
        page,
        limit,
        totalPages: Math.ceil((count || 0) / limit),
      },
    });
  } catch (error) {
    console.error("Error in GET /agents:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
