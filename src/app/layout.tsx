import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Web3ModalProvider } from "@/context/Web3Modal";
import Nav from "@/components/Nav";
import { LoadingProvider } from "@/context/loadingContext";

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
      <body className="bg-slate-500">
        <LoadingProvider>
          <div>
            <Web3ModalProvider>
              <Nav />
            </Web3ModalProvider>
            <div>{children}</div>
          </div>
        </LoadingProvider>
      </body>
    </html>
  );
}
