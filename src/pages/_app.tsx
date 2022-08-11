import "../styles/globals.css"
import type { AppProps } from "next/app"
import Layout from "components/Layout"
import { EthereumProvider } from "hooks/useEthereum"
import { NextSeo } from "next-seo"
import TagManager from "react-gtm-module"
import { useEffect } from "react"

function MyApp({ Component, pageProps }: AppProps) {
  const tagManagerArgs = {
    gtmId: "G-MDNK0T4LHK"
  }

  useEffect(() => {
    TagManager.initialize(tagManagerArgs)
  }, [])

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
