"use client";
import Link from "next/link";
import Balance from "./BalanceButton";
import ConnectButton from "./ConnectButton";
import { useWeb3ModalAccount, useWeb3Modal } from "@web3modal/ethers5/react";
import GetUserData from "./GetUserData";

const Nav = () => {
  const { address, isConnected, chainId } = useWeb3ModalAccount();
  const modal = useWeb3Modal();

  return (
    <div>
      <nav className="flex flex-row justify-between mt-2 min-h-12 mx-7 ">
        <div className="flex justify-start items-center w-1/2 pl-4">
          <h1 className="text-5xl font-bold text-black">Ever Poo Games</h1>
        </div>
        <div className="flex flex-row justify-between  items-center bg-black text-white w-1/2 rounded-lg border border-yellow-500">
          <div className="ml-4 flex flex-row items-center ">
            <Link
              className="min-h-12 flex justify-center items-center hover:bg-yellow-500 hover:text-black cursor-pointer px-6"
              href="/"
            >
              <h3>HOME</h3>
            </Link>

            {/* <GetUserData /> */}

            <Link
              className="min-h-12 flex justify-center items-center hover:bg-yellow-500 hover:text-black cursor-pointer px-6"
              href="/presale"
            >
              <h3>TOKEN SALE</h3>
            </Link>
          </div>

          {/* <div className="h-full flex items-center">
            <Balance />
          </div> */}

          <div className="flex flex-row justify-between items-center mr-2 h-full">
            <div className="border-l border-yellow-500 h-full mx-2"></div>
            <ConnectButton
              isConnected={isConnected}
              address={address}
              chainId={chainId}
            />
            {/* <w3m-button balance="hide" /> */}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
