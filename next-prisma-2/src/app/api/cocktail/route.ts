import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const cocktails = await prisma.cocktail.findMany();
    return NextResponse.json(cocktails);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch cocktails" },
      { status: 500 }
    );
  }
}