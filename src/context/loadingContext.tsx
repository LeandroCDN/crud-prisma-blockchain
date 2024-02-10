"use client";
import { createContext, useContext, useState } from "react";

export const LoadingContext = createContext();

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }) => {
  const [userData, setUserData] = useState("");
  const [tools, setTools] = useState("");

  return (
    <LoadingContext.Provider value={{ userData, setUserData, tools, setTools }}>
      {children}
    </LoadingContext.Provider>
  );
};
