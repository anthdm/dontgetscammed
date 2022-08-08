import React from "react"
import Button from "components/Button"
import useEthereum from "hooks/useEthereum"

const ConnectButton: React.FC = () => {
  const { connect, account, disconnect } = useEthereum()
  const buttonAction = account ? disconnect : connect
  const buttonText = account ? "Disconnect" : "Connect"
  return (
    <Button
      onClick={buttonAction}
      className="bg-transparent border border-muted hover:bg-transparent hover:border-blue-500"
    >
      {buttonText}
    </Button>
  )
}

export default ConnectButton
