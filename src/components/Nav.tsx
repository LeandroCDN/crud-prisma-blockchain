"use client";
import Link from "next/link";
import Balance from "./BalanceButton";
import ConnectButton from "./ConnectButton";
import { useWeb3ModalAccount, useWeb3Modal } from "@web3modal/ethers5/react";
import { useState } from "react";
// import GetUserData from "./GetUserData";
import Image from "next/image";

const Nav = () => {
  const { address, isConnected, chainId } = useWeb3ModalAccount();
  const [menuOpen, setMenuOpen] = useState(false);
  const [walletmenuOpen, setWalletMenuOpen] = useState(false);
  const modal = useWeb3Modal();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setWalletMenuOpen(false);
  };
  const toggleWalletMenu = () => {
    setMenuOpen(false);
    setWalletMenuOpen(!walletmenuOpen);
  };
  return (
    <div>
      <nav className="flex flex-row justify-between mt-2 min-h-12 mx-7 ">
        <div className="flex justify-start items-center w-1/2 pl-4">
          <h1 className="hidden sm:block sm:text-2xl md:text-3xl xl:text-5xl font-bold text-black">
            Ever Poo Games
          </h1>
          <h1 className="text-4xl font-bold text-black sm:hidden">EVP</h1>
        </div>
        <div className="flex flex-row justify-between  items-center bg-black text-white w-1/2 rounded-lg border border-yellow-500">
          <button
            className="block xl:hidden ml-4"
            onClick={toggleMenu}
            aria-label="Menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
          <div
            className={`${
              menuOpen
                ? "absolute flex flex-col w-64 top-12 right-6 sm:right-auto sm:z-50  border border-yellow-500"
                : "hidden"
            } xl:flex xl:flex-row justify-between items-center bg-black text-white xl:w-auto rounded-lg mt-2 xl:mt-0`}
          >
            <div className="ml-4 flex flex-col xl:flex-row  items-center ">
              <Link
                className="min-h-12 flex justify-center items-center hover:bg-yellow-500 hover:text-black cursor-pointer xl:px-6"
                href="/"
              >
                <h3>HOME</h3>
              </Link>
              {isConnected && (
                <Link
                  className="min-h-12 flex justify-center items-center hover:bg-yellow-500 hover:text-black cursor-pointer px-6"
                  href={`/dashboard/${address}`}
                >
                  <h3>GAME</h3>
                </Link>
              )}

              <Link
                className="min-h-12 flex justify-center items-center hover:bg-yellow-500 hover:text-black cursor-pointer px-6"
                href="/presale"
              >
                <h3>TOKEN SALE</h3>
              </Link>
            </div>
            <div className="h-full flex items-center">
              <Balance />
            </div>
          </div>

          <div className="flex flex-row justify-between items-center mr-2 h-full">
            <div className="border-l border-yellow-500 h-full mx-2"></div>
            <button
              className="block md:hidden ml-4"
              onClick={toggleWalletMenu}
              aria-label="Menu"
            >
              <Image
                src={"./wallet-svg.svg"}
                alt="Wallet Icon"
                width={32}
                height={32}
              />
            </button>
            <div
              className={`${
                walletmenuOpen
                  ? "absolute flex flex-col w-64 top-14 z-50 right-5 border border-yellow-500 bg-black rounded-lg"
                  : "hidden"
              } md:flex md:flex-row justify-between items-center mr-2 md:h-full`}
            >
              {isConnected && (
                <Link href={`/profile`}>
                  <h3>Profile</h3>
                </Link>
              )}
              <ConnectButton
                isConnected={isConnected}
                address={address}
                chainId={chainId}
              />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
