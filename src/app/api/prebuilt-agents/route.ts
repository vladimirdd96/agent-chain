import { NextRequest, NextResponse } from "next/server";
import { PrebuiltAgentsService } from "@/services/prebuiltAgents";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const chain = searchParams.get("chain");

    let agents;

    if (category) {
      agents = await PrebuiltAgentsService.getAgentsByCategory(category);
    } else {
      agents = await PrebuiltAgentsService.getAllAgents();
    }

    // Filter by chain if specified
    if (chain) {
      agents = agents.filter((agent) =>
        agent.chainCompatibility.includes(chain)
      );
    }

    return NextResponse.json({
      success: true,
      data: agents,
      count: agents.length,
    });
  } catch (error) {
    console.error("Error in GET /api/prebuilt-agents:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch prebuilt agents",
      },
      { status: 500 }
    );
  }
}
