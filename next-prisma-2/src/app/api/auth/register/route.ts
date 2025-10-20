import { prisma } from "@/lib/prisma"
import bcrypt from "bcrypt"

export async function POST(req: Request) {
    try {
        const { username, password } = await req.json()

        if (!username || !password) {
            return new Response(JSON.stringify({ message: "Missing username or password" }), { status: 400 })
        }

        const existingUser = await prisma.user.findUnique({
            where: { username },
        })

        if (existingUser) {
            return new Response(JSON.stringify({ message: "Username already taken" }), { status: 400 })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await prisma.user.create({
            data: {
                username,
                password: hashedPassword,
            },
        })
        return new Response(JSON.stringify({ id: newUser.id, username: newUser.username }), { status: 201 })

    } catch (error) {
        return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 })
    }    
}