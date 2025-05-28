/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }

    // Handle Solana wallet adapters
    config.externals = config.externals || [];
    config.externals.push({
      bufferutil: "bufferutil",
      "utf-8-validate": "utf-8-validate",
    });

    return config;
  },
  experimental: {
    serverComponentsExternalPackages: [
      "@solana/wallet-adapter-base",
      "@solana/wallet-adapter-phantom",
      "@solana/wallet-adapter-react",
      "@solana/wallet-adapter-react-ui",
      "@solana/web3.js",
    ],
  },
};

module.exports = nextConfig;
