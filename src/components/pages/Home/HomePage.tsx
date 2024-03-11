"use client";
import Image from "next/image";
// import MiddleSection from "./MiddleSection";
import { useState, useEffect } from "react";
const HomePage = () => {
  const [imageNumber, setImageNumber] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Cambiar el número de la imagen de 0 a 5 y viceversa en un bucle
      setImageNumber((prevNumber) => (prevNumber + 1) % 6);
    }, 1000);

    // Limpiar el intervalo cuando el componente se desmonta
    return () => clearInterval(interval);
  }, []);

  return (
    <section>
      <div className="flex flex-row justify-center h-[calc(100vh-150px)] bg-gradient-to-r to-yellow-500 from-red-500 mt-10">
        <div className="flex justify-center items-center w-1/2  ">
          <div>
            <h3 className="text-5xl text-black font-extrabold">
              THE GAME WHERE YOU PAY
            </h3>
            <h3 className="text-5xl text-black flex justify-center font-extrabold">
              TO BE SCAMMED
            </h3>

            <div className="flex justify-evenly mt-6">
              <button className="rounded px-4 py-2   text-xl text-white border  border-yellow-500 border-opacity-30 hover:border-opacity-70 hover:shadow-md transition duration-300">
                Learn More
              </button>
              <button className="rounded px-4 py-2 text-xl text-white border  border-yellow-500 border-opacity-70 hover:border-opacity-30 hover:shadow-md transition duration-300">
                Play Now
              </button>
            </div>
          </div>
        </div>
        <div className="w-1/2 flex flex-col items-center justify-center overflow-hidden">
          <Image
            src={`/indors/${imageNumber}.png`}
            alt="Descripción de la imagen"
            layout="fixed"
            width={1000}
            height={998}
            style={{ transform: "rotate(-10deg)" }}
          />
        </div>
      </div>
    </section>
  );
};

export default HomePage;
