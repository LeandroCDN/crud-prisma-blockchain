"use client";
import { createContext, useContext, useState } from "react";
interface LoadingContextType {
  userData: string;
  setUserData: React.Dispatch<React.SetStateAction<string>>;
  tools: any; // Ajusta el tipo según el tipo real de 'tools'
  setTools: React.Dispatch<React.SetStateAction<any>>; // Ajusta el tipo según el tipo real de 'tools'
}

export const LoadingContext = createContext<LoadingContextType | undefined>(
  undefined
);

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }: any) => {
  const [userData, setUserData] = useState("");
  const [tools, setTools] = useState(null);

  return (
    <LoadingContext.Provider value={{ userData, setUserData, tools, setTools }}>
      {children}
    </LoadingContext.Provider>
  );
};
