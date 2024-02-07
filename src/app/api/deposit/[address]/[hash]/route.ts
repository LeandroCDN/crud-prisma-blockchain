import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";
import { PUBLIC_RPC_URL, TOKEN_CONTRACT } from "@/constants/web3";
import { ethers, providers } from "ethers";

async function getTransactionArguments(transactionHash: string): Promise<any> {
  // console.log("public rpc:", PUBLIC_RPC_URL);
  try {
    const provider = new providers.WebSocketProvider(
      "wss://bsc-testnet.publicnode.com"
    );

    const tx = await provider.getTransaction(transactionHash);
    // console.log("transaction:", tx);
    const inter = new ethers.utils.Interface(TOKEN_CONTRACT.abi);
    const decodedInput = inter.parseTransaction({
      data: tx.data,
      value: tx.value,
    });
    const transactionData = {
      function_name: decodedInput.name,
      from: tx.from,
      to: decodedInput.args[0],
      erc20Value: Number(decodedInput.args[1]),
    };
    // console.log(transactionData);
    return transactionData;

    //how to return : {function_name: decodedInput.name,  from: tx.from, to: decodedInput.args[0] //normalized in ether unit,  erc20Value: Number(decodedInput.args[1]),}
  } catch (error) {
    console.error("Error getting transaction arguments:", error);
    throw error;
  }
}

export async function POST(req: Request, { params }) {
  console.log("deposit RUN");
  try {
    const { address, hash } = params;

    const transactionData = await getTransactionArguments(hash);
    console.log(transactionData);
    // console.log(transactionData.tx.from);
    console.log("Find User, address: hash: ", address, hash);
    const user = await prisma.user.findUnique({
      where: {
        address: address,
      },
    });
    if (transactionData.from != user?.address) return null;
    console.log("user", user);
    if (!user) return null;
    const updatedBalance = user.balance + transactionData.erc20Value; // here must go arguments erc20Value;
    console.log("Updating balance");
    const updatedRecord = await prisma.user.update({
      where: { address: address },
      data: { balance: updatedBalance },
    });
    console.log("Deposit succefull");
    return NextResponse.json(updatedRecord);
  } catch (error: any) {
    console.log("deposit.ts error:", error);
    return null;
  }
}