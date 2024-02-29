import Image from "next/image";
import ModalSwap from "./ModalSwap";
import Description from "./Description";

const PreSale = () => {
  return (
    <section>
      <div className="flex flex-row justify-center items-center h-[calc(100vh-150px)] mt-10 overflow-auto">
        <div className="w-1/2 flex flex-row justify-center items-center ">
          <ModalSwap />
        </div>

        <div className="w-1/2 flex items-center justify-center">
          <Description />
          <Image
            src="/indor.png"
            alt="Descripción de la imagen"
            layout="fixed"
            width={600}
            height={498}
            className="opacity-20 fixed "
          />
        </div>
      </div>
    </section>
  );
};

export default PreSale;
