import React from "react"
import Link from "next/link"

interface NavLinkProps {
  children?: React.ReactNode
  name: string
  href: string
}

export const NavLink: React.FC<NavLinkProps> = ({ children, name, href }) => {
  return (
    <Link href={href}>
      <a className="hover:text-blue-300">
        {children}
        {name}
      </a>
    </Link>
  )
}

interface NavProps {}

export const Nav: React.FC<NavProps> = () => {
  return (
    <div className="container mx-auto py-10 flex justify-between items-end text-white">
      <div className="flex space-x-20 items-end">
        {" "}
        <div className="font-bold text-2xl lg:text-4xl text-white">
          <Link href="/">dontgetscammed</Link>
        </div>
        <div className="block lg:hidden">
          <button className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-gray-800 hover:border-teal-500 appearance-none focus:outline-none">
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div className="hidden lg:flex space-x-6 uppercase">
          <NavLink name="Adventures" href="/completed" />
          <NavLink name="FAQ" href="/completed" />
          <NavLink name="Feedback" href="/completed" />
        </div>
      </div>
    </div>
  )
}
