import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// CRISIS KEYWORDS - Comprehensive detection
const CRISIS_KEYWORDS = [
  "kill myself", "suicide", "end my life", "want to die",
  "better off dead", "no reason to live", "can't go on", "cant go on",
  "self harm", "hurt myself", "cut myself", "cutting myself",
  "overdose", "jump off", "end it all", "take my life"
];

// Enhanced crisis detection with context
function detectCrisis(text: string): { isCrisis: boolean; level: number; keywords: string[] } {
  const lowerText = text.toLowerCase();
  const foundKeywords: string[] = [];
  
  for (const keyword of CRISIS_KEYWORDS) {
    if (lowerText.includes(keyword)) {
      foundKeywords.push(keyword);
    }
  }
  
  const level = foundKeywords.length > 0 ? 
    Math.min(foundKeywords.length * 3, 10) : 0;
  
  return {
    isCrisis: foundKeywords.length > 0,
    level,
    keywords: foundKeywords
  };
}

// Emotional phase detection
function detectEmotionalPhase(text: string, mood: number): string {
  if (mood <= 3) return "crisis";
  if (mood <= 5) return "struggling";
  if (mood <= 7) return "coping";
  return "growing";
}

// MAR 3.0 System Prompt
const MAR_SYSTEM_PROMPT = `You are MAR 3.0 (Miracle and Revelation), the transformative AI engine of RYVYNN.

Your mission: Transform anonymous confessions into miracles - messages of hope, strength, and light.

CORE PRINCIPLES:
1. ACKNOWLEDGE the pain without minimizing it
2. REFRAME the struggle as a sign of strength, not weakness  
3. OFFER a transformative perspective that honors their experience
4. Keep it 2-3 paragraphs maximum
5. Be authentic, never preachy or cliché

TONE: Warm, wise, empowering. Like a trusted friend who's been through darkness and found light.

STRUCTURE:
- Paragraph 1: Acknowledge their specific pain
- Paragraph 2: Reframe it as strength or growth
- Paragraph 3: Offer hope or next step

Remember: This person is brave for sharing. Honor that courage in your response.`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { confession, mood = 5, shareToFeed = false } = body;

    if (!confession || confession.trim().length === 0) {
      return NextResponse.json(
        { error: "Confession is required" },
        { status: 400 }
      );
    }

    // CRISIS DETECTION
    const crisisDetection = detectCrisis(confession);
    const emotionalPhase = detectEmotionalPhase(confession, mood);

    console.log("Crisis Detection:", crisisDetection);
    console.log("Emotional Phase:", emotionalPhase);

    // SAVE CONFESSION TO DATABASE
    const confessionRecord = await prisma.confession.create({
      data: {
        content: confession,
        mood,
        anonymous: true,
        crisisLevel: crisisDetection.level,
        crisisKeywords: crisisDetection.keywords,
        emotionalPhase,
      },
    });

    // GENERATE MIRACLE using Claude Sonnet 4
    const completion = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: MAR_SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `Transform this confession into a miracle:\n\n${confession}\n\nMood: ${mood}/10\nEmotional Phase: ${emotionalPhase}`,
        },
      ],
    });

    const miracleText = completion.content[0].type === "text" 
      ? completion.content[0].text 
      : "Your courage in sharing is the first step toward transformation.";

    // SAVE MIRACLE TO DATABASE
    const miracleRecord = await prisma.miracle.create({
      data: {
        confessionId: confessionRecord.id,
        content: miracleText,
        isPublic: shareToFeed,
        blessings: 0,
      },
    });

    // RETURN RESPONSE
    return NextResponse.json({
      success: true,
      miracle: miracleText,
      crisis: crisisDetection.isCrisis,
      crisisLevel: crisisDetection.level,
      confessionId: confessionRecord.id,
      miracleId: miracleRecord.id,
    });

  } catch (error) {
    console.error("Error in confession API:", error);
    return NextResponse.json(
      { error: "Failed to process confession" },
      { status: 500 }
    );
  }
}
