import Moralis from "moralis";

let isInitialized = false;

export const initMoralis = async () => {
  if (!isInitialized) {
    await Moralis.start({
      apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY,
    });
    isInitialized = true;
  }
};

export const moralis = Moralis;
