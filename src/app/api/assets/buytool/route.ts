import buyTool from "@/app/actions/buy-tool";
import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  console.log("api call assets/buytool");

  try {
    const session = await getServerSession(authOptions);
    console.log("api call withdraw/[address], session.user:", session?.user);
    if (!session?.user) return NextResponse.json({ error: "Session not confirmed." });
    let { address, lvl } = await request.json();

    console.log("POST: assets/lvl RAN. data: ", address, lvl);
    const res = await buyTool(address, lvl);


    return NextResponse.json(res);
  } catch (error) {
    console.log("Post Prisma Error: ", error);
    return NextResponse.json(error);
  }
}
