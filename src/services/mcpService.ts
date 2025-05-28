import { supabase } from "@/lib/supabaseClient";
import {
  MCPService,
  CreateMCPServiceRequest,
  MCPServiceFilter,
  MCPServiceStats,
} from "@/types/mcp";

export class MCPServiceAPI {
  static async getAllServices(
    filters?: MCPServiceFilter
  ): Promise<MCPService[]> {
    try {
      let query = supabase
        .from("mcp_services")
        .select("*")
        .eq("is_public", true)
        .order("created_at", { ascending: false });

      // Apply filters
      if (filters) {
        if (filters.search) {
          query = query.or(
            `name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`
          );
        }

        if (filters.categories.length > 0) {
          query = query.in("category", filters.categories);
        }

        if (filters.showVerifiedOnly) {
          query = query.eq("is_verified", true);
        }

        if (filters.showFreeOnly) {
          query = query.eq("price", 0);
        }

        if (filters.priceRange) {
          query = query
            .gte("price", filters.priceRange.min)
            .lte("price", filters.priceRange.max);
        }
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching MCP services:", error);
        throw error;
      }

      return this.transformServices(data || []);
    } catch (error) {
      console.error("Error in getAllServices:", error);
      throw error;
    }
  }

  static async getServiceById(id: string): Promise<MCPService | null> {
    try {
      const { data, error } = await supabase
        .from("mcp_services")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        if (error.code === "PGRST116") {
          return null; // Service not found
        }
        console.error("Error fetching MCP service:", error);
        throw error;
      }

      return this.transformService(data);
    } catch (error) {
      console.error("Error in getServiceById:", error);
      throw error;
    }
  }

  static async createService(
    serviceData: CreateMCPServiceRequest,
    ownerWallet: string
  ): Promise<MCPService> {
    try {
      const id = `${serviceData.name
        .toLowerCase()
        .replace(/\s+/g, "-")}-${Date.now()}`;

      const serviceRecord = {
        id,
        name: serviceData.name,
        description: serviceData.description,
        full_description: serviceData.fullDescription,
        icon: serviceData.icon,
        category: serviceData.category,
        supported_chains: serviceData.supportedChains,
        features: serviceData.features,
        integration_modes: serviceData.integrationModes,
        owner_name: "Developer", // This should come from user profile
        owner_wallet: ownerWallet,
        endpoint: serviceData.endpoint,
        api_documentation: serviceData.apiDocumentation,
        is_public: serviceData.isPublic,
        price: serviceData.price,
        is_premium: serviceData.isPremium,
      };

      const { data, error } = await supabase
        .from("mcp_services")
        .insert(serviceRecord)
        .select()
        .single();

      if (error) {
        console.error("Error creating MCP service:", error);
        throw error;
      }

      return this.transformService(data);
    } catch (error) {
      console.error("Error in createService:", error);
      throw error;
    }
  }

  static async updateService(
    id: string,
    updates: Partial<CreateMCPServiceRequest>
  ): Promise<MCPService> {
    try {
      const { data, error } = await supabase
        .from("mcp_services")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        console.error("Error updating MCP service:", error);
        throw error;
      }

      return this.transformService(data);
    } catch (error) {
      console.error("Error in updateService:", error);
      throw error;
    }
  }

  static async deleteService(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from("mcp_services")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Error deleting MCP service:", error);
        throw error;
      }
    } catch (error) {
      console.error("Error in deleteService:", error);
      throw error;
    }
  }

  static async integrateService(
    serviceId: string,
    userWallet: string,
    agentId?: string
  ): Promise<void> {
    try {
      const integrationData = {
        service_id: serviceId,
        user_wallet: userWallet,
        agent_id: agentId,
        integration_type: "integration",
        integration_data: {
          timestamp: new Date().toISOString(),
          agent_id: agentId,
        },
      };

      const { error } = await supabase
        .from("mcp_service_integrations")
        .insert(integrationData);

      if (error) {
        console.error("Error creating integration:", error);
        throw error;
      }

      // Update usage stats
      await this.incrementUsageStats(serviceId);
    } catch (error) {
      console.error("Error in integrateService:", error);
      throw error;
    }
  }

  static async getServiceStats(): Promise<MCPServiceStats> {
    try {
      const { data, error } = await supabase
        .from("mcp_services")
        .select("category")
        .eq("is_public", true);

      if (error) {
        console.error("Error fetching service stats:", error);
        throw error;
      }

      const categories = Array.from(
        new Set(data.map((service) => service.category))
      );

      // Get integration count
      const { count: integrationCount } = await supabase
        .from("mcp_service_integrations")
        .select("*", { count: "exact", head: true });

      return {
        totalServices: data.length,
        totalCategories: categories.length,
        totalIntegrations: integrationCount || 0,
        averageRating: 4.6, // Placeholder - would calculate from reviews
      };
    } catch (error) {
      console.error("Error in getServiceStats:", error);
      return {
        totalServices: 0,
        totalCategories: 0,
        totalIntegrations: 0,
        averageRating: 0,
      };
    }
  }

  private static async incrementUsageStats(serviceId: string): Promise<void> {
    try {
      // This would be better done with a stored procedure, but for now we'll do it client-side
      const { data: service } = await supabase
        .from("mcp_services")
        .select("usage_stats")
        .eq("id", serviceId)
        .single();

      if (service) {
        const stats = service.usage_stats as any;
        const updatedStats = {
          ...stats,
          totalCalls: (stats.totalCalls || 0) + 1,
          activeAgents: Math.max(stats.activeAgents || 0, 1),
        };

        await supabase
          .from("mcp_services")
          .update({ usage_stats: updatedStats })
          .eq("id", serviceId);
      }
    } catch (error) {
      console.error("Error incrementing usage stats:", error);
    }
  }

  private static transformService(data: any): MCPService {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      fullDescription: data.full_description,
      icon: data.icon,
      category: data.category,
      supportedChains: data.supported_chains,
      features: data.features,
      integrationModes: data.integration_modes,
      usageStats: data.usage_stats,
      owner: {
        name: data.owner_name,
        wallet: data.owner_wallet,
        avatar: data.owner_avatar,
      },
      endpoint: data.endpoint,
      apiDocumentation: data.api_documentation,
      isPublic: data.is_public,
      isVerified: data.is_verified,
      price: parseFloat(data.price),
      isPremium: data.is_premium,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  }

  private static transformServices(data: any[]): MCPService[] {
    return data.map(this.transformService);
  }
}

export default MCPServiceAPI;
