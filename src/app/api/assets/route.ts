import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    let { level, production, storage, durability } = await request.json();
    // address = address.slice(2);
    console.log("POST RAN, data: ", level, production, storage, durability);
    // const level = "1";
    // const production = 60.0;
    // const storage = 60.0;
    // const durability = 100;
    const newAssets = await prisma?.asset.create({
      data: {
        level,
        production,
        storage,
        durability,
      },
    });

    return NextResponse.json(newAssets);
  } catch (error) {
    console.log("Post Prisma Error: ", error);
    return NextResponse.json(error);
  }
}
