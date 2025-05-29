"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import CodeBlock from "@/components/ui/CodeBlock";

const ExamplesPage = () => {
  const [selectedTheme, setSelectedTheme] = useState<"dark" | "light">("dark");

  const examples = [
    {
      title: "Smart Contract - Solidity",
      description: "A simple ERC-20 token contract with mint functionality",
      code: `pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MindMintToken is ERC20, Ownable {
    uint256 public constant MAX_SUPPLY = 1_000_000_000 * 10**18;
    
    constructor() ERC20("MindMint", "MINT") {
        _mint(msg.sender, 100_000_000 * 10**18);
    }
    
    function mint(address to, uint256 amount) public onlyOwner {
        require(totalSupply() + amount <= MAX_SUPPLY, "Max supply exceeded");
        _mint(to, amount);
    }
    
    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
    }
}`,
      language: "solidity",
      fileName: "MindMintToken.sol",
    },
    {
      title: "AI Agent Integration - Python",
      description: "Example of integrating with DeepCore AI agents via API",
      code: `import asyncio
import aiohttp
import json
from typing import Dict, Any, AsyncGenerator

class DeepCoreAgent:
    def __init__(self, api_key: str, base_url: str = "https://deepcore.top/api"):
        self.api_key = api_key
        self.base_url = base_url
        self.session = None
    
    async def __aenter__(self):
        self.session = aiohttp.ClientSession(
            headers={"X-API-Token": self.api_key}
        )
        return self
    
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        if self.session:
            await self.session.close()
    
    async def chat_stream(
        self, 
        agent_id: str, 
        message: str, 
        conversation_id: str = None
    ) -> AsyncGenerator[str, None]:
        """Stream chat responses from an AI agent."""
        url = f"{self.base_url}/open/agents/{agent_id}/dialogue"
        
        payload = {
            "message": message,
            "conversation_id": conversation_id,
            "init_flag": conversation_id is None
        }
        
        async with self.session.post(url, json=payload) as response:
            async for line in response.content:
                if line.startswith(b'data: '):
                    data = line[6:].decode('utf-8').strip()
                    if data and data != '[DONE]':
                        try:
                            chunk = json.loads(data)
                            yield chunk.get('content', '')
                        except json.JSONDecodeError:
                            continue

# Usage example
async def main():
    async with DeepCoreAgent("your-api-key") as agent:
        agent_id = "analyst-agent-v1"
        
        print("🤖 Analyst Agent: Starting analysis...")
        
        async for chunk in agent.chat_stream(
            agent_id, 
            "Analyze the current Solana ecosystem and provide insights"
        ):
            print(chunk, end='', flush=True)
        
        print("\\n\\n✅ Analysis complete!")

if __name__ == "__main__":
    asyncio.run(main())`,
      language: "python",
      fileName: "deepcore_client.py",
    },
    {
      title: "React Integration - TypeScript",
      description: "Frontend integration with DeepCore using React hooks",
      code: `import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'agent';
  timestamp: Date;
}

interface UseAgentChatProps {
  agentId: string;
  apiKey: string;
}

export const useAgentChat = ({ agentId, apiKey }: UseAgentChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      content,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch(\`/api/agents/\${agentId}/chat\`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Token': apiKey,
        },
        body: JSON.stringify({
          message: content,
          conversation_id: conversationId,
          init_flag: !conversationId,
        }),
      });

      if (!response.ok) throw new Error('Failed to send message');
      
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let agentResponse = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split('\\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              if (data === '[DONE]') continue;
              
              try {
                const parsed = JSON.parse(data);
                agentResponse += parsed.content || '';
              } catch (e) {
                // Skip invalid JSON
              }
            }
          }
        }
      }

      const agentMessage: Message = {
        id: crypto.randomUUID(),
        content: agentResponse,
        sender: 'agent',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, agentMessage]);
      
      if (!conversationId) {
        setConversationId(crypto.randomUUID());
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  }, [agentId, apiKey, conversationId]);

  const clearChat = useCallback(() => {
    setMessages([]);
    setConversationId(null);
  }, []);

  return {
    messages,
    sendMessage,
    clearChat,
    isLoading,
  };
};`,
      language: "typescript",
      fileName: "useAgentChat.ts",
    },
    {
      title: "Smart Contract Interaction - JavaScript",
      description: "Web3 integration for interacting with deployed contracts",
      code: `import { Connection, PublicKey, Transaction } from '@solana/web3.js';
import { Program, AnchorProvider, web3 } from '@project-serum/anchor';

class MindMintContract {
  constructor(connection, wallet, programId) {
    this.connection = connection;
    this.wallet = wallet;
    this.programId = new PublicKey(programId);
    this.provider = new AnchorProvider(connection, wallet, {});
  }

  async initializeAgent(agentMetadata) {
    try {
      const program = new Program(IDL, this.programId, this.provider);
      
      // Generate new agent account
      const agentAccount = web3.Keypair.generate();
      
      // Create instruction to initialize agent
      const tx = await program.methods
        .initializeAgent(
          agentMetadata.name,
          agentMetadata.description,
          agentMetadata.capabilities
        )
        .accounts({
          agent: agentAccount.publicKey,
          authority: this.wallet.publicKey,
          systemProgram: web3.SystemProgram.programId,
        })
        .signers([agentAccount])
        .rpc();

      console.log('Agent initialized:', tx);
      return {
        signature: tx,
        agentAddress: agentAccount.publicKey.toString(),
      };
    } catch (error) {
      console.error('Failed to initialize agent:', error);
      throw error;
    }
  }

  async mintAgentNFT(agentAddress, recipient) {
    try {
      const program = new Program(IDL, this.programId, this.provider);
      
      const tx = await program.methods
        .mintAgentNft()
        .accounts({
          agent: new PublicKey(agentAddress),
          recipient: new PublicKey(recipient),
          authority: this.wallet.publicKey,
        })
        .rpc();

      return tx;
    } catch (error) {
      console.error('Failed to mint agent NFT:', error);
      throw error;
    }
  }

  async getAgentInfo(agentAddress) {
    try {
      const program = new Program(IDL, this.programId, this.provider);
      const agent = await program.account.agent.fetch(
        new PublicKey(agentAddress)
      );
      
      return {
        name: agent.name,
        description: agent.description,
        owner: agent.authority.toString(),
        capabilities: agent.capabilities,
        totalInteractions: agent.totalInteractions.toNumber(),
        isActive: agent.isActive,
      };
    } catch (error) {
      console.error('Failed to fetch agent info:', error);
      throw error;
    }
  }
}

// Usage
const connection = new Connection('https://api.mainnet-beta.solana.com');
const contract = new MindMintContract(connection, wallet, PROGRAM_ID);

// Initialize new agent
const agentData = await contract.initializeAgent({
  name: "Trading Assistant",
  description: "AI agent specialized in DeFi trading strategies",
  capabilities: ["swap", "analyze", "alert"]
});

console.log('New agent created:', agentData.agentAddress);`,
      language: "javascript",
      fileName: "contract-interaction.js",
    },
    {
      title: "Configuration - JSON",
      description: "Agent configuration and deployment parameters",
      code:
        `{
  "agent": {
    "name": "DeFi Analyst Pro",
    "version": "2.1.0",
    "description": "Advanced DeFi analytics and trading intelligence agent",
    "type": "analyst",
    "capabilities": [
      "price-analysis",
      "liquidity-monitoring", 
      "yield-farming-optimization",
      "risk-assessment",
      "portfolio-tracking"
    ]
  },
  "deployment": {
    "blockchain": "solana",
    "network": "mainnet-beta",
    "rpc_endpoint": "https://api.mainnet-beta.solana.com",
    "program_id": "MNDMint1234567890abcdef",
    "initialization_params": {
      "initial_capital": 1000,
      "risk_tolerance": "medium",
      "max_slippage": 0.5,
      "gas_optimization": true
    }
  },
  "integrations": {
    "dex_protocols": [
      {
        "name": "Jupiter",
        "endpoint": "https://quote-api.jup.ag/v6",
        "features": ["swap", "quote", "route-optimization"]
      },
      {
        "name": "Raydium",
        "endpoint": "https://api.raydium.io/v2",
        "features": ["liquidity-pools", "farms", "staking"]
      }
    ],
    "data_sources": [
      {
        "name": "CoinGecko",
        "api_key": "` +
        "${COINGECKO_API_KEY}" +
        `",
        "rate_limit": 100
      },
      {
        "name": "DeFiLlama",
        "endpoint": "https://api.llama.fi",
        "rate_limit": 300
      }
    ]
  },
  "monitoring": {
    "metrics": {
      "performance_tracking": true,
      "error_logging": true,
      "usage_analytics": true
    },
    "alerts": {
      "price_changes": {
        "threshold": 5,
        "notification_channels": ["discord", "telegram"]
      },
      "liquidity_changes": {
        "threshold": 20,
        "notification_channels": ["email"]
      }
    }
  },
  "security": {
    "wallet_permissions": {
      "max_transaction_amount": 100,
      "allowed_programs": [
        "TokenProgram", 
        "AssociatedTokenProgram",
        "JupiterProgram"
      ]
    },
    "api_security": {
      "rate_limiting": true,
      "ip_whitelist": ["0.0.0.0/0"],
      "require_auth": true
    }
  }
}`,
      language: "json",
      fileName: "agent-config.json",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20" />

      {/* Content */}
      <div className="relative">
        {/* Header */}
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Code Examples
            </h1>
            <p className="text-xl text-white/70 mb-8 max-w-3xl mx-auto">
              Explore comprehensive examples of DeepCore integration, smart
              contract development, and AI agent deployment across different
              programming languages.
            </p>

            {/* Theme Toggle */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="text-white/60">Theme:</span>
              <div className="flex items-center gap-2 p-1 bg-white/10 rounded-lg">
                <button
                  onClick={() => setSelectedTheme("dark")}
                  className={`px-4 py-2 rounded-md transition-all ${
                    selectedTheme === "dark"
                      ? "bg-white/20 text-white"
                      : "text-white/60 hover:text-white/80"
                  }`}
                >
                  Dark
                </button>
                <button
                  onClick={() => setSelectedTheme("light")}
                  className={`px-4 py-2 rounded-md transition-all ${
                    selectedTheme === "light"
                      ? "bg-white/20 text-white"
                      : "text-white/60 hover:text-white/80"
                  }`}
                >
                  Light
                </button>
              </div>
            </div>
          </motion.div>

          {/* Examples */}
          <div className="space-y-16">
            {examples.map((example, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="max-w-6xl mx-auto"
              >
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {example.title}
                  </h2>
                  <p className="text-white/70">{example.description}</p>
                </div>

                <CodeBlock
                  code={example.code}
                  language={example.language}
                  fileName={example.fileName}
                  theme={selectedTheme}
                  variant="default"
                  showLineNumbers={true}
                  maxHeight="600px"
                />
              </motion.div>
            ))}
          </div>

          {/* Variants Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="max-w-6xl mx-auto mt-20"
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Code Block Variants
            </h2>

            <div className="grid gap-8">
              {/* Default Variant */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  Default Variant
                </h3>
                <CodeBlock
                  code={`const greeting = "Hello, DeepCore!";
console.log(greeting);`}
                  language="javascript"
                  fileName="greeting.js"
                  variant="default"
                  theme={selectedTheme}
                />
              </div>

              {/* Compact Variant */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  Compact Variant
                </h3>
                <CodeBlock
                  code={`npm install @deepcore/sdk
import { DeepCore } from '@deepcore/sdk';`}
                  language="bash"
                  variant="compact"
                  theme={selectedTheme}
                />
              </div>

              {/* Minimal Variant */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  Minimal Variant
                </h3>
                <CodeBlock
                  code={`curl -X POST https://deepcore.top/api/agents \\
  -H "X-API-Token: your-token" \\
  -d '{"message": "Hello!"}'`}
                  language="bash"
                  variant="minimal"
                  theme={selectedTheme}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ExamplesPage;
