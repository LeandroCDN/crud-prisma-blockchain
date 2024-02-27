import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
// import * as bcrypt from "bcrypt";
import getAddress from "@/app/actions/get-address-from-signature";

interface RequestBody {
  address: string;
  signedMessage: string;
}

export async function POST(req: Request) {
  const body: RequestBody = await req.json();

  try {
    let user = await prisma?.user.findUnique({
      where: {
        address: body.address,
      },
    });
    // console.log(user);
    if (user === null) {
      await fetch("http://localhost:3000/api/user", {
        method: "POST",
        body: JSON.stringify({
          address: body.address,
          name: "null",
          assets: []
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      user = await prisma?.user.findUnique({
        where: {
          address: body.address,
        },
      });
    }
    const addresFromMessage = await getAddress(
      user?.address,
      body.signedMessage
    );
    if (addresFromMessage != null) {
      return NextResponse.json(user);
    } else return null;
  } catch (error) {
    console.log("Post Prisma Error: ", error);
    return NextResponse.json(error);
  }
}
