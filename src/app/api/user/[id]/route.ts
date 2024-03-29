import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: any, { params }: any) {
  console.log("api call login/[id]");

  try {
    const { id } = params;

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
