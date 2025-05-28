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
    const wallet = searchParams.get("wallet");

    // Get all agents to debug
    let query = supabase.from("agents").select("*");

    if (wallet) {
      query = query.eq("creator_wallet_address", wallet);
    }

    const { data: agents, error } = await query;

    if (error) {
      console.error("Debug: Error fetching agents:", error);
      return NextResponse.json(
        { error: "Failed to fetch agents", details: error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Debug agents data",
      wallet_filter: wallet,
      total_agents: agents?.length || 0,
      agents: agents || [],
    });
  } catch (error) {
    console.error("Debug: Error in GET /debug-agents:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error },
      { status: 500 }
    );
  }
}
