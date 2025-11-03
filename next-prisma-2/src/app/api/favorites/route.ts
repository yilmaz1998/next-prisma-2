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