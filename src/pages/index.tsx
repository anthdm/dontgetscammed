import type { NextPage } from "next"
import Link from "next/link"
import { ethers } from "ethers"
import { useEffect, useState } from "react"
import useMetaMask from "../hooks/useMetaMask"

const Home: NextPage = () => {
  return (
    <div className="flex flex-col">
      <div className="w-2/3">
        <h1 className="text-5xl font-bold tracking-wide leading-tight mb-6">
          An educational tool that make's you ready to enter the world of crypto
        </h1>
        <p className="text-gray-300 mb-10">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste alias
          saepe autem, veniam perferendis eaque consequatur earum at accusantium
          laudantium ea ratione. Aliquid praesentium obcaecati maxime laudantium
          dolor. Iusto, deleniti?
        </p>
      </div>
      <div>
        <h2 className="text-2xl mb-6">Ready to start your yourney?</h2>
        <button className="bg-blue-500 hover:bg-blue-600 px-4 py-3 rounded-xl font-bold">
          <Link href="/adventure">Take the blue pill</Link>
        </button>
      </div>
    </div>
  )
}

export default Home
