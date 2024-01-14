import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json("Hello from get");
}
export async function POST(request: Request) {
  try {
    const { address, name } = await request.json();
    console.log("POST RAN, data: ", address, name);
    const newUser = await prisma?.user.create({
      data: {
        address,
        name,
      },
    });

    return NextResponse.json(newUser);
  } catch (error) {
    return NextResponse.json(error);
  }
}
