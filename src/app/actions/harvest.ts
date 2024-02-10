import { prisma } from "@/libs/prisma";
import getUser from "./get-user";

export default async function harvest(address: string, index: number) {
  try {
    //get user status
    let user = await getUser(address);
    if (user == null) return null;

    //get info about tool to update
    const toolData = await prisma.asset.findFirst({
      where: {
        level: user?.assets[index].tool,
      },
    });

    if (!toolData) {
      throw new Error(`Herramienta con nivel ${index} no encontrada`);
    }
    const dateNow = new Date();
    //calculate profits

    const lastHarvestTime = new Date(user?.assets[index]?.lastHarvest || 0); // Si lastHarvest es null o undefined, establecerlo a 0
    const difTime = dateNow.getTime() - lastHarvestTime.getTime();
    const difTimeInHours = Math.trunc(difTime / (1000 * 60)); // Convertir milisegundos a horas y truncar
    let totalProduction = toolData.production * difTimeInHours;
    if (totalProduction > toolData.storage) {
      totalProduction = toolData.storage;
    }

    const res = await prisma.user.update({
      where: { address: user.address },
      data: {
        balance: user.balance + totalProduction,
        assets: {
          set: user.assets.map((asset, i) =>
            i === index ? { ...asset, lastHarvest: dateNow } : asset
          ),
        },
      },
    });

    return res;
  } catch (error: any) {
    console.log("get-user.ts error:", error);
    return null;
  }
}
