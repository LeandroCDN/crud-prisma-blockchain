"use client";
import { useWeb3ModalAccount } from "@web3modal/ethers5/react";
import { useRouter } from "next/navigation";
import { useLoading } from "@/context/loadingContext";
// import React from "react";

const PickaxeCard = (props: any) => {
  const { address, isConnected } = useWeb3ModalAccount();
  const { setUserData } = useLoading();
  const route = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isConnected) throw Error("User disconnected");
    // const res = await deposit(address, parseInt(value));
    const lvl = parseInt(props.title);
    const res = await fetch(`/api/assets/buytool`, {
      method: "POST",
      body: JSON.stringify({
        address,
        lvl,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setUserData(data);
    console.log("Buy Tool RES: ", data);
    route.refresh();
  };

  return (
    <div>
      <div className="flex flex-col xl:flex-row items-center justify-center xl:items-stretch my-4 ">
        <div className="flex flex-col shadow-lg rounded-xl border border-radius mb-5 xl:mb-0 bg-white w-60 bg-opacity-30">
          <div className="px-5 py-3">
            <div className="flex flex-row justify-between w-full">
              <div
                className={` text-xl mb-2 }`}
              >{`Pico LVL ${props.title}`}</div>
            </div>
            <p className="text-gray-800  text-base">
              Procution: {props.production}/Min
            </p>
            <p className="text-gray-800  text-base">
              Storage: {props.fullSotorage}
            </p>
            <p className="text-gray-800  text-base">
              Durability: {props.fullDurability} Days
            </p>
            <p className="text-black ">
              Price: {Math.trunc(((props.title + 2) / (5 + props.title)) * 100)}
              pups
            </p>
          </div>
          <div className="px-6 mt-2">
            <button
              onClick={(e) => handleSubmit(e)}
              className="inline-block bg-gray-200 rounded-full px-2 py-1 text-sm font-bold text-gray-800 mr-2 mb-2 border border-white-200 bg-white bg-opacity-50"
            >
              BUY
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PickaxeCard;
