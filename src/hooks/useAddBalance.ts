import axios from "axios"
import { useState } from "react"

interface AddBalanceData {
  error: string | null
  addBalance: (address: string) => void
  tx: string | null
  isLoading: boolean
}

const useAddBalance = (): AddBalanceData => {
  const [error, setError] = useState(null)
  const [tx, setTx] = useState(null)
  const [isLoading, setIsloading] = useState(false)

  const endpoint = "/api/add_balance"

  const addBalance = async (address: string): Promise<void> => {
    setError(null)
    setIsloading(true)
    try {
      const {
        data: { tx }
      } = await axios.post(endpoint, { address })
      setTx(tx)
    } catch (e: any) {
      setError(e.message)
    }
    setIsloading(false)
  }

  return {
    error,
    tx,
    addBalance,
    isLoading
  }
}

export default useAddBalance
