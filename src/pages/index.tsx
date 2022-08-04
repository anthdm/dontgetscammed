import type { NextPage } from "next";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import useMetaMask from "../hooks/useMetamask";

const Home: NextPage = () => {
  const { connect, isConnected, hasMetaMask } = useMetaMask();

  useEffect(() => {
    if (!isConnected) {
      connect();
    }
  });

  if (!hasMetaMask) {
    return <div>Please install metamask to continue this adventure</div>;
  }

  if (!isConnected) {
    return <button onClick={connect}>hello</button>;
  }

  return <div>Let's get started</div>;
};

export default Home;
