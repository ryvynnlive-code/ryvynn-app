import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const confessions = await prisma.confession.count();
    const miracles = await prisma.miracle.count();
    
    const stats = {
      confessions,
      miracles,
      soulTokens: 0,
      tier: "FREE",
      blessingsReceived: 0,
    };

    return NextResponse.json({ stats });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
