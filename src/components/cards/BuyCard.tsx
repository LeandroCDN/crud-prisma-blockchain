"use client";
import { useWeb3ModalAccount } from "@web3modal/ethers5/react";
import { useRouter } from "next/navigation";
import { useLoading } from "@/context/loadingContext";
import Image from "next/image";

// import React from "react";

const BuyCard = (props: any) => {
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
    // console.log("Buy Tool RES: ", data);
    route.refresh();
  };

  return (
    <div>
      <div className="flex flex-col xl:flex-row items-center justify-center w-full xl:items-stretch my-4 ">
        <div className="flex-col xl:max-w-[60%] max-w-[70%]  shadow-lg rounded-xl border border-radius mb-5 xl:mb-0 min-w-80 bg-white bg-opacity-10">
          {/* <img src="https://i.postimg.cc/SxLx0fHV/bg01.jpg" alt="image3" className="w-full h-48 imgcard object-cover mb-2" /> */}
          <div className="flex  flex-row justify-center items-center w-full  border-b-2">
            <div className="text-2xl">Indor {props.title}</div>
          </div>
          <div className=" flex flex-row border-b-2 mb-2">
            <div className="w-2/3 pl-2">
              <p className="text-gray-800  text-base my-2">
                Production: {props.production}/Min
              </p>
              <p className="text-gray-800  text-base mb-2">
                Storage: {props.fullSotorage}
              </p>
              <p className="text-gray-800  text-base mb-2">
                Durability: {props.fullDurability} Days
              </p>
            </div>
            <div className="w-1/3 border-l-2 flex justify-center items-center bg-black bg-opacity-20">
              <Image
                src={`/indors/${props.title}.png`}
                alt="Descripción de la imagen"
                // layout="fixed"
                width={500}
                height={499}
                style={{ transform: "rotate(-10deg)" }}
              />
            </div>
          </div>
          <div className="px-6 text-xl flex justify-between items-center mb-2">
            <p>
              Price: {Math.trunc(((props.title + 2) / (5 + props.title)) * 100)}{" "}
              PUPS
            </p>
            <button
              onClick={(e) => handleSubmit(e)}
              className="inline-block  rounded-xl text-xl px-2 py-1 font-bold text-gray-800  border border-white-200 hover:bg-black hover:bg-opacity-70 hover:text-white bg-white bg-opacity-50  "
            >
              Buy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyCard;
