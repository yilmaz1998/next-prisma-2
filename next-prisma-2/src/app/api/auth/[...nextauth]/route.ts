import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcrypt"

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password) {
                    throw new Error("Missing username or password")
                }

                const user = await prisma.user.findFirst({
                    where: { username: credentials.username }
                  });

                if (!user) {
                    throw new Error("User not found")
                  }

                const isPasswordValid = await bcrypt.compare(
                    credentials.password,
                    user.password
                )

                if (!isPasswordValid) {
                    throw new Error("Invalid password")
                }

                return { id: user.id, name: user.username }
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/auth/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }
