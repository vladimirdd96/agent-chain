import { supabase } from "@/services/supabase/client";
import { PrebuiltAgent, AgentInteraction } from "@/types/agent";
import { BlockchainDataService } from "@/services/moralis/blockchain-data";

export class PrebuiltAgentsService {
  static async getAllAgents(): Promise<PrebuiltAgent[]> {
    try {
      const { data: agents, error } = await supabase.from("prebuilt_agents")
        .select(`
          *,
          capabilities:agent_capabilities(*),
          interactions:agent_interactions(*)
        `);

      if (error) {
        console.error("Error fetching prebuilt agents:", error);
        throw new Error("Failed to fetch prebuilt agents");
      }

      return agents.map((agent) => ({
        id: agent.id,
        name: agent.name,
        description: agent.description,
        chainCompatibility: agent.chain_compatibility,
        features: agent.features,
        visualRepresentation: agent.visual_representation,
        avatar: agent.avatar,
        category: agent.category,
        isMinted: agent.is_minted,
        owner: agent.owner_wallet,
        mintDate: agent.mint_date ? new Date(agent.mint_date) : undefined,
        price: parseFloat(agent.price),
        interactionHistory: agent.interactions.map((interaction: any) => ({
          id: interaction.id,
          agentId: interaction.agent_id,
          userId: interaction.user_wallet,
          interactionType: interaction.interaction_type,
          timestamp: new Date(interaction.created_at),
          data: interaction.interaction_data,
        })),
        capabilities: agent.capabilities.map((cap: any) => ({
          id: cap.id,
          name: cap.name,
          description: cap.description,
          requiresMinting: cap.requires_minting,
          moralisEndpoints: cap.moralis_endpoints,
        })),
      }));
    } catch (error) {
      console.error("Error in getAllAgents:", error);
      throw error;
    }
  }

  static async getAgentById(id: string): Promise<PrebuiltAgent | null> {
    try {
      const { data: agent, error } = await supabase
        .from("prebuilt_agents")
        .select(
          `
          *,
          capabilities:agent_capabilities(*),
          interactions:agent_interactions(*)
        `
        )
        .eq("id", id)
        .single();

      if (error) {
        if (error.code === "PGRST116") {
          return null; // Agent not found
        }
        console.error("Error fetching agent:", error);
        throw new Error("Failed to fetch agent");
      }

      return {
        id: agent.id,
        name: agent.name,
        description: agent.description,
        chainCompatibility: agent.chain_compatibility,
        features: agent.features,
        visualRepresentation: agent.visual_representation,
        avatar: agent.avatar,
        category: agent.category,
        isMinted: agent.is_minted,
        owner: agent.owner_wallet,
        mintDate: agent.mint_date ? new Date(agent.mint_date) : undefined,
        price: parseFloat(agent.price),
        interactionHistory: agent.interactions.map((interaction: any) => ({
          id: interaction.id,
          agentId: interaction.agent_id,
          userId: interaction.user_wallet,
          interactionType: interaction.interaction_type,
          timestamp: new Date(interaction.created_at),
          data: interaction.interaction_data,
        })),
        capabilities: agent.capabilities.map((cap: any) => ({
          id: cap.id,
          name: cap.name,
          description: cap.description,
          requiresMinting: cap.requires_minting,
          moralisEndpoints: cap.moralis_endpoints,
        })),
      };
    } catch (error) {
      console.error("Error in getAgentById:", error);
      throw error;
    }
  }

  static async getAgentsByCategory(category: string): Promise<PrebuiltAgent[]> {
    try {
      const { data: agents, error } = await supabase
        .from("prebuilt_agents")
        .select(
          `
          *,
          capabilities:agent_capabilities(*),
          interactions:agent_interactions(*)
        `
        )
        .eq("category", category);

      if (error) {
        console.error("Error fetching agents by category:", error);
        throw new Error("Failed to fetch agents by category");
      }

      return agents.map((agent) => ({
        id: agent.id,
        name: agent.name,
        description: agent.description,
        chainCompatibility: agent.chain_compatibility,
        features: agent.features,
        visualRepresentation: agent.visual_representation,
        avatar: agent.avatar,
        category: agent.category,
        isMinted: agent.is_minted,
        owner: agent.owner_wallet,
        mintDate: agent.mint_date ? new Date(agent.mint_date) : undefined,
        price: parseFloat(agent.price),
        interactionHistory: agent.interactions.map((interaction: any) => ({
          id: interaction.id,
          agentId: interaction.agent_id,
          userId: interaction.user_wallet,
          interactionType: interaction.interaction_type,
          timestamp: new Date(interaction.created_at),
          data: interaction.interaction_data,
        })),
        capabilities: agent.capabilities.map((cap: any) => ({
          id: cap.id,
          name: cap.name,
          description: cap.description,
          requiresMinting: cap.requires_minting,
          moralisEndpoints: cap.moralis_endpoints,
        })),
      }));
    } catch (error) {
      console.error("Error in getAgentsByCategory:", error);
      throw error;
    }
  }

  static async mintAgent(agentId: string, ownerWallet: string): Promise<void> {
    try {
      const { error } = await supabase
        .from("prebuilt_agents")
        .update({
          is_minted: true,
          owner_wallet: ownerWallet,
          mint_date: new Date().toISOString(),
        })
        .eq("id", agentId);

      if (error) {
        console.error("Error minting agent:", error);
        throw new Error("Failed to mint agent");
      }

      // Track the mint interaction
      await this.trackInteraction(agentId, ownerWallet, "mint");
    } catch (error) {
      console.error("Error in mintAgent:", error);
      throw error;
    }
  }

  static async trackInteraction(
    agentId: string,
    userWallet: string,
    interactionType: "view" | "mint" | "use_feature",
    data?: any
  ): Promise<void> {
    try {
      const { error } = await supabase.from("agent_interactions").insert({
        agent_id: agentId,
        user_wallet: userWallet,
        interaction_type: interactionType,
        interaction_data: data,
      });

      if (error) {
        console.error("Error tracking interaction:", error);
        // Don't throw error for tracking failures
      }
    } catch (error) {
      console.error("Error in trackInteraction:", error);
      // Don't throw error for tracking failures
    }
  }

  static async getAgentLiveData(
    agentId: string,
    capability: string,
    params: any = {}
  ) {
    try {
      const agent = await this.getAgentById(agentId);
      if (!agent) {
        throw new Error("Agent not found");
      }

      const cap = agent.capabilities.find((c) => c.id === capability);
      if (!cap) {
        throw new Error("Capability not found");
      }

      // Check if user has access to this capability
      if (cap.requiresMinting && !agent.isMinted) {
        throw new Error("This capability requires minting the agent");
      }

      // Route to appropriate blockchain data service based on capability
      switch (capability) {
        case "price-tracking":
          return await BlockchainDataService.getTokenPrice(
            params.address,
            params.chain
          );

        case "whale-tracking":
          return await BlockchainDataService.getWalletTransactions(
            params.address,
            params.chain,
            20
          );

        case "portfolio-tracking":
          return await BlockchainDataService.getWalletPortfolio(
            params.address,
            params.chain
          );

        case "rarity-analysis":
          return await BlockchainDataService.getNFTsByWallet(
            params.address,
            params.chain
          );

        case "collection-tracking":
          return await BlockchainDataService.getNFTCollectionStats(
            params.address,
            params.chain
          );

        case "technical-analysis":
          return await BlockchainDataService.analyzeToken(
            params.address,
            params.chain
          );

        case "yield-scanning":
          return await BlockchainDataService.getDeFiOpportunities(params.chain);

        case "onchain-analysis":
          return await BlockchainDataService.getNetworkStats(params.chain);

        default:
          throw new Error("Capability not implemented");
      }
    } catch (error) {
      console.error("Error getting agent live data:", error);
      throw error;
    }
  }
}
