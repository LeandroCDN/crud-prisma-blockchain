import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  //tra todos los registros

  return NextResponse.json("Hello from get");
}

export async function POST(request: Request) {
  try {
    let { address, name } = await request.json();
    // address = address.slice(2);
    console.log("POST RAN, data: ", address, name);
    const newUser = await prisma?.user.create({
      data: {
        address,
        name,
      },
    });

    return NextResponse.json(newUser);
  } catch (error) {
    console.log("Post Prisma Error: ", error);
    return NextResponse.json(error);
  }
}
