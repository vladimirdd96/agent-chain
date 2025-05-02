export type Database = {
  public: {
    Tables: {
      agents: {
        Row: {
          id: string;
          name: string;
          description: string;
          type: string;
          parameters: Record<string, any>;
          creator_wallet: string;
          is_public: boolean;
          status: string;
          nft_mint_address?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["agents"]["Row"],
          "id" | "created_at" | "updated_at"
        >;
        Update: Partial<Database["public"]["Tables"]["agents"]["Insert"]>;
      };
      agent_stats: {
        Row: {
          id: string;
          agent_id: string;
          deployments: number;
          success_rate: number;
          avg_return: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          agent_id: string;
          deployments?: number;
          success_rate?: number;
          avg_return?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          agent_id?: string;
          deployments?: number;
          success_rate?: number;
          avg_return?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      wallets: {
        Row: {
          address: string;
          display_name: string | null;
          created_at: string;
        };
        Insert: {
          address: string;
          display_name?: string | null;
          created_at?: string;
        };
        Update: {
          address?: string;
          display_name?: string | null;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
};
