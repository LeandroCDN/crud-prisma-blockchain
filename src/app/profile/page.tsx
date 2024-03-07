"use client";
import UserProfile from "@/components/pages/profile/UserProfile";
import OptionBar from "@/components/pages/profile/OptionBar";
import React, { useState } from "react";
import WalletConfig from "@/components/pages/profile/WalletConfig";
import DepositHistory from "@/components/pages/profile/DepositHistory";
import Refers from "@/components/pages/profile/Refers";

const Profile = ({ params }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelectOption = (option) => {
    setSelectedOption(option);
  };
  return (
    <div className="flex flex-col lg:flex-row max-h-[calc(100vh-62px)] gap-4 mx-4 mt-10 ">
      <div className="lg:w-1/4">
        <OptionBar onSelectOption={handleSelectOption} />
      </div>

      <div className="lg:w-3/4">
        {selectedOption === "UserProfile" && <UserProfile />}
        {selectedOption === "WalletConfig" && <WalletConfig />}
        {selectedOption === "DepositHistory" && <DepositHistory />}
        {selectedOption === "Refers" && <Refers />}
        {/* Agrega más condicionales para otros paneles */}
      </div>
    </div>
  );
};

export default Profile;
