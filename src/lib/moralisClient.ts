import Moralis from "moralis";

const moralisApiKey = process.env.NEXT_PUBLIC_MORALIS_API_KEY;

if (!moralisApiKey) {
  throw new Error("Missing Moralis API Key in environment variables");
}

// Initialize Moralis
if (typeof window !== "undefined" && !Moralis.Core.isStarted) {
  // Ensure Moralis starts only once and client-side
  Moralis.start({
    apiKey: moralisApiKey,
  });
}

export { Moralis }; // Export the initialized Moralis instance
