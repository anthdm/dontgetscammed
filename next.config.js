/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    chainId: "0x181cd",
    chainHost: "https://dontgetscammed.network"
  }
}

module.exports = nextConfig
