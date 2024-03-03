import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Web3ModalProvider } from "@/context/Web3Modal";
import Nav from "@/components/Nav";
import { LoadingProvider } from "@/context/loadingContext";
import Session from "@/components/layout/session";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-r to-yellow-500 from-red-500">
        <Session>
          <LoadingProvider>
            <Web3ModalProvider>
              <div className="flex flex-col ">
                <Nav />
                <div>{children}</div>
              </div>
            </Web3ModalProvider>
          </LoadingProvider>
        </Session>
      </body>
    </html>
  );
}
