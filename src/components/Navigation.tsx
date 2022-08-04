import React from "react"
import Link from "next/link"

interface NavLinkProps {
  children?: React.ReactNode
  name: string
  href: string
}

export const NavLink: React.FC<NavLinkProps> = ({ children, name, href }) => {
  return (
    <Link className="" href={href}>
      <a>
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
      <div className="flex space-x-14 items-end">
        <div className="text-4xl">noscam.gg</div>
        <div className="flex space-x-6 uppercase">
          <NavLink name="help" href="/completed" />
        </div>
      </div>
    </div>
  )
}
