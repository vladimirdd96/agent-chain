import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Navigation } from "@/components/layout/Navigation";
import { WalletContextProvider } from "@/components/WalletContextProvider";
import { ToastProvider } from "@/components/providers/ToastProvider";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-montserrat",
});

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
      <body
        className={`${montserrat.variable} font-sans bg-black min-h-screen text-white`}
      >
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
