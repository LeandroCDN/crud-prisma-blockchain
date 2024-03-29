import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      address: string;
      assets: Any;
      balance: number;
      assets: any[]
    };
  }
}
