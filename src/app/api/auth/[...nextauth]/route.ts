import NextAuth from "next-auth/next";
// import { authOptions } from "@/auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { authOptions } from "@/auth";

let userData: any;

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
