import harvest from "@/app/actions/harvest";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  console.log("api call assets/harvest");

  try {
    let { address, index } = await request.json();
    // address = address.slice(2);
    console.log("POST: assets/index RAN. data: ", address, index);
    const res = await harvest(address, index);

    return NextResponse.json(res);
  } catch (error) {
    console.log("Post Prisma Error: ", error);
    return NextResponse.json(error);
  }
}
