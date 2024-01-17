"use client";
import { createContext, useContext, useState } from "react";

export const LoadingContext = createContext();

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }) => {
  const [userData, setUserData] = useState("");

  return (
    <LoadingContext.Provider value={{ userData, setUserData }}>
      {children}
    </LoadingContext.Provider>
  );
};
