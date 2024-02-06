import getUserByAddress from "@/app/actions/get-user";
import { prisma } from "@/libs/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { ethers } from "ethers";
import { AuthOptions, RequestInternal } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import { NEXTAUTH_SECRET } from "../constants/app";

async function authorizeCrypto(
  credentials: Record<"address" | "signedMessage", string> | undefined,
  req: Pick<RequestInternal, "body" | "headers" | "method" | "query">
) {
  if (!credentials) return null;

  const { address, signedMessage } = credentials;

  const user = await getUserByAddress(address);

  if (!user) return null;

  const msg = "hola mundo";

  const signerAddress = ethers.utils.verifyMessage(msg, signedMessage);
  console.log(signerAddress);

  // if (signerAddress.toLowerCase() !== address.toLowerCase()) return null;

  return {
    id: user.address,
  };
}

// conectar api (...auth/authUser.ts)
// json respuesta API
// en nuestro caso usaremos firma de wallet
// return user o Null
export const authOptions: AuthOptions = {
  pages: {
    signIn: "/",
    signOut: "/",
    error: "/",
    verifyRequest: "/",
    newUser: "/",
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      id: "web3",
      name: "web3-auth",
      credentials: {
        address: { label: "Address", type: "text" },
        signedMessage: { label: "Signed Message", type: "text" },
      },
      authorize: authorizeCrypto,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: "NEXTAUTH_SECRET",
};
