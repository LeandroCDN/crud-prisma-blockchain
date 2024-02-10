"use client";
// import { useLoading } from "../context/loadingContext";
import { useLoading } from "../../context/loadingContext";
import PickaxeCard from "@/components/cards/PickaxeCard";
import { useEffect } from "react";
import { useWeb3ModalAccount } from "@web3modal/ethers5/react";

const Buy = () => {
  // const { userData, userBuy } = useLoading();
  const { tools } = useLoading();

  return (
    <div className="flex flex-col items-center bg-black bg-opacity-50 h-screen pt-4">
      <h1> SHOP!</h1>

      <div className="flex flex-row justify-center items-center mt-10 ">
        <div className="flex flex-col gap-4">
          {Array.isArray(tools) &&
            tools.map((asset, index) => (
              <PickaxeCard
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
