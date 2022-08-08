import { useEffect, useState } from "react"
import useEthereum from "./useEthereum"

interface UseProgressData {
  saveProgress: (address: string, step: number) => void
  getProgress: (address: string) => void
  progress: State
}

interface State {
  step: number
}

const useProgress = (): UseProgressData => {
  const { account } = useEthereum()
  const [progress, setProgress] = useState<State>({ step: 1 })
  const getProgress = (address: string) => {
    try {
      const data = localStorage.getItem(address)
      setProgress(JSON.parse(data!))
    } catch (e: any) {
      console.log(e)
    }
  }

  const saveProgress = (address: string, step: number) => {
    try {
      const data = {
        step
      }
      localStorage.setItem(address, JSON.stringify(data))
    } catch (e: any) {
      console.log(e)
    }
  }

  const addNewAccount = (address: string) => {
    try {
      const data = {
        step: 1
      }
      localStorage.setItem(address, JSON.stringify(data))
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
