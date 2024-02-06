import { prisma } from "@/libs/prisma";

export default async function getUser(address: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        address: address,
      },
    });
    return user;
  } catch (error: any) {
    console.log("get-user.ts error:", error);
    return null;
  }
}
