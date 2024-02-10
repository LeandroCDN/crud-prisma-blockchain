"use client";
import { useState } from "react";
import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
} from "@web3modal/ethers5/react";
import { useRouter } from "next/navigation";
import { useLoading } from "../context/loadingContext";

function LoginForm() {
  const [name, setName] = useState("");
  const route = useRouter();
  // web3modal (isConnected)? enableform : disableForm
  const { address, isConnected } = useWeb3ModalAccount();
  const { userData, setUserData } = useLoading();

  const login = async (e) => {
    e.preventDefault();

    try {
      let res = await fetch(`/api/login/${address}`, {
        method: "GET",
      });
      let data = await res.json();
      if (data == null) {
        res = await fetch("/api/login", {
          method: "POST",
          body: JSON.stringify({
            address,
            name,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        data = await res.json();
      }
      route.push(`/dashboard/${address}`);
      setUserData(data);
    } catch (error) {
      console.error("Login Error: ", error);
    }
  };

  return isConnected ? (
    <form onSubmit={login}>
      <input
        type="text"
        name="name"
        autoFocus
        placeholder="Your Name"
        className="w-full px-4 py-2 text-black bg-whte rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 my-2"
        onChange={(e) => setName(e.target.value)}
      />
      <button className="px-5 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
        Create
      </button>
    </form>
  ) : (
    <p> connect your wallet </p>
  );
}
export default LoginForm;
