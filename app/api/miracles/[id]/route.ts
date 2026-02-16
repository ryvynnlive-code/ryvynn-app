import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const miracleId = params.id;

    const miracle = await prisma.miracle.update({
      where: { id: miracleId },
      data: {
        blessings: {
          increment: 1,
        },
      },
    });

    return NextResponse.json({ 
      success: true, 
      blessings: miracle.blessings 
    });
  } catch (error) {
    console.error("Error blessing miracle:", error);
    return NextResponse.json(
      { error: "Failed to bless miracle" },
      { status: 500 }
    );
  }
}
