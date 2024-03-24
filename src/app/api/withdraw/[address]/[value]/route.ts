import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { PUBLIC_RPC_URL, TOKEN_CONTRACT, PRIVATE_KEY } from "@/constants/web3";
import { ethers, providers } from "ethers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

async function withdraw(address: any, value: any) {
  const provider = new providers.WebSocketProvider(
    "wss://bsc-testnet.publicnode.com"
  );
  const walletWithdraw = new ethers.Wallet(PRIVATE_KEY, provider);
  const signerWithdraw = walletWithdraw.connect(provider);

  const USDTContract = new ethers.Contract(
    TOKEN_CONTRACT.address,
    TOKEN_CONTRACT.abi,
    signerWithdraw
  );
  const gasLimit = 200000;

  const USDTBalance = await USDTContract.transfer(address, value.toString(), {
    gasLimit,
  });
  const rs = await USDTBalance.wait();
  // console.log(rs.transactionHash);
  return rs;
}

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
  } catch (error) {
    console.error("Error getting transaction arguments:", error);
    throw error;
  }
}

export async function POST(req: Request, { params }: any) {
  console.log("api call withdraw/[address]");
  try {
    const session = await getServerSession(authOptions);
    console.log("api call withdraw/[address], session.user:", session?.user);
    if (!session?.user) return NextResponse.json({ error: "Session not confirmed." });
    const { address, value } = params;
    let { signedMessage } = await req.json();
    const user = await prisma.user.findUnique({
      where: {
        address: address,
      },
    });
    if (!user) return NextResponse.json({ error: "user not confirmed." });
    if (user.balance < value) return NextResponse.json({ error: "user.balance < value" });
    // substract the balance in dbb of user
    const updatedRecord = await prisma.user.update({
      where: { address: address },
      data: { balance: user.balance - value },
    });
    // make transfer
    console.log("transfer RUN");
    const rs = await withdraw(user.address, value);
    if (rs != null) {
      const transactionData = await getTransactionArguments(rs.transactionHash);
      return NextResponse.json({ transactionData, updatedRecord });
    } else {
      return NextResponse.json({ error: "Transaction not confirmed." }); // Handle the case when the transaction is not confirmed
    }
  } catch (error) {
    console.log("Post Prisma Error: ", error);
    return NextResponse.json(error);
  }
}
