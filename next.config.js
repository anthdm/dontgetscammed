/** @type {import('next').NextConfig} */

const localNetwork = "http://localhost:8545"
const dgsNetwork = "https://dontgetscammed.network"

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    chainId: "0x181cd",
    rpcURL: process.env.NODE_ENV === "development" ? localNetwork : dgsNetwork
  }
}

module.exports = nextConfig
