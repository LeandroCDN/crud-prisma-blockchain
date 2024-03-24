import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
// import * as bcrypt from "bcrypt";
import getAddress from "@/app/actions/get-address-from-signature";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

interface RequestBody {
    address: string;
    signedMessage: string;
}

export async function GET(req: Request, { params }: any) {
    //   const body: RequestBody = await req.json();
    const { address } = params;
    try {
        const session = await getServerSession(authOptions);
        console.log("api call withdraw/[address], session.user:", session?.user);
        if (!session?.user) return NextResponse.json({ error: "Session not confirmed." });
        let user = await prisma?.user.findUnique({
            where: {
                address: address,
            },
        });
        return NextResponse.json(user);
    } catch (error) {
        console.log("Post Prisma Error: ", error);
        return NextResponse.json(error);
    }
}
