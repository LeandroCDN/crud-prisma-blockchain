"use client";
import { useWeb3ModalAccount } from "@web3modal/ethers5/react";
import { useRouter } from "next/navigation";
import { useLoading } from "@/context/loadingContext";
import React, { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";

// import React from "react";

const SimpleBoxCard = (props: any) => {
  const { address, isConnected } = useWeb3ModalAccount();
  const { userData, tools, setUserData }: any = useLoading();
  const route = useRouter();
  const { data: session, update } = useSession();
  const [actualProfit, setActualProfit] = useState(0);

  function repair() {
    setActualProfit(getActualProfit());
  }

  const getActualProfit = useCallback(() => {
    const dateNow = new Date();

    const index = parseInt(props.i);
    const toolAtIndex = userData?.assets[index];

    const lastHarvestTime = new Date(toolAtIndex.lastHarvest || 0);
    const difTime = dateNow.getTime() - lastHarvestTime.getTime();

    const difTimeInSeg = Math.trunc(difTime / (1000 * 60)); //
    let totalProduction = tools[toolAtIndex.tool]?.production * difTimeInSeg;

    if (totalProduction > tools[toolAtIndex.tool]?.storage) {
      totalProduction = tools[toolAtIndex.tool]?.storage;
    }
    if (difTime < 1) {
      totalProduction = 0;
    }

    return totalProduction;
  }, [props.i, userData, tools]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!isConnected) throw Error("User disconnected");
    // const res = await deposit(address, parseInt(value));
    const index = parseInt(props.i);
    const res = await fetch(`/api/assets/harvest`, {
      method: "POST",
      body: JSON.stringify({
        address,
        index,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    await updateSession(data);
    await setUserData(data);
    repair();
    // route.refresh();
  };

  useEffect(() => {
    const timerId = setInterval(() => {
      const profit = getActualProfit();

      if (!isNaN(profit)) {
        setActualProfit(profit);
      }
    }, 1000);

    return () => clearInterval(timerId);
  }, [getActualProfit]);

  async function updateSession(data: any) {
    await update({
      ...session,
      user: {
        ...session?.user,
        balance: data.balance,
        assets: data.assets,
      },
    });
  }

  return (
    <div>
      <div className="flex flex-col xl:flex-row items-center justify-center w-full xl:items-stretch my-4 ">
        <div className="flex-col xl:max-w-[60%] max-w-[70%]  shadow-lg rounded-xl border border-radius mb-5 xl:mb-0 min-w-80 bg-white bg-opacity-10">
          {/* <img src="https://i.postimg.cc/SxLx0fHV/bg01.jpg" alt="image3" className="w-full h-48 imgcard object-cover mb-2" /> */}
          <div className="px-5 py-3">
            <div className="flex flex-row justify-between w-full">
              <div className={` text-xl mb-2 }`}>{props.title}</div>
              <p> 1 year </p>
            </div>
            <p className="text-gray-800  text-base mb-2">
              Production: {props.production}/Min
            </p>
            <p className="text-gray-800  text-base">
              Storage: {actualProfit}/{props.fullSotorage}
            </p>
            <p className="text-gray-800  text-base">
              Durability: {props.state}/{props.fullDurability} Days
            </p>
          </div>
          <div className="px-6 mt-4">
            <button
              onClick={(e) => handleSubmit(e)}
              className="inline-block  rounded-full px-2 py-1 text-sm font-bold text-gray-800 mr-2 mb-2 border border-white-200 bg-white bg-opacity-50"
            >
              Harvest
            </button>
            <span className="inline-block  rounded-full px-2 py-1 text-sm font-bold text-gray-800 mr-2 mb-2 border border-white-200 bg-white bg-opacity-50">
              Update
            </span>
            <button
              onClick={repair}
              className="inline-block  rounded-full px-2 py-1 text-sm font-bold text-gray-800 mr-2 mb-2 border border-white-200 bg-white bg-opacity-50"
            >
              Repair
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleBoxCard;
