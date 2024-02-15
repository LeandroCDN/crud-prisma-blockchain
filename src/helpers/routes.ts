import { signIn } from "next-auth/react";

export const authUser = async (address: any, signedMessage: any) => {
  return await signIn("web3", {
    address,
    signedMessage,
    redirect: false,
  });
};
