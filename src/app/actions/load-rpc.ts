import { PUBLIC_RPC_URL, TOKEN_CONTRACT, PRIVATE_KEY } from "@/constants/web3";
import { ethers } from "ethers";

export const rpc = () => {
  const provider = new ethers.providers.JsonRpcProvider(PUBLIC_RPC_URL);
  console.log(PRIVATE_KEY); // output: undefined
  console.log(PUBLIC_RPC_URL); //output: "https://..."
  const walletWithdraw = new ethers.Wallet(PRIVATE_KEY, provider);
  const signerWithdraw = walletWithdraw.connect(provider);

  const USDTContract = new ethers.Contract(
    TOKEN_CONTRACT.address,
    TOKEN_CONTRACT.abi,
    signerWithdraw
  );
  const gasLimit = 200000;
  return { provider, USDTContract, gasLimit };
};
