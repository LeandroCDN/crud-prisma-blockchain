import { signOut, useSession } from "next-auth/react";
import { JsonRpcSigner } from "@ethersproject/providers";
import { ethers } from "ethers";
import { useEffect } from "react";
import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
} from "@web3modal/ethers5/react";
import { authUser } from "@/helpers/routes";
import { useRouter } from "next/navigation";

export default function useWeb3() {
  const { data: session, status } = useSession();
  const { address, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const router = useRouter();

  useEffect(() => {
    if (isConnected) {
      const res = connect();
    } else {
    }
  }, [isConnected]);

  const signInUser = async () => {
    // console.log("user status, session:", status, session);
    const ethersProvider = new ethers.providers.Web3Provider(walletProvider);
    // const address = await ethersProvider.getSigner();
    const signedMessage = await signMessage(ethersProvider.getSigner());
    const callback = await authUser(address, signedMessage);
    if (callback?.error) throw new Error(callback.error);
    router.refresh();
    console.log("user status:", status, session?.user);
    return session?.user;
    // return 1;
  };

  const signMessage = async (injected: JsonRpcSigner) => {
    try {
      // Aquí firmamos el mensaje "hola mundo"
      const message = "hola mundo";
      const signature = await injected.signMessage(message);
      // console.log("Signature:", signature);
      //output : firma

      const signerAddress = ethers.utils.verifyMessage(message, signature);
      // console.log("signature decoded:", signerAddress);
      return signature;
    } catch (error) {
      console.error("Sign Message Error:", error);
    }
  };

  const connect = async () => {
    if (isConnected) {
      const user = await signInUser();
      return user;
    }
  };

  return {
    connect,
  };
}
