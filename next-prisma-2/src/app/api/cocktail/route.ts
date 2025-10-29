import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page") || "1");
  const pageSize = Number(searchParams.get("pageSize") || "20");
  const search = searchParams.get("search") || "";
  const skip = (page - 1) * pageSize;

  try {
    const cocktails = await prisma.cocktail.findMany({
      skip: skip,
      take: pageSize,
      where: search
        ? {
            OR: [
              { name: { contains: search, mode: "insensitive" } },
              { ingredients: { contains: search, mode: "insensitive" } },
            ],
          }
        : undefined,
    });

    return NextResponse.json(cocktails);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch cocktails" },
      { status: 500 }
    );
  }
}