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

// todo change network

function ConnectButton({ isConnected, address, chainId }: any) {
  const [name, setName] = useState("");
  const route = useRouter();
  // const { isConnected } = useWeb3ModalAccount();
  const { setUserData, setTools } = useLoading();
  const { walletProvider } = useWeb3ModalProvider();
  // const signerLowerCase = address?.toLowerCase();
  const { connect } = useWeb3(isConnected, address);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (isConnected) {
      if (chainId != 97 && chainId != undefined) {
        switchNetwork();
      }
    }
  }, [chainId, isConnected]);

  async function switchNetwork() {
    try {
      const chainId = "0x61"; // 97 en hexadecimal

      if (window.ethereum && window.ethereum.request) {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId }],
        });
      } else {
        console.error(
          "MetaMask no está instalado o no es compatible con wallet_switchEthereumChain"
        );
      }
    } catch (error) {
      console.error("Error al cambiar de red:", error);
    }
  }

  // useEffect(() => {
  //   if (!isConnected && status === "authenticated") {
  //     signOut({ callbackUrl: "http://localhost:3000/" });
  //   }
  //   if (isConnected && status === "authenticated") {
  //     getTools();
  //     // console.log(awaitconnect());
  //     if (session?.user != undefined) {
  //       setUserData(session?.user);
  //     }
  //   }
  // }, [isConnected, status]);

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

/**
 * GET COOKIE FOR THE REFFERED:
 * 
 * 
    import React, { useEffect } from "react";
    import Cookies from "js-cookie";

    const AnotherComponent = () => {
      useEffect(() => {
        // Recupera el valor de la cookie "refID"
        const refIDValue = Cookies.get("refID");

        // Hacer algo con el valor de refID, por ejemplo, imprimirlo en la consola
        console.log("Valor de refID:", refIDValue);
      }, []); // Ajusta las dependencias según sea necesario

      // Resto del componente
      return (
        <div>
          { Contenido del componente }
          </div>
          );
        };
        
    export default AnotherComponent;
 * 
 * 
 */
