import axios from "axios"
import { useState } from "react"

interface AddBalanceData {
  error: string | null
  addBalance: (address: string) => void
  tx: string | null
}

const useAddBalance = (): AddBalanceData => {
  const [error, setError] = useState(null)
  const [tx, setTx] = useState(null)

  const addBalance = async (address: string): Promise<void> => {
    setError(null)
    try {
      const {
        data: { tx }
      } = await axios.post("http://localhost:3000/api/add_balance", { address })
      setTx(tx)
    } catch (e: any) {
      setError(e.message)
    }
  }

  return {
    error,
    tx,
    addBalance
  }
}

export default useAddBalance
