// import getUserByAddress from "@/app/actions/get-user";
// import { generateSignMessage } from "@/helpers/web3";
import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  // pages: {
  //   signIn: "/",
  //   signOut: "/",
  //   error: "/",
  //   verifyRequest: "/",
  //   newUser: "/",
  // },
  // // adapter: PrismaAdapter(prisma),
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
        const userData = await res.json();
        // If no error and we have user data, return it
        if (res.ok && userData) {
          console.log("auth/index res.json: ", userData, res.ok);
          return userData;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
};
