import React, { useEffect, useState } from "react"
import { Nav } from "components/Navigation"

interface LayoutProps {
  children?: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="px-8 flex-col justify-between">
      <Nav />
      <div className="container text-white mx-auto pt-10 pb-10">{children}</div>
    </div>
  )
}

export default Layout
