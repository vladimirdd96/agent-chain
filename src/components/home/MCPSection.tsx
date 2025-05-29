"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import CodeBlock from "@/components/ui/CodeBlock";

const MCPSection = () => {
  const pythonCode = `import requests

# Your API token
token = "tk_095fa33201c94b108aee"

# Use streaming response
response = requests.post(
    "https://deepcore.top/api/open/agents/{agentId}/dialogue",
    headers={
        "X-API-Token": token
    },
    json={
        "message": "Hello, Agent!",
        "conversation_id": "optional-id",
        "init_flag": False
    },
    stream=True
)

# Process streaming response
for chunk in response.iter_lines():
    if chunk:
        data = chunk.decode('utf-8')
        if data.startswith('data: '):
            content = data[6:]
            print(content)`;

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20" />
      <div className="container mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-black/40 backdrop-blur-md rounded-xl p-8 border border-white/10"
          >
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Model Context Protocol
            </h2>
            <div className="prose prose-invert">
              <p className="text-lg text-white/70 mb-6">
                DeepCore fully integrates the MCP protocol. Any standard MCP
                Server can be converted into a Tool for Agent invocation after
                integration. Agents can also be published as MCP Servers,
                allowing external clients such as Cursor and Claude to invoke
                them.
              </p>
              <p className="text-lg text-white/70 mb-8">
                Additionally, DeepCore builds its own MCP Store to enable the
                registration, discovery, and invocation of all MCP Servers in
                the crypto domain.
              </p>
            </div>
            <Link
              href="/docs/mcp"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 rounded-lg transition-all duration-300"
            >
              Learn More About MCP
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <CodeBlock
              code={pythonCode}
              language="python"
              fileName="mcp_client.py"
              variant="compact"
              theme="dark"
              maxHeight="600px"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MCPSection;
