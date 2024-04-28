import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "../../../lib/prisma";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Login med",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const user = await prisma.user.findFirst({
            where: {
                email: credentials?.email,
                password: credentials?.password
            }
        })
        if (user) {
          return user
        } else {
          return null
        }
      }
    })
  ]
}

export default NextAuth(authOptions)