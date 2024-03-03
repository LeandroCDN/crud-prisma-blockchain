import Image from "next/image";

const HomePage = () => {
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
            src="/indors/Pink.png"
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
