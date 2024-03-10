import Image from "next/image";
import ModalSwap from "./ModalSwap";
import Description from "./Description";

const PreSalePage = () => {
  return (
    <section>
      <div className="flex flex-row justify-center bg-gradient-to-r to-yellow-500 from-red-500 mt-10">
        <div className="h-[calc(100vh-150px)] flex justify-center items-center w-1/2 ">
          <ModalSwap />
        </div>

        <div className="w-1/2  flex flex-col items-center justify-center max-h-[calc(100vh-150px)]">
          <Image
            src="/indors/0.png"
            alt="Descripción de la imagen"
            layout="fixed"
            width={600}
            height={498}
            className="opacity-20 fixed z-0"
          />
          <div className="z-10 w-9/12">
            <Description />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreSalePage;
