import {
  useWallet as useSolanaWallet,
  WalletNotSelectedError,
} from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useCallback } from "react";

export const useWallet = () => {
  const {
    connected,
    connecting,
    publicKey,
    select,
    disconnect,
    wallets,
    wallet,
    connect: solanaConnect,
  } = useSolanaWallet();

  const { visible, setVisible } = useWalletModal();

  const connect = useCallback(async () => {
    if (connected) {
      return;
    }

    try {
      if (!wallet) {
        const phantomWallet = wallets.find((w) => w.adapter.name === "Phantom");
        if (phantomWallet) {
          select(phantomWallet.adapter.name);
          setVisible(true);
        } else {
          console.error("Phantom wallet adapter not found.");
          throw new Error("Phantom wallet not found. Please install Phantom.");
        }
      } else {
        if (!visible) {
          setVisible(true);
        }
      }
    } catch (error) {
      if (error instanceof WalletNotSelectedError) {
      } else {
        console.error("Error during wallet connection process:", error);
        throw error;
      }
    }
  }, [
    wallet,
    connected,
    connecting,
    wallets,
    select,
    solanaConnect,
    visible,
    setVisible,
  ]);

  return {
    connected,
    connecting,
    publicKey: publicKey?.toString() || null,
    connect,
    disconnect,
  };
};
