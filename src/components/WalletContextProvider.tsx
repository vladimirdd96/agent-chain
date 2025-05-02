"use client";

import React, { FC, useMemo, ReactNode, useEffect } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";

// Import CSS using ES module syntax
import "@solana/wallet-adapter-react-ui/styles.css";

interface WalletContextProviderProps {
  children: ReactNode;
}

export const WalletContextProvider: FC<WalletContextProviderProps> = ({
  children,
}) => {
  // Can be set to 'devnet', 'testnet', or 'mainnet-beta'
  const network =
    (process.env.NEXT_PUBLIC_SOLANA_NETWORK as WalletAdapterNetwork) ||
    WalletAdapterNetwork.Mainnet;

  // You can also provide a custom RPC endpoint
  const endpoint = useMemo(
    () => process.env.NEXT_PUBLIC_SOLANA_RPC_ENDPOINT || clusterApiUrl(network),
    [network]
  );

  // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
  // Only the wallets you configure here will be compiled into your application, and only the dependencies
  // of wallets that your users connect to will be loaded.
  const wallets = useMemo(() => {
    // console.log("Initializing wallet adapters for network:", network);
    const adapters = [new PhantomWalletAdapter()];
    // console.log("Created wallet adapters:", adapters);
    return adapters;
  }, [network]);

  // useEffect(() => {
  //   console.log("WalletContextProvider mounted");
  //   console.log("Using endpoint:", endpoint);
  //   console.log("Available wallets:", wallets);
  // }, [endpoint, wallets]);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
