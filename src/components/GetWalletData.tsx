"use client";
import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
} from "@web3modal/ethers5/react";

export default function GetWalletData() {
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  async function getBalance() {
    console.log("address: ", address);
    console.log("chainId: ", chainId);
    console.log("isConnected: ", isConnected);
    console.log("walletProvider: ", walletProvider);
  }

  return (
    <button
      onClick={getBalance}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Get Wallet Data
    </button>
  );
}
