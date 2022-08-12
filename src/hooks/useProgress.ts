import { useEffect, useState } from "react"
import useEthereum from "./useEthereum"
import CryptoJs from "crypto-js"

interface UseProgressData {
  saveProgress: (address: string, step: number, points: number) => void
  getProgress: (address: string) => void
  progress: State
}

interface State {
  step: number
  points: number
}

const useProgress = (secretKey: string): UseProgressData => {
  const { account } = useEthereum()
  const [progress, setProgress] = useState<State>({ step: 1, points: 0 })

  const getProgress = (address: string) => {
    try {
      const data = localStorage.getItem(address)
      if (data) {
        const decData = CryptoJs.AES.decrypt(data, secretKey).toString(
          CryptoJs.enc.Utf8
        )
        setProgress(JSON.parse(decData))
      } else {
        setProgress({ step: 1, points: 0 })
      }
    } catch (e: any) {
      console.log(e)
    }
  }

  const saveProgress = (address: string, step: number, points: number) => {
    try {
      const data = {
        step,
        points
      }
      console.log(process.env.SECRET)
      const encData = CryptoJs.AES.encrypt(
        JSON.stringify(data),
        secretKey
      ).toString()
      localStorage.setItem(address, encData)
    } catch (e: any) {
      console.log(e)
    }
  }

  useEffect(() => {
    if (account) {
      getProgress(account)
    }
  }, [account])

  return {
    saveProgress,
    getProgress,
    progress
  }
}

export default useProgress
