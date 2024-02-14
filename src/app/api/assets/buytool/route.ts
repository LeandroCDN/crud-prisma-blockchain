import buyTool from "@/app/actions/buy-tool";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  console.log("api call assets/buytool");

  try {
    let { address, lvl } = await request.json();
    // address = address.slice(2);
    console.log("POST: assets/lvl RAN. data: ", address, lvl);
    const res = await buyTool(address, lvl);

    return NextResponse.json(res);
  } catch (error) {
    console.log("Post Prisma Error: ", error);
    return NextResponse.json(error);
  }
}
