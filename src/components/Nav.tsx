"use client";
import Link from "next/link";
import Balance from "./BalanceButton";
import ConnectButton from "./ConnectButton";
import { useWeb3ModalAccount } from "@web3modal/ethers5/react";
import GetUserData from "./GetUserData";

const Nav = () => {
  const { address, isConnected } = useWeb3ModalAccount();
  return (
    <nav className="flex flex-row justify-between  items-center bg-black text-whit px-3 py-1">
      <div className="p-1 flex flex-row gap-2 items-center">
        <Link href="/">
          <h3>HOME</h3>
        </Link>
        <GetUserData />
        <Link href="/userpost">
          <h3>UserPost</h3>
        </Link>
      </div>

      <div className="absolute left-1/2 transform -translate-x-1/2">
        <Balance />
      </div>

      <div className="flex flex-row justify-between items-center  ">
        {isConnected && (
          <Link href={`/dashboard/${address}`}>
            {" "}
            <h3>Profile</h3>
          </Link>
        )}
        <ConnectButton isConnected={isConnected} address={address} />
      </div>
    </nav>
  );
};

export default Nav;
