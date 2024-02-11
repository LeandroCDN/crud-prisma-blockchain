"use client";
import { useLoading } from "@/context/loadingContext";
import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
} from "@web3modal/ethers5/react";

export default function GetUserData() {
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { userData, tools } = useLoading();
  async function getBalance() {
    console.log("userData: ", userData);
    console.log("Tool list: ", tools);
  }

  return (
    <button
      onClick={getBalance}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Get User Data
    </button>
  );
}
