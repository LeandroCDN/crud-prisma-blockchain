"use client";
import { useLoading } from "../../context/loadingContext";
import SimpleBoxCard from "@/components/SimpleBoxCard";
import { useEffect } from "react";
import { useWeb3ModalAccount } from "@web3modal/ethers5/react";

const Tools = () => {
  const { userData, tools, setTools } = useLoading();
  const { isConnected } = useWeb3ModalAccount();

  useEffect(() => {
    // console.log(tools);
    if (tools == null) {
      setTools(getTools());
    }
  }, [isConnected]);

  const getTools = async () => {
    try {
      let res = await fetch(`/api/assets`, {
        method: "GET",
      });
      let data = await res.json();
      setTools(data);
    } catch (error) {
      console.error("Login Error: ", error);
    }
  };

  return (
    <div className="flex flex-row justify-center items-center mt-10">
      <div className="grid xl:grid-cols-3 sm:grid-cols-2 gap-4 min-h-screen">
        {userData?.assets?.map((asset, index) => (
          <SimpleBoxCard
            key={index} // Asegúrate de proporcionar una clave única para cada tarjeta
            i={index}
            title={`Pico LVL ${asset.tool}`}
            production={tools[asset.tool]?.production}
            storage="DifTime"
            fullSotorage={tools[asset.tool]?.storage}
            state="difTime"
            fullDurability={tools[asset.tool]?.durability}
            // Ajusta las propiedades según las necesidades de tu aplicación y los datos en la matriz
          />
        ))}
      </div>
    </div>
  );
};
export default Tools;
