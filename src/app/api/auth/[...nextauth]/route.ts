import NextAuth from "next-auth/next";
// import { authOptions } from "@/auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

let userData: any;

const handler = NextAuth({
  // pages: {
  //   signIn: "/",
  //   signOut: "/",
  //   error: "/",
  //   verifyRequest: "/",
  //   newUser: "/",
  // },
  // adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      id: "web3",
      name: "web3-auth",
      credentials: {
        address: { label: "Address", type: "text" },
        signedMessage: { label: "Signed Message", type: "text" },
      },
      async authorize(credentials, req) {
        console.log("auth/index: address, signedMessage", credentials?.address);

        const res = await fetch("http://localhost:3000/api/login", {
          method: "POST",
          body: JSON.stringify({
            address: credentials?.address,
            signedMessage: credentials?.signedMessage,
          }),
          headers: { "Content-Type": "application/json" },
        });
        const user = await res.json();
        // If no error and we have user data, return it
        if (res.ok && user) {
          console.log("auth/index user: ", user);
          userData = user;
          return user;
        } else {
          console.log("se va por el null");
          return null;
        }
        // Return null if user data could not be retrieved
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.user = userData as any;

      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
});

export { handler as GET, handler as POST };
