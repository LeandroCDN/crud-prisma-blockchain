"use client";
import React, { useState } from "react";
import { useLoading } from "@/context/loadingContext";
import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
} from "@web3modal/ethers5/react";
import { ethers } from "ethers";
import tokenAbi from "@/../abis/ERC20.json";

const tokenAddress = "0x6FE09ce1C0Af342EB7eda03Bf393694f20eA5042";
const devWallet = "0xcaFE155ECc18e5dC2962C2D5840788659b543654";

const Balance = () => {
  const [value, setValue] = useState("");
  const { address, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleButtonClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSubmit = async (e, action) => {
    e.preventDefault();
    if (!isConnected) throw Error("User disconnected");

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
      console.log("rs: ", rs);
      if (rs != null) {
        // const res = await deposit(address, parseInt(value));
        console.log("api POST");
        const res = await fetch(
          `/api/deposits/${address}/${rs.transactionHash}`,
          {
            method: "POST",
          }
        );
        const data = await res.json();

        console.log(data);
      }
      // Handle the result as needed
    } else if (action === "withdraw") {
      // Withdraw logic
      // const res = await withdrawBack({ address, value });
      const res = await fetch(`/api/withdraw/${address}/${value.toString()}`, {
        method: "POST",
      });
      const data = await res.json();

      console.log(data);
    }
  };

  return (
    isConnected && (
      <div className="flex flex-row m-4 justify-center px-2 py-1 rounded bg-gray-600 text-xl w-full">
        <div>Balance: 9999 </div>
        <div className="flex flex-row ml-2">
          <p>|</p>
          <button
            className="ml-1 px-1 rounded-full text-white border border-black border-opacity-10 hover:border-opacity-20 hover:shadow-md transition duration-300"
            onClick={handleButtonClick}
          >
            &#8595;
          </button>
        </div>
        {isMenuOpen && (
          <div className="absolute bg-gray-600 text-white w-full px-2 py-1 top-11 ">
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
                  className="rounded p-1 text-white border border-black border-opacity-10 hover:border-opacity-20 hover:shadow-md transition duration-300"
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
