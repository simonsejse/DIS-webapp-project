import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { authOptions as options } from "@/lib/auth";

export const handler = NextAuth(options);

export { handler as GET, handler as POST };
