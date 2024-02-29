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
import useWeb3 from "@/hooks/useWeb3";
import { getSession, useSession, signOut } from "next-auth/react";
// import { signIn } from "next-auth/react";

function ConnectButton({ isConnected, address }: any) {
  const [name, setName] = useState("");
  const route = useRouter();
  // const { isConnected } = useWeb3ModalAccount();
  const { setUserData, setTools } = useLoading();
  const { walletProvider } = useWeb3ModalProvider();
  // const signerLowerCase = address?.toLowerCase();
  const { connect } = useWeb3(isConnected, address);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (!isConnected && status === "authenticated") {
      signOut({ callbackUrl: "http://localhost:3000/" });
    }
    if (isConnected && status === "authenticated") {
      getTools();
      // console.log(awaitconnect());
      if (session?.user != undefined) {
        setUserData(session?.user);
      }
    }
  }, [isConnected, status]);

  const getTools = async () => {
    try {
      let res = await fetch(`/api/assets`, {
        method: "GET",
      });
      let data = await res.json();
      setTools(data);
    } catch (error) {
      console.error("Login Error: ", error);
    }
  };

  const getUser = async () => {
    try {
      let res = await fetch(`/api/assets`, {
        method: "GET",
      });
      let data = await res.json();
      setTools(data);
    } catch (error) {
      console.error("Login Error: ", error);
    }
  };

  return <w3m-button balance="hide" />;
}
export default ConnectButton;
