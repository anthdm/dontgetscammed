import "../styles/globals.css"
import type { AppProps } from "next/app"
import Layout from "components/Layout"
import { EthereumProvider } from "hooks/useEthereum"
import { NextSeo } from "next-seo"
import Script from "next/script"

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
      <Script src="https://scripts.simpleanalyticscdn.com/latest.js" />
      <noscript>
        {/* eslint-disable @next/next/no-img-element */}
        <img
          src="https://queue.simpleanalyticscdn.com/noscript.gif"
          alt=""
          referrerPolicy="no-referrer-when-downgrade"
        />
      </noscript>
    </>
  )
}

export default MyApp
