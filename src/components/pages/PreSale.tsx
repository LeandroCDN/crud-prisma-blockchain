import Image from "next/image";

const PreSale = () => {
  return (
    <section>
      <div className="flex flex-row justify-center items-center h-[calc(100vh-150px)] mt-10">
        <div className="w-1/2 flex flex-row justify-center items-center ">
          <div className="  text-white px-2  rounded-xl border border-yellow-500 bg-white bg-opacity-15 w-96  ">
            <div className="flex flex-row justify-between mt-1">
              <div className="flex">
                <span className=" text-white">1 Point: 0.01 usd</span>
              </div>
              <div className="flex">
                <span className=" text-white">1 usd: 100 points</span>
              </div>
            </div>
            <form>
              <div className="flex flex-col bg-black rounded-lg">
                <div className="flex flex-row justify-between px-2">
                  <div className="flex">
                    <span className=" text-white">You pay</span>
                  </div>
                  <div className="flex">
                    <span className=" text-white">Balance</span>
                  </div>
                </div>

                <input
                  type="text"
                  name="name"
                  autoFocus
                  placeholder="0"
                  className="w-full px-4 text-black bg-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 my-2"
                />
              </div>
              <div className="flex flex-col bg-black rounded-lg mt-2">
                <div className="flex flex-row justify-between px-2">
                  <div className="flex">
                    <span className=" text-white">You recive</span>
                  </div>
                  <div className="flex">
                    <span className=" text-white">Your points: 90500</span>
                  </div>
                </div>

                <input
                  type="text"
                  name="name"
                  autoFocus
                  placeholder="0"
                  className="w-full px-4 text-black bg-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 my-2"
                />
              </div>

              <div className="flex flex-row items-end justify-center w-full my-2">
                <button className="rounded p-1 text-white border bg-yellow-400 w-full border-black border-opacity-10 hover:border-opacity-20 hover:shadow-md transition duration-300">
                  Connect Wallet
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="w-1/2 flex items-center justify-center">
          <Image
            src="/indor.png"
            alt="Descripción de la imagen"
            layout="fixed"
            width={600}
            height={498}
          />
        </div>
      </div>
    </section>
  );
};

export default PreSale;
