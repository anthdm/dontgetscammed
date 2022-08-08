import "../styles/globals.css"
import type { AppProps } from "next/app"
import Layout from "components/Layout"
import { EthereumProvider } from "hooks/useEthereum"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <EthereumProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </EthereumProvider>
  )
}

export default MyApp
