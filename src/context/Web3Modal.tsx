"use client";

import { createWeb3Modal, defaultConfig } from "@web3modal/ethers5/react";

// 1. Get projectId
const projectId = "f7e865ce875e12010dbe54cf9a03a3a1";

// 2. Set chains
// const mainnet = {
//   chainId: 1,
//   name: "Ethereum",
//   currency: "ETH",
//   explorerUrl: "https://etherscan.io",
//   rpcUrl: "https://cloudflare-eth.com",
// };

const testnet = {
  chainId: 97,
  name: "BSCTest",
  currency: "tBNB",
  explorerUrl: "https://testnet.bscscan.com/",
  rpcUrl: "https://endpoints.omniatech.io/v1/bsc/testnet/public",
};

// 3. Create modal
const metadata = {
  name: "My Website",
  description: "My Website description",
  url: "http://localhost:3000/",
  icons: ["https://avatars.mywebsite.com/"],
};

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  defaultChain: testnet,
  chains: [testnet],
  projectId,
});

export function Web3ModalProvider({ children }) {
  return children;
}
