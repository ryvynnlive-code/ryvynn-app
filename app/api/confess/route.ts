import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

const CRISIS_KEYWORDS = [
  'kill myself', 'suicide', 'end my life', 'want to die',
  'better off dead', 'no reason to live', 'cant go on',
  'self harm', 'hurt myself', 'cut myself'
];

function detectCrisis(text: string): boolean {
  const lowerText = text.toLowerCase();
  return CRISIS_KEYWORDS.some(keyword => lowerText.includes(keyword));
}

export async function POST(request: NextRequest) {
  try {
    const { confession } = await request.json();

    if (!confession || confession.trim().length === 0) {
      return NextResponse.json(
        { error: 'Confession is required' },
        { status: 400 }
      );
    }

    // Crisis detection
    const crisisDetected = detectCrisis(confession);

    // Transform confession using Claude AI (MAR 3.0 Engine)
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      messages: [{
        role: 'user',
        content: `You are the MAR (Miracle Acknowledgment Response) 3.0 Engine for RYVYNN, a mental wellness platform.

A person has shared this confession anonymously:

"${confession}"

Your role:
1. Acknowledge their pain with deep empathy
2. Reframe their struggle as a source of strength and growth
3. Offer perspective that transforms darkness into hope
4. Keep response 2-3 paragraphs maximum
5. Be authentic, not preachy

Respond with compassion and wisdom. Transform their confession into a miracle.`
      }]
    });

    const miracle = message.content[0].type === 'text' 
      ? message.content[0].text 
      : 'Your miracle is being created...';

    return NextResponse.json({
      miracle,
      crisisDetected,
    });

  } catch (error) {
    console.error('Confession processing error:', error);
    return NextResponse.json(
      { error: 'Failed to process confession' },
      { status: 500 }
    );
  }
}
