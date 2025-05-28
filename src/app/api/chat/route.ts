import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API key not configured" },
        { status: 500 }
      );
    }

    const { messages, agentContext } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    // Create system message with agent context
    const systemMessage = {
      role: "system" as const,
      content: `You are ${agentContext.name}, an AI assistant specializing in ${
        agentContext.category
      }. 

Your description: ${agentContext.description}

Your capabilities include:
${
  agentContext.capabilities
    ?.map((cap: any) => `- ${cap.name}: ${cap.description}`)
    .join("\n") || "General AI assistance"
}

Please respond as this agent, staying in character and focusing on your specialization. Be helpful, knowledgeable, and engaging. Keep responses concise but informative. If asked about capabilities you don't have or topics outside your specialization, politely redirect the conversation back to your area of expertise.`,
    };

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [systemMessage, ...messages],
      max_tokens: 500,
      temperature: 0.7,
      presence_penalty: 0.1,
      frequency_penalty: 0.1,
    });

    const assistantMessage = completion.choices[0]?.message?.content;

    if (!assistantMessage) {
      return NextResponse.json(
        { error: "No response generated" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: assistantMessage,
      usage: completion.usage,
    });
  } catch (error) {
    console.error("Chat API error:", error);

    if (error instanceof OpenAI.APIError) {
      return NextResponse.json(
        { error: `OpenAI API error: ${error.message}` },
        { status: error.status || 500 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
