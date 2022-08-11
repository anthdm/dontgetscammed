import "../styles/globals.css"
import type { AppProps } from "next/app"
import Layout from "components/Layout"
import { EthereumProvider } from "hooks/useEthereum"
import { NextSeo } from "next-seo"
import Script from "next/script"
import Head from "next/head"

function MyApp({ Component, pageProps }: AppProps) {
  const tagManagerArgs = {
    gtmId: "G-MDNK0T4LHK"
  }

  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-MDNK0T4LHK"
        strategy="afterInteractive"
      />
      <Script id="gtm" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-MDNK0T4LHK');
        `}
      </Script>
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
