import { signIn } from "next-auth/react";
import { NextResponse } from "next/server";

export const authUser = async (address, signedMessage) => {
  return await signIn("web3", {
    address,
    signedMessage,
    redirect: false,
  });
};

export function handleResponse(data?: string | object, code?: number) {
  const resOptions = { status: code };
  if (typeof data === "string") return new Response(data, resOptions);
  if (typeof data === "object") return NextResponse.json(data, resOptions);
  return NextResponse.error();
}

export function handleRedirect(url: string, base?: string | URL) {
  return NextResponse.redirect(new URL(url, base));
}
