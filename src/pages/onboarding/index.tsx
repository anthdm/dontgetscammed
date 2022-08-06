import React, { useEffect } from "react"
import Button from "components/Button"
import { NextPage } from "next"
import MetaMaskOnboarding from "@metamask/onboarding"
import useMetaMask from "hooks/useMetaMask"

const Onboarding: NextPage = () => {
  const { isConnected, walletInstalled, connectWallet, account } = useMetaMask()
  return (
    <>
      {isConnected && <div>connected! {account}</div>}
      {walletInstalled && !isConnected && (
        <div>
          <Button onClick={connectWallet}>connect</Button>
        </div>
      )}
      {!walletInstalled && <div>install please</div>}
    </>
  )
}

export default Onboarding
