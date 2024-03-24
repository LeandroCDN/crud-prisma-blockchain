import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { PUBLIC_RPC_URL, TOKEN_CONTRACT } from "@/constants/web3";
import { ethers, providers } from "ethers";

async function getTransactionArguments(transactionHash: string): Promise<any> {
  try {
    const provider = new providers.WebSocketProvider(
      "wss://bsc-testnet.publicnode.com"
    );

    const tx = await provider.getTransaction(transactionHash);

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

    return transactionData;

    //how to return : {function_name: decodedInput.name,  from: tx.from, to: decodedInput.args[0] //normalized in ether unit,  erc20Value: Number(decodedInput.args[1]),}
  } catch (error) {
    console.error("Error getting transaction arguments:", error);
    throw error;
  }
}

export async function POST(req: Request, { params }: any) {
  console.log("api call deposit/[address...");

  try {
    const { address, hash } = params;

    const transactionData = await getTransactionArguments(hash);

    const user = await prisma.user.findUnique({
      where: {
        address: address,
      },
    });

    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    if (transactionData.from !== user?.address) {
      NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    // if (transactionData.from != user?.address) return null;

    // if (!user) return null;
    const updatedBalance = user.balance + transactionData.erc20Value; // here must go arguments erc20Value;

    const updatedRecord = await prisma.user.update({
      where: { address: address },
      data: { balance: updatedBalance },
    });

    return NextResponse.json(updatedRecord);
  } catch (error: any) {
    console.log("deposit.ts error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
