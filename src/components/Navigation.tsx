import React, { useState } from "react"
import Link from "next/link"
import ConnectButton from "./ConnectButton"
import DonateButton from "./DonateButton"

interface NavLinkProps {
  children?: React.ReactNode
  name: string
  href: string
  target?: React.HTMLAttributeAnchorTarget
}

export const NavLink: React.FC<NavLinkProps> = ({
  children,
  name,
  href,
  target
}) => {
  return (
    <Link href={href}>
      <a className="hover:text-blue-300" target={target}>
        {children}
        {name}
      </a>
    </Link>
  )
}

interface NavProps {}

export const Nav: React.FC<NavProps> = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const toggleMobileMenu = () => {
    showMobileMenu ? setShowMobileMenu(false) : setShowMobileMenu(true)
  }

  return (
    <>
      <div className="container mx-auto py-10 flex justify-between items-end text-white">
        <div className="flex space-x-20 items-end">
          {" "}
          <div className="font-bold text-xl lg:text-4xl text-white">
            <Link href="/">
              <a>
                dontgetscammed
                <span className="hidden lg:inline-block text-orange-300 text-xs md:text-sm">
                  {" "}
                  Beta
                </span>
              </a>
            </Link>
          </div>
          <div className="block lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-gray-800 hover:border-teal-500 appearance-none focus:outline-none"
            >
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
            <NavLink name="Adventures" href="/adventures" />
            <NavLink name="Leaderboard" href="/leaderboard" />
            <NavLink name="FAQ" href="/faq" />
            <NavLink
              name="Feedback"
              href="https://forms.gle/yXM7976bbDZo74xo7"
              target="_blank"
            />
          </div>
        </div>
        <div className="hidden lg:flex space-x-4">
          <DonateButton />
          <ConnectButton />
        </div>
      </div>
      {showMobileMenu && (
        <div
          onClick={toggleMobileMenu}
          className="bg-black-normal text-xl text-white p-10 w-full h-screen absolute right-0 left-0 top-0 flex flex-col space-y-8"
        >
          <div className="uppercase mb-4 font-bold text-blue-500">Menu</div>
          <NavLink name="Adventures" href="/adventures" />
          <NavLink name="Leaderboard" href="/leaderboard" />
          <NavLink name="FAQ" href="/faq" />
          <NavLink
            name="Feedback"
            href="https://forms.gle/yXM7976bbDZo74xo7"
            target="_blank"
          />
        </div>
      )}
    </>
  )
}
