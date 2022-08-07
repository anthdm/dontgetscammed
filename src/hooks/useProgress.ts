import { useState } from "react"

interface UseProgressData {
  addNewAccount: (addres: string) => void
  getProgress: (address: string) => void
  progress: State
}

interface State {
  step: number
}

const useProgress = (): UseProgressData => {
  const [progress, setProgress] = useState<State>({ step: 0 })
  const getProgress = (address: string) => {
    try {
      const data = localStorage.getItem(address)
      setProgress(JSON.parse(data!))
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

  return {
    addNewAccount,
    getProgress,
    progress
  }
}

export default useProgress
