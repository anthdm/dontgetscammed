import "../styles/globals.css"
import type { AppProps } from "next/app"
import Layout from "components/Layout"
import { EthereumProvider } from "hooks/useEthereum"
import { NextSeo } from "next-seo"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextSeo
        title="Don't get scammed!"
        description="An educational and interactive platform interacting with cryptocurrencies"
      />
      <EthereumProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </EthereumProvider>
    </>
  )
}

export default MyApp
