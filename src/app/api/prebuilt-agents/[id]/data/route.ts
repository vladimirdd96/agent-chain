import { NextRequest, NextResponse } from "next/server";
import { PrebuiltAgentsService } from "@/services/prebuiltAgents";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { capability, walletAddress, ...requestParams } = body;

    if (!capability) {
      return NextResponse.json(
        { success: false, error: "Capability is required" },
        { status: 400 }
      );
    }

    // Track the interaction
    if (walletAddress) {
      await PrebuiltAgentsService.trackInteraction(
        params.id,
        walletAddress,
        "use_feature",
        { capability, params: requestParams }
      );
    }

    const data = await PrebuiltAgentsService.getAgentLiveData(
      params.id,
      capability,
      requestParams,
      walletAddress
    );

    return NextResponse.json({
      success: true,
      data,
      capability,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error in POST /api/prebuilt-agents/[id]/data:", error);

    // Return different errors based on the error message
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    if (errorMessage.includes("requires minting")) {
      return NextResponse.json(
        { success: false, error: errorMessage },
        { status: 403 }
      );
    }

    if (errorMessage.includes("not found")) {
      return NextResponse.json(
        { success: false, error: errorMessage },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Failed to fetch agent data" },
      { status: 500 }
    );
  }
}
