/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    chainId: "0x181cd",
    pk: "0x1dfd35d2418426f6a6abbe71b8cae12a24164446735539b790f870654327c1bf"
  }
}

module.exports = nextConfig
