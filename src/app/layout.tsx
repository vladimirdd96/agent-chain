import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navigation } from "@/components/layout/Navigation";
import { WalletContextProvider } from "@/components/WalletContextProvider";
import { ToastProvider } from "@/components/providers/ToastProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MindMint - Web3 AI Agent Platform",
  description: "Deploy and manage AI agents on Solana and EVM chains",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black min-h-screen text-white`}>
        <ToastProvider>
          <WalletContextProvider>
            <Navigation />
            <main className="pt-20">{children}</main>
          </WalletContextProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
