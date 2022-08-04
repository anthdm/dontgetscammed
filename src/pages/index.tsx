import type { NextPage } from "next"
import { ethers } from "ethers"
import { useEffect, useState } from "react"
import useMetaMask from "../hooks/useMetaMask"

const Home: NextPage = () => {
  const { connect, isConnected, hasMetaMask } = useMetaMask()

  useEffect(() => {
    if (!isConnected) {
      console.log("dong")
      connect()
    }
  })

  if (!hasMetaMask) {
    return (
      <div className="text-purple-500">
        Please install metamask to continue this adventure
      </div>
    )
  }

  if (!isConnected) {
    return <button onClick={connect}>hello</button>
  }

  return <div className="font-bold">Let's get started</div>
}

export default Home
