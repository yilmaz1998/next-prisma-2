import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { cocktailId } = await req.json();

        const existingFavorite = await prisma.favorite.findFirst({
            where: {
              userId: session.user.id,
              cocktailId: cocktailId,
            },
          })
      
          if (existingFavorite) {
            return NextResponse.json({ message: "This cocktail is already in favorites." }, { status: 400 })
        }

        const favorite = await prisma.favorite.create({
            data: {
                userId: session.user.id,
                cocktailId: cocktailId,
            }
        });
        console.log(favorite);
        console.log('prisma.favorite:', prisma.favorite);
        return NextResponse.json(favorite, { status: 201 });
    } catch (error) {
        console.error("Error in POST /favorites:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET() {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const favorites = await prisma.favorite.findMany({
            where: {userId: session.user.id},
            orderBy: {createdAt: 'desc'},
            include: {cocktail: true}
        })
        return NextResponse.json(favorites);

    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch favorites" },
            { status: 500 }
          );
    }
}