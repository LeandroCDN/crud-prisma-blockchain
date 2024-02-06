import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";
import getAddresFromSing from "@/app/actions/get-address-from-message";

export async function GET(request, { params }) {
  try {
    const { id, signedMessage } = params;
    console.log(signedMessage);
    const singer = await getAddresFromSing(id, signedMessage);

    console.log("Signer:", singer);
    console.log("id:", id.toLowerCase());
    console.log(
      "status:",
      singer.toString().toLowerCase() !== id.toLowerCase()
    );

    // if (!singer.toString().toLowerCase() !== id.toLowerCase()) return null;

    const userData = await prisma?.user.findUnique({
      where: {
        address: id,
      },
    });
    return NextResponse.json(userData);
  } catch (error) {
    console.log("Post Prisma Error: ", error);
    return NextResponse.json(error);
  }
}
