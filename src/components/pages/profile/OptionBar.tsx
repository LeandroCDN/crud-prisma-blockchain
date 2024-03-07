import React, { useState } from "react";

const OptionBar = ({ onSelectOption }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onSelectOption(option); // Pasa la opción seleccionada al componente principal
  };

  return (
    <div className="w-full h-full bg-black rounded-lg">
      <div className="flex flex-col p-2 gap-3">
        <button onClick={() => handleOptionClick("UserProfile")}>
          UserProfile
        </button>
        <button onClick={() => handleOptionClick("WalletConfig")}>
          WalletConfig
        </button>
        <button onClick={() => handleOptionClick("DepositHistory")}>
          DepositHistory
        </button>
        <button onClick={() => handleOptionClick("Refers")}>Refers</button>
      </div>
    </div>
  );
};

export default OptionBar;
