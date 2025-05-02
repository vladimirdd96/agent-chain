"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAgents } from "@/hooks/useAgents";
import { AgentCard } from "@/components/agents/AgentCard";
import { AgentType } from "@/lib/agentchain-sdk/types";

export default function StorePage() {
  const { loading, error, listAgents } = useAgents();
  const [agents, setAgents] = useState<AgentType[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    loadAgents();
  }, [page]);

  const loadAgents = async () => {
    const response = await listAgents({
      page,
      limit: 12,
      sort: "created_at",
      order: "desc",
    });

    if (response) {
      setAgents(response.agents);
      setTotalPages(response.pagination.totalPages);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Agent Store
          </h1>
          <div className="flex items-center gap-4">
            {/* Add filter/sort controls here */}
          </div>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-8">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-black/50 backdrop-blur-md border border-white/10 rounded-xl p-6 h-48 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {agents.map((agent) => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 text-sm font-medium text-white bg-white/5 rounded-lg disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="text-white/70">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 text-sm font-medium text-white bg-white/5 rounded-lg disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </motion.div>
    </div>
  );
}
