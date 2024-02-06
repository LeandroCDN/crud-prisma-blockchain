import { ethers } from "ethers";
import getUserByAddress from "./get-user";

export default async function getAddress(address, signedMessage) {
  const user = await getUserByAddress(address);
  console.log("user", user);
  if (!user) return null;

  const msg = "hola mundo";
  // console.log(signedMessage);

  const signerAddress = ethers.utils.verifyMessage(msg, signedMessage);
  console.log(signerAddress);

  if (signerAddress.toLowerCase() !== address.toLowerCase()) return null;

  return {
    id: user.address,
  };
}
