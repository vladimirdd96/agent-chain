import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const searchParams = request.nextUrl.searchParams;
    const userWallet = searchParams.get("user_wallet"); // Optional: only show user's minted agents

    // Fetch prebuilt agents
    const { data: prebuiltAgents, error: prebuiltError } = await supabase
      .from("prebuilt_agents")
      .select("*");

    if (prebuiltError) {
      console.error("Error fetching prebuilt agents:", prebuiltError);
      return NextResponse.json(
        { error: "Failed to fetch prebuilt agents" },
        { status: 500 }
      );
    }

    // Get list of agent IDs that have been deployed to the store
    // to avoid showing duplicates
    const deployedAgentIds = (prebuiltAgents || [])
      .filter((agent: any) => agent.original_agent_id)
      .map((agent: any) => agent.original_agent_id);

    // Fetch user-minted agents (only public ones or user's own agents)
    let mintedAgents = [];

    if (userWallet) {
      // For authenticated users: get all their agents (public + private) and public agents from others
      let publicAgentsQuery = supabase
        .from("agents")
        .select("*")
        .eq("is_nft", true)
        .eq("is_public", true);

      // Only add the exclusion filter if there are deployed agents
      if (deployedAgentIds.length > 0) {
        publicAgentsQuery = publicAgentsQuery.not(
          "id",
          "in",
          `(${deployedAgentIds.join(",")})`
        );
      }

      const { data: allPublicAgents, error: publicError } =
        await publicAgentsQuery;

      let privateAgentsQuery = supabase
        .from("agents")
        .select("*")
        .eq("is_nft", true)
        .eq("is_public", false)
        .eq("creator_wallet_address", userWallet);

      // Only add the exclusion filter if there are deployed agents
      if (deployedAgentIds.length > 0) {
        privateAgentsQuery = privateAgentsQuery.not(
          "id",
          "in",
          `(${deployedAgentIds.join(",")})`
        );
      }

      const { data: userPrivateAgents, error: privateError } =
        await privateAgentsQuery;

      if (publicError) {
        console.error("Error fetching public agents:", publicError);
        return NextResponse.json(
          { error: "Failed to fetch public agents" },
          { status: 500 }
        );
      }

      if (privateError) {
        console.error("Error fetching private agents:", privateError);
        return NextResponse.json(
          { error: "Failed to fetch private agents" },
          { status: 500 }
        );
      }

      // Combine all public agents + user's private agents
      mintedAgents = [...(allPublicAgents || []), ...(userPrivateAgents || [])];
    } else {
      // For anonymous users: only public agents that haven't been deployed to store
      let publicAgentsQuery = supabase
        .from("agents")
        .select("*")
        .eq("is_nft", true)
        .eq("is_public", true);

      // Only add the exclusion filter if there are deployed agents
      if (deployedAgentIds.length > 0) {
        publicAgentsQuery = publicAgentsQuery.not(
          "id",
          "in",
          `(${deployedAgentIds.join(",")})`
        );
      }

      const { data: publicAgents, error: publicError } =
        await publicAgentsQuery;

      if (publicError) {
        console.error("Error fetching public minted agents:", publicError);
        return NextResponse.json(
          { error: "Failed to fetch public minted agents" },
          { status: 500 }
        );
      }

      mintedAgents = publicAgents || [];
    }

    // Transform prebuilt agents to match the expected format
    const transformedPrebuiltAgents = (prebuiltAgents || []).map(
      (agent: any) => ({
        id: agent.id,
        name: agent.name,
        description: agent.description,
        chainCompatibility: agent.chain_compatibility || [],
        features: agent.features || [],
        visualRepresentation: agent.visual_representation || "",
        avatar: agent.avatar || "",
        category: agent.category,
        isMinted:
          userWallet && agent.is_minted && agent.owner_wallet === userWallet,
        isMintedByOthers:
          agent.is_minted && (!userWallet || agent.owner_wallet !== userWallet),
        ownerWallet: agent.owner_wallet,
        mintDate: agent.mint_date,
        price: agent.price || 0,
        type: "prebuilt" as const,
        originalAgentId: agent.original_agent_id,
        isDeployedPersonal: Boolean(agent.original_agent_id),
        creatorWallet: agent.creator_wallet,
        isOwned:
          userWallet &&
          ((agent.is_minted && agent.owner_wallet === userWallet) ||
            (agent.original_agent_id && agent.creator_wallet === userWallet)),
      })
    );

    // Transform minted agents to match the expected format
    const transformedMintedAgents = (mintedAgents || []).map((agent: any) => ({
      id: agent.id,
      name: agent.name,
      description: agent.description || "",
      chainCompatibility: agent.chain ? [agent.chain] : [],
      features: ["AI Agent", "NFT Minted"],
      visualRepresentation: agent.image_url || "",
      avatar: agent.image_url || "",
      category: agent.agent_type || "Generalist",
      isMinted: userWallet === agent.creator_wallet_address,
      ownerWallet: agent.creator_wallet_address,
      mintDate: agent.created_at,
      price: 0, // User minted agents are free to the owner
      type: "minted" as const,
      nftMintAddress: agent.nft_mint_address,
      isOwned: userWallet === agent.creator_wallet_address, // User always owns their own minted agents
    }));

    // Combine both types
    const allAgents = [
      ...transformedPrebuiltAgents,
      ...transformedMintedAgents,
    ];

    return NextResponse.json({
      success: true,
      data: allAgents,
      prebuiltCount: transformedPrebuiltAgents.length,
      mintedCount: transformedMintedAgents.length,
    });
  } catch (error) {
    console.error("Error in agent store API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
