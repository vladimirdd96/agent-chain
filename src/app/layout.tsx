import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navigation } from "@/components/layout/Navigation";
import { WalletContextProvider } from "@/components/WalletContextProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AgentChain - Web3 AI Agent Platform",
  description:
    "Deploy and manage AI agents on Solana and EVM chains - The future of decentralized AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black min-h-screen text-white`}>
        <WalletContextProvider>
          <Navigation />
          <main className="pt-20">{children}</main>
        </WalletContextProvider>
      </body>
    </html>
  );
}
