import NextAuth, { Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcrypt"

export const authOptions = {
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
        strategy: "jwt" as const,
    },
    pages: {
        signIn: "/auth/login",
    },
    callbacks: {
        async session({ session, token } : { session: Session; token: any }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.sub,
                },
            }
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
