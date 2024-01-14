"use client";
import { useState } from "react";
import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
} from "@web3modal/ethers5/react";

function LoginForm() {
  const [name, setName] = useState("");

  // web3modal (isConnected)? enableform : disableForm
  const { address, isConnected } = useWeb3ModalAccount();

  return isConnected ? (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const res = await fetch("/api/login", {
          method: "POST",
          body: JSON.stringify({
            address,
            name,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        console.log(data);
      }}
    >
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
