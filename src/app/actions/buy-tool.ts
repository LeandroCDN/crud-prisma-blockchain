import { prisma } from "@/libs/prisma";
import getUser from "./get-user";

export default async function buyTool(address: string, lvl: number) {
  try {
    let user = await getUser(address);
    const price = Math.trunc(((lvl + 2) / (5 + lvl)) * 100);
    if (user?.balance == undefined || user?.balance < price) return null;

    const toolToBuy = await prisma.asset.findFirst({
      where: {
        level: lvl,
      },
    });

    if (!toolToBuy) {
      throw new Error(`Herramienta con nivel ${lvl} no encontrada`);
    }
    const dateNow = new Date();
    const newAsset = {
      tool: toolToBuy.level,
      lastHarvest: new Date(), // Puedes inicializar lastHarvest según tus requisitos.
      CreatedAt: new Date(),
    };
    user?.assets.push(newAsset);

    const res = await prisma.user.update({
      where: { address: user?.address },
      data: {
        balance: user.balance - price,
        assets: user?.assets,
      },
    });

    return res;
  } catch (error: any) {
    console.log("get-user.ts error:", error);
    return null;
  }
}
