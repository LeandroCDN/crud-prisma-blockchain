import { ethers } from "ethers";
import getUserByAddress from "./get-user";

export default async function getAddress(address: any, signedMessage: any) {
  const user = await getUserByAddress(address);

  if (!user) return null;

  const msg = "hola mundo";

  const signerAddress = ethers.utils.verifyMessage(msg, signedMessage);

  if (signerAddress.toLowerCase() !== address.toLowerCase()) return null;

  return {
    id: user.address,
  };
}
