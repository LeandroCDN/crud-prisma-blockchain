import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";
import getAddresFromSing from "@/app/actions/get-address-from-message";

export async function GET() {
  //tra todos los registros

  return NextResponse.json("Hello from get");
}

export async function POST(request: Request) {
  try {
    let { address, name, signedMessage } = await request.json();
    const singer = getAddresFromSing(address, signedMessage);
    if (singer.toString().toLowerCase() !== address.toLowerCase()) return null;

    const balance = 0;
    // address = address.slice(2);
    console.log("POST RAN, data: ", address, name);
    const newUser = await prisma?.user.create({
      data: {
        address,
        balance,
        name,
      },
    });

    return NextResponse.json(newUser);
  } catch (error) {
    console.log("Post Prisma Error: ", error);
    return NextResponse.json(error);
  }
}
