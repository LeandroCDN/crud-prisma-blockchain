import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  //tra todos los registros

  return NextResponse.json("Hello from get");
}

export async function POST(request: Request) {
  console.log("api call login/");

  try {
    let { address, name, assets } = await request.json();
    const balance = 0;
    const newUser = await prisma?.user.create({
      data: {
        address,
        name,
        balance,
        assets,
      },
    });

    return NextResponse.json(newUser);
  } catch (error) {
    console.log("Post Prisma Error: ", error);
    return NextResponse.json(error);
  }
}
