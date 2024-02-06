"use client";
import { useState } from "react";
import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
} from "@web3modal/ethers5/react";
import { ethers } from "ethers";
import { JsonRpcSigner } from "@ethersproject/providers";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useLoading } from "../context/loadingContext";
import { authUser } from "@/helpers/routes";

function ConnectButton() {
  const [name, setName] = useState("");
  const route = useRouter();
  const { address, isConnected } = useWeb3ModalAccount();
  const { setUserData } = useLoading();
  const { walletProvider } = useWeb3ModalProvider();

  useEffect(() => {
    if (isConnected) {
      login();
    } else {
      route.push("/");
    }
  }, [isConnected]);

  const login = async () => {
    try {
      // axios
      const ethersProvider = new ethers.providers.Web3Provider(walletProvider);
      const signedMessage = await signMessage(ethersProvider.getSigner());

      // const callback = await authUser(address, signedMessage);
      // console.log("callback", callback);
      // if (callback?.error) throw new Error(callback.error);
      console.log(signedMessage);
      let res = await fetch(`/api/login/${address}/${signedMessage}`, {
        method: "GET",
      });
      let data = await res.json();

      if (data == null) {
        res = await fetch("/api/login", {
          method: "POST",
          body: JSON.stringify({
            address,
            name,
            signedMessage,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        data = await res.json();
        console.log("data POST:", data);
      }
      if (data.address == address) {
        route.push(`/dashboard/${address}`);
        setUserData(data);
      }
      console.log("data end:", data);
    } catch (error) {
      console.error("Login Error: ", error);
    }
  };

  const signMessage = async (injected: JsonRpcSigner) => {
    try {
      // Aquí firmamos el mensaje "hola mundo"
      const message = "hola mundo";
      const signature = await injected.signMessage(message);
      console.log("Signature:", signature);
      //output : firma

      const signerAddress = ethers.utils.verifyMessage(message, signature);
      console.log("signature decoded:", signerAddress);
      return signature;
    } catch (error) {
      console.error("Sign Message Error:", error);
    }
  };

  return <w3m-button />;
}
export default ConnectButton;
