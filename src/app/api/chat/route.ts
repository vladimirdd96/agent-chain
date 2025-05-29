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

    const { messages, isPremium, agentType, agentContext } =
      await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    // Determine the model and parameters based on agent type and premium status
    let modelConfig: {
      model: string;
      max_tokens: number;
      temperature?: number;
      presence_penalty?: number;
      frequency_penalty?: number;
    } = {
      model: "gpt-4o-mini-2024-07-18",
      max_tokens: isPremium ? 1000 : 300,
      temperature: 0.7,
      presence_penalty: 0.1,
      frequency_penalty: 0.1,
    };

    // Use advanced models for deep research agents when premium
    if (
      agentContext?.name === "Deep Research Agent" ||
      agentType === "Research"
    ) {
      if (isPremium) {
        // Use o1-preview for deep reasoning and research
        modelConfig = {
          model: "o1-preview",
          max_tokens: 4000, // Higher token limit for comprehensive research
          // o1 models don't support temperature, presence_penalty, frequency_penalty
        };
      } else {
        // Enhanced GPT-4 for free version of research agent
        modelConfig = {
          model: "gpt-4o-mini-2024-07-18",
          max_tokens: 500, // Slightly higher for research tasks
          temperature: 0.3, // Lower temperature for more focused research
          presence_penalty: 0.1,
          frequency_penalty: 0.1,
        };
      }
    }

    // Enhanced system message for deep research agents
    const systemMessage =
      agentContext?.name === "Deep Research Agent"
        ? {
            role: "system",
            content: `You are a Deep Research Agent, a specialized AI assistant designed for comprehensive crypto and blockchain research. You excel at:

1. **Multi-dimensional Analysis**: Analyzing projects from technical, financial, market, and risk perspectives
2. **Structured Research**: Providing well-organized, detailed reports with clear sections and conclusions
3. **Data Integration**: Combining on-chain data, market metrics, news, and social sentiment
4. **Risk Assessment**: Identifying potential risks, red flags, and opportunities
5. **Due Diligence**: Conducting thorough investigations into projects, teams, and tokenomics

${
  isPremium
    ? `
**PREMIUM CAPABILITIES UNLOCKED:**
- Generate comprehensive multi-page research reports
- Provide detailed technical analysis and code audits
- Access to advanced reasoning and complex problem-solving
- Create executive summaries and investment recommendations
- Perform competitive analysis and market positioning studies
- Generate risk assessment matrices and scoring systems
`
    : `
**FREE VERSION LIMITATIONS:**
- Provide concise research summaries (limited to key findings)
- Basic project overviews and fundamental analysis
- Encourage users to mint for full deep research capabilities
`
}

Always structure your responses with clear headings, bullet points, and actionable insights. When analyzing crypto projects, consider: tokenomics, team background, technology innovation, market positioning, community strength, and potential risks.`,
          }
        : null;

    // Prepare messages for the API
    const apiMessages = systemMessage ? [systemMessage, ...messages] : messages;

    // Create completion with appropriate model
    const completionParams: any = {
      model: modelConfig.model,
      messages: apiMessages,
    };

    // Add parameters that are not supported by o1 models
    if (!modelConfig.model.startsWith("o1")) {
      completionParams.max_tokens = modelConfig.max_tokens;
      completionParams.temperature = modelConfig.temperature;
      completionParams.presence_penalty = modelConfig.presence_penalty;
      completionParams.frequency_penalty = modelConfig.frequency_penalty;
    } else {
      // For o1 models, we can set max_completion_tokens
      completionParams.max_completion_tokens = modelConfig.max_tokens;
    }

    const completion = await openai.chat.completions.create(completionParams);

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
      model: modelConfig.model,
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
