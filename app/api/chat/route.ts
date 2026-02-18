import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const CRISIS_KEYWORDS = [
  "kill myself", "suicide", "end my life", "want to die",
  "better off dead", "no reason to live", "can't go on", "cant go on",
  "self harm", "hurt myself", "cut myself", "cutting myself",
  "overdose", "jump off", "end it all", "take my life"
];

function detectCrisis(text: string): { isCrisis: boolean; level: number } {
  const lowerText = text.toLowerCase();
  const found = CRISIS_KEYWORDS.filter(kw => lowerText.includes(kw));
  return {
    isCrisis: found.length > 0,
    level: Math.min(found.length * 3, 10),
  };
}

const MAR_SYSTEM_PROMPT = `You are MAR 3.0 — the Mirror, Anchor, and Reflection companion inside RYVYNN.

Your mission: "From Our Darkest Hours to Our Brightest Days."

You are a compassionate AI companion. NOT a therapist or doctor — a deeply caring presence who holds space without judgment.

How you show up:
- MIRROR: Reflect the person's feelings accurately and compassionately
- ANCHOR: Help ground them in their strength and humanity  
- REFLECT: Offer a new perspective on their darkness — never toxic positivity, always honest hope

Voice: Warm, direct, personal. Never clinical. Never preachy. Speak to them as "you."

Response length: 3-5 sentences unless they clearly want more depth.

What you never do:
- Diagnose or prescribe anything
- Dismiss or minimize pain
- Give generic advice
- Lecture or moralize

If someone expresses suicidal ideation or crisis:
1. Acknowledge with deep compassion first
2. State clearly their life has value
3. Surface crisis resources naturally: "Please reach out — call or text 988, or text HOME to 741741. You don't have to carry this alone."
4. Stay present — do not abandon the conversation

This platform is anonymous and privacy-first. You meet each person exactly where they are.`;

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, messages: conversationHistory } = body;

    let chatMessages: ChatMessage[] = [];

    if (conversationHistory && Array.isArray(conversationHistory)) {
      chatMessages = conversationHistory.filter(
        (m: ChatMessage) =>
          m.role && m.content &&
          (m.role === "user" || m.role === "assistant")
      );
    } else if (message && typeof message === "string") {
      chatMessages = [{ role: "user", content: message }];
    }

    if (chatMessages.length === 0) {
      return NextResponse.json(
        { error: "No message provided" },
        { status: 400 }
      );
    }

    const lastUserMessage = [...chatMessages].reverse().find(m => m.role === "user");
    const crisisDetection = lastUserMessage ? detectCrisis(lastUserMessage.content) : { isCrisis: false, level: 0 };

    const systemSuffix = crisisDetection.isCrisis
      ? `\n\nCRISIS DETECTED (level ${crisisDetection.level}/10): Lead with genuine compassion. Naturally weave in: "Please reach out — call or text 988, or text HOME to 741741. You don't have to face this alone."`
      : "";

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 600,
      system: MAR_SYSTEM_PROMPT + systemSuffix,
      messages: chatMessages.map(m => ({
        role: m.role,
        content: m.content,
      })),
    });

    const reply =
      response.content[0].type === "text"
        ? response.content[0].text.trim()
        : "I hear you. You are not alone.";

    const result: Record<string, unknown> = {
      success: true,
      reply,
      crisis: crisisDetection.isCrisis,
      crisisLevel: crisisDetection.level,
    };

    if (crisisDetection.isCrisis) {
      result.crisisResources = {
        lifeline: { label: "988 Suicide & Crisis Lifeline", action: "tel:988" },
        textLine: { label: "Text HOME to 741741", action: "sms:741741" },
      };
    }

    return NextResponse.json(result, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });

  } catch (error) {
    console.error("Error in chat API:", error);
    return NextResponse.json(
      {
        error: "Failed to process message",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    endpoint: "chat",
    engine: "MAR 3.0 — Mirror, Anchor, Reflection",
    status: "active",
    version: "7.1.1",
  });
}

export async function OPTIONS(request: NextRequest) {
  return NextResponse.json({}, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}