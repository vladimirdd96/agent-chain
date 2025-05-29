import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client with service key for admin operations
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { agentId, walletAddress, price = 0.1 } = body;

    if (!agentId || !walletAddress) {
      return NextResponse.json(
        { error: "Agent ID and wallet address are required" },
        { status: 400 }
      );
    }

    // First, get the agent details
    const { data: agent, error: agentError } = await supabase
      .from("agents")
      .select("*")
      .eq("id", agentId)
      .eq("creator_wallet_address", walletAddress)
      .single();

    if (agentError || !agent) {
      return NextResponse.json(
        { error: "Agent not found or you don't have permission to deploy it" },
        { status: 404 }
      );
    }

    // Check if the agent is already deployed to the store
    const { data: existingStoreAgent, error: checkError } = await supabase
      .from("prebuilt_agents")
      .select("id")
      .eq("original_agent_id", agentId)
      .single();

    if (existingStoreAgent) {
      return NextResponse.json(
        { error: "This agent is already deployed to the store" },
        { status: 400 }
      );
    }

    // Create a prebuilt agent entry based on the personal agent
    const storeAgentId = `${agent.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`;

    const { data: storeAgent, error: storeError } = await supabase
      .from("prebuilt_agents")
      .insert([
        {
          id: storeAgentId,
          name: agent.name,
          description: agent.description,
          chain_compatibility: [agent.chain],
          features: [
            "AI-powered conversation",
            "Custom personality and behavior",
            "Blockchain integration",
            "Real-time responses",
          ],
          visual_representation: "🤖",
          avatar: agent.image_url || "/images/agents/default-agent.svg",
          category: "Custom",
          price: price,
          is_minted: false,
          owner_wallet: null,
          mint_date: null,
          original_agent_id: agentId, // Reference to the original agent
          creator_wallet: walletAddress,
        },
      ])
      .select()
      .single();

    if (storeError) {
      console.error("Store deployment error:", storeError);
      console.error("Full error details:", JSON.stringify(storeError, null, 2));
      console.error("Insert data was:", {
        name: agent.name,
        description: agent.description,
        chain_compatibility: [agent.chain],
        category: "Custom",
        price: price,
        original_agent_id: agentId,
        creator_wallet: walletAddress,
      });
      return NextResponse.json(
        {
          error: "Failed to deploy agent to store",
          details: storeError.message,
          code: storeError.code,
        },
        { status: 500 }
      );
    }

    // Update the original agent to mark it as deployed
    const { error: updateError } = await supabase
      .from("agents")
      .update({
        is_public: true,
        updated_at: new Date().toISOString(),
      })
      .eq("id", agentId);

    if (updateError) {
      console.error("Update error:", updateError);
      // Don't fail the request if we can't update the original agent
    }

    return NextResponse.json({
      success: true,
      storeAgent,
      message: "Agent successfully deployed to the store!",
    });
  } catch (error) {
    console.error("Error in POST /agent/deploy-to-store:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
