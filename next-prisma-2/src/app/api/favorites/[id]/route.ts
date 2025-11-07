import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth/next'

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const favorite = await prisma.favorite.findFirst({
      where: {
        cocktailId: params.id,
        userId: session.user.id,
      },
    })

    if (!favorite) {
      return NextResponse.json({ error: "Favorite not found" }, { status: 404 })
    }

    if (favorite.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    await prisma.favorite.delete({ where: { id: favorite.id } })
    return NextResponse.json({ message: "Favorite removed successfully" })
  } catch (error) {
    console.error("Error deleting favorite:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}