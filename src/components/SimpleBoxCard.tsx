import React from "react";

const SimpleBoxCard = (props: any) => {
  return (
    <div>
      <div className="flex flex-col xl:flex-row items-center justify-center w-full xl:items-stretch my-4">
        <div className="flex-col xl:max-w-[70%] max-w-[90%]  shadow-lg rounded-xl border border-radius mb-5 xl:mb-0 min-w-80">
          {/* <img src="https://i.postimg.cc/SxLx0fHV/bg01.jpg" alt="image3" className="w-full h-48 imgcard object-cover mb-2" /> */}
          <div className="px-5 py-3">
            <div className="flex flex-row justify-between w-full">
              <div className={` text-xl mb-2 }`}>{props.title}</div>
              <p> 1 year </p>
            </div>
            <p className="text-gray-700  text-base mb-2">
              Procution: {props.production}/Min
            </p>
            <p className="text-gray-700  text-base">
              Storage: {props.storage}/{props.fullSotorage}
            </p>
            <p className="text-gray-700  text-base">
              Durability: {props.state}/{props.fullDurability} Days
            </p>
          </div>
          <div className="px-6 mt-4">
            <span className="inline-block bg-gray-200 rounded-full px-2 py-1 text-sm font-bold text-gray-700 mr-2 mb-2 border border-white-200 bg-white bg-opacity-50">
              Harvest
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-2 py-1 text-sm font-bold text-gray-700 mr-2 mb-2 border border-white-200 bg-white bg-opacity-50">
              Update
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-2 py-1 text-sm font-bold text-gray-700 mr-2 mb-2 border border-white-200 bg-white bg-opacity-50">
              Repair
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleBoxCard;