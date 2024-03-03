"use client";
// import { useLoading } from "../context/loadingContext";
import { useLoading } from "../../context/loadingContext";
import BuyCard from "@/components/cards/BuyCard";
import GetUserData from "../GetUserData";
import { useEffect } from "react";
import { useWeb3ModalAccount } from "@web3modal/ethers5/react";
import { useSession } from "next-auth/react";

const Buy = () => {
  // const { userData, userBuy } = useLoading();
  const { tools }: any = useLoading();

  return (
    <div className="flex flex-col items-center  pt-4 ">
      {/* <h1> SHOP!</h1>
      <GetUserData /> */}

      <div className="w-full flex flex-col justify-center items-center ">
        <h3 className="text-xl">SHOP</h3>
      </div>
      <div className="w-full border-b-2"></div>

      <div className="flex flex-row justify-center items-center mt-2">
        <div className="flex flex-col gap-4">
          {Array.isArray(tools) &&
            tools.map((asset, index) => (
              <BuyCard
                key={index}
                title={index}
                production={tools[index]?.production}
                storage="DifTime"
                fullSotorage={tools[index]?.storage}
                state="difTime"
                fullDurability={tools[index]?.durability}
              />
            ))}
        </div>
      </div>
    </div>
  );
};
export default Buy;
