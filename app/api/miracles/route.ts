import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const miracles = await prisma.miracle.findMany({
      where: {
        isPublic: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 50,
      select: {
        id: true,
        content: true,
        blessings: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ miracles });
  } catch (error) {
    console.error("Error fetching miracles:", error);
    return NextResponse.json(
      { error: "Failed to fetch miracles" },
      { status: 500 }
    );
  }
}
