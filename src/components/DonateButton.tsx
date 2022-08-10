import Link from "next/link"
import React from "react"

const DonateButton: React.FC = () => {
  return (
    <Link href="/donate">
      <button className="font-bold px-4 py-3 border border-teal-400 hover:bg-teal-400 rounded-xl">
        Donate
      </button>
    </Link>
  )
}

export default DonateButton
