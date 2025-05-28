import { NextRequest, NextResponse } from "next/server";
import { PrebuiltAgentsService } from "@/services/prebuiltAgents";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const agent = await PrebuiltAgentsService.getAgentById(params.id);

    if (!agent) {
      return NextResponse.json(
        { success: false, error: "Agent not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: agent,
    });
  } catch (error) {
    console.error("Error in GET /api/prebuilt-agents/[id]:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch agent" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { action, walletAddress, ...data } = body;

    switch (action) {
      case "mint":
        if (!walletAddress) {
          return NextResponse.json(
            { success: false, error: "Wallet address is required for minting" },
            { status: 400 }
          );
        }
        await PrebuiltAgentsService.mintAgent(params.id, walletAddress);
        return NextResponse.json({
          success: true,
          message: "Agent minted successfully",
        });

      case "track_interaction":
        if (!walletAddress || !data.interactionType) {
          return NextResponse.json(
            {
              success: false,
              error: "Wallet address and interaction type are required",
            },
            { status: 400 }
          );
        }
        await PrebuiltAgentsService.trackInteraction(
          params.id,
          walletAddress,
          data.interactionType,
          data.interactionData
        );
        return NextResponse.json({
          success: true,
          message: "Interaction tracked successfully",
        });

      default:
        return NextResponse.json(
          { success: false, error: "Invalid action" },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("Error in POST /api/prebuilt-agents/[id]:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process request" },
      { status: 500 }
    );
  }
}
