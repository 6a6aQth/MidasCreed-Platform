import NextAuth, { type DefaultSession } from "next-auth"
import Credentials from "next-auth/providers/credentials"

declare module "next-auth" {
    interface Session {
        user: {
            assignedTo: string
        } & DefaultSession["user"]
    }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password) return null;

                const mUser = process.env.MICHAELS_USERNAME;
                const mPass = process.env.MICHAELS_PASSWORD;
                const cUser = process.env.CONRAD_USERNAME;
                const cPass = process.env.CONRAD_PASSWORD;

                if (credentials.username === mUser && credentials.password === mPass) {
                    return { id: "michaels", name: "Michaels", assignedTo: "Michaels" };
                }
                if (credentials.username === cUser && credentials.password === cPass) {
                    return { id: "conrad", name: "Conrad", assignedTo: "Conrad" };
                }

                return null;
            }
        })
    ],
    callbacks: {
        async session({ session, token }) {
            if (token?.assignedTo && session.user) {
                session.user.assignedTo = token.assignedTo as string;
            }
            return session;
        },
        async jwt({ token, user, trigger }) {
            if (user) {
                // @ts-expect-error - assignedTo comes from our returned user in authorize
                token.assignedTo = user.assignedTo;
            }
            return token;
        }
    },
    pages: {
        signIn: "/login",
    }
})
