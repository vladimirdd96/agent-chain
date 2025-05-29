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

    const { messages, isPremium, agentType } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    // Use the messages array as-is since the system message is already included
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini-2024-07-18",
      messages: messages,
      max_tokens: isPremium ? 1000 : 300, // Premium users get longer responses
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
      isPremium,
      agentType,
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
