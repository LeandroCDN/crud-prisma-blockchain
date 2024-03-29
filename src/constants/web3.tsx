import ERC20ABI from "@/../abis/ERC20.json";

export const PUBLIC_RPC_URL = process.env.NEXT_PUBLIC_RPC_URL as string;
export const PRIVATE_KEY = process.env.PRIVATE_KEY as string;

export const TOKEN_CONTRACT = {
  address: process.env.NEXT_PUBLIC_TOKEN_ADDRESS as string,
  abi: JSON.parse(ERC20ABI.result),
};

export const TOKEN_BSCTEST_ADDRESS = process.env
  .NEXT_PUBLIC_TOKEN_BSCTEST_ADDRESS as string;

export const SEEDSALE = process.env
  .NEXT_PUBLIC_SEEDCONTRACT_BSCTEST_ADDRESS as string;
