/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    chainId: "0x181cd",
    rpcURL: "https://dontgetscammed.network"
  }
}

module.exports = nextConfig
