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
import { getSession, useSession } from "next-auth/react";

function ConnectButton() {
  const [name, setName] = useState("");
  const route = useRouter();
  const { address, isConnected } = useWeb3ModalAccount();
  const { setUserData, setTools } = useLoading();
  const { walletProvider } = useWeb3ModalProvider();
  const signerLowerCase = address?.toLowerCase();
  const { connect } = useWeb3();
  const { data: session, status } = useSession();

  // console.log("connect button| connect:", connect);
  // console.log(signer);

  useEffect(() => {
    if (isConnected) {
      log();
    } else {
      route.push("/");
    }
  }, [isConnected]);

  const log = async () => {
    // const session = await getSession()
    if (status) {
      console.log("session.user", session);
    }
  };

  // const login = async () => {
  //   try {
  //     // axios
  //     //   const ethersProvider = new ethers.providers.Web3Provider(walletProvider);
  //     //   const signedMessage = await signMessage(ethersProvider.getSigner());
  //     // const callback = await authUser(address, signedMessage);
  //     // if (callback?.error) throw new Error(callback.error);
  //     await getTools();
  //     let res = await fetch(`/api/login/${address}`, {
  //       method: "GET",
  //     });
  //     let data = await res.json();

  //     if (data == null) {
  //       res = await fetch("/api/login", {
  //         method: "POST",
  //         body: JSON.stringify({
  //           address,
  //           name,
  //           assets,
  //         }),
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });
  //       data = await res.json();
  //     }
  //     if (data.address == address) {
  //       route.push(`/dashboard/${address}`);
  //       setUserData(data);
  //     }
  //   } catch (error) {
  //     console.error("Login Error: ", error);
  //   }
  // };

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

  return <w3m-button />;
}
export default ConnectButton;
