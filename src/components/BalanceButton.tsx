"use client";
import React, { useState } from "react";
import { useLoading } from "@/context/loadingContext";
import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
} from "@web3modal/ethers5/react";
import { JsonRpcSigner } from "@ethersproject/providers";
import { ethers } from "ethers";
import tokenAbi from "@/../abis/ERC20.json";
import { useSession } from "next-auth/react";

const tokenAddress = "0x6FE09ce1C0Af342EB7eda03Bf393694f20eA5042";
const devWallet = "0xcaFE155ECc18e5dC2962C2D5840788659b543654";

const Balance = () => {
  const [value, setValue] = useState("");
  const { address, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  const { data: session, status } = useSession();
  const user = session?.user;
  const { userData, setUserData }: any = useLoading();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleButtonClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSubmit = async (e: any, action: any) => {
    e.preventDefault();
    if (!isConnected || !walletProvider) throw Error("User disconnected");

    const ethersProvider = new ethers.providers.Web3Provider(walletProvider);
    const signer = await ethersProvider.getSigner();

    if (action === "deposit") {
      // Deposit logic
      const USDTContract = new ethers.Contract(
        tokenAddress,
        tokenAbi.result,
        signer
      );
      const USDTBalance = await USDTContract.transfer(
        devWallet,
        value.toString()
      );
      const rs = await USDTBalance.wait();

      if (rs != null) {
        // const res = await deposit(address, parseInt(value));
        const res = await fetch(
          `/api/deposit/${address}/${rs.transactionHash}`,
          {
            method: "POST",
          }
        );
        const data = await res.json();
        if (res != null) {
          alert(`deposit end, your balance: ${data?.balance}`);
        }
      }
      // Handle the result as needed
    } else if (action === "withdraw") {
      // Withdraw logic
      // const res = await withdrawBack({ address, value });
      // const ethersProvider = new ethers.providers.Web3Provider(walletProvider);
      const signedMessage = await signMessage(ethersProvider.getSigner());
      const res = await fetch(`/api/withdraw/${address}/${value.toString()}`, {
        method: "POST",
        body: JSON.stringify({
          signedMessage,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setUserData(data?.updatedRecord);
      console.log("withdraw:", data);
    }
  };

  const signMessage = async (injected: JsonRpcSigner) => {
    try {
      // Aquí firmamos el mensaje "hola mundo"
      const message = "hola mundo";
      const signature = await injected.signMessage(message);
      // console.log("Signature:", signature);
      //output : firma

      // const signerAddress = ethers.utils.verifyMessage(message, signature);
      // console.log("signature decoded:", signerAddress);
      return signature;
    } catch (error) {
      console.error("Sign Message Error:", error);
    }
  };

  return (
    isConnected && (
      <div className="flex flex-row  justify-center items-center px-2    text-xl h-full">
        <div>Balance: {userData?.balance} </div>
        <div className="flex flex-row ml-2">
          <p>|</p>
          <button
            className="ml-1 px-1 rounded-full text-white border border-black border-opacity-10 hover:border-opacity-20 hover:shadow-md transition duration-300"
            onClick={handleButtonClick}
          >
            {isMenuOpen ? "x" : "↓"}
          </button>
        </div>
        {isMenuOpen && (
          <div className="fixed text-white px-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-xl border border-yellow-500 bg-white bg-opacity-15 w-96 h-40 z-50">
            <div className="flex justify-end">
              <button className=" text-white" onClick={handleButtonClick}>
                x
              </button>
            </div>
            <form>
              <input
                type="text"
                name="name"
                autoFocus
                placeholder="Value"
                className="w-full px-4 py-2 text-black bg-whte rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 my-2"
                onChange={(e) => setValue(e.target.value)}
              />
              <div className="flex flex-row justify-between">
                <button
                  className="rounded p-1 text-white border  border-black border-opacity-10 hover:border-opacity-20 hover:shadow-md transition duration-300"
                  onClick={(e) => handleSubmit(e, "deposit")}
                >
                  Deposit
                </button>
                <button
                  className="rounded p-1 text-white border border-black border-opacity-10 hover:border-opacity-20 hover:shadow-md transition duration-300"
                  onClick={(e) => handleSubmit(e, "withdraw")}
                >
                  Withdraw
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    )
  );
};

export default Balance;
