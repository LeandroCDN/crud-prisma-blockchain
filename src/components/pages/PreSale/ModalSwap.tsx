"use client";
import { useState } from "react";

const ModalSwap = () => {
  const [points, setPoints] = useState("");
  // call smart contract to get points

  return (
    <div className="  text-white px-2  rounded-xl border border-yellow-500 bg-white bg-opacity-15">
      <div className="flex flex-row justify-between mt-1">
        <div className="flex">
          <span className=" text-white">1 Point: 0.01 usd</span>
        </div>
        <div className="flex">
          <span className=" text-white">1 usd: 100 points</span>
        </div>
      </div>
      <form className=" max-w-md">
        <div className="flex flex-col bg-black rounded-lg p-4 mb-2">
          <div className="flex flex-row justify-between ">
            <div className="flex">
              <span className=" text-gray-300">You pay</span>
            </div>
            <div className="flex">
              <span className=" text-gray-300">Balance</span>
            </div>
          </div>
          <div className="flex flex-row justify-between items-center">
            <input
              type="text"
              name="name"
              autoFocus
              placeholder="0"
              className="w-full  text-4xl bg-black rounded-md focus:outline-none focus:none mb-2"
            />
            <span className="inline-block bg-gray-200 rounded-full px-2 py-1 text-sm font-bold text-gray-700  border border-white-200 bg-white bg-opacity-50">
              USDT
            </span>
          </div>
        </div>
        <div className="flex flex-col bg-black rounded-lg p-4">
          <div className="flex flex-row justify-between ">
            <div className="flex">
              <span className=" text-gray-300">You recivey</span>
            </div>
            <div className="flex">
              <span className=" text-gray-300">Your points: 90500</span>
            </div>
          </div>
          <div className="flex flex-row justify-between items-center">
            <input
              type="text"
              name="name"
              autoFocus
              placeholder="0"
              readOnly
              value={19999899}
              className="text-4xl bg-black rounded-md focus:outline-none focus:none mb-2 max-w-52"
            />
            <div className="text-gray-300">Total Investment: 100 </div>
          </div>
        </div>

        <div className="flex flex-row items-end justify-center w-full my-2">
          <button className="rounded p-4 text-2xl text-white border bg-yellow-400 w-full border-black border-opacity-10 hover:border-opacity-20 hover:shadow-md transition duration-300">
            Connect Wallet
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModalSwap;
