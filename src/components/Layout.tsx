import React, { useEffect, useState } from "react"
import { Nav } from "components/Navigation"

interface LayoutProps {
  children?: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Nav />
      <div className="container text-white mx-auto min-h-screen max-h-full pt-10 pb-10">
        {children}
      </div>
    </>
  )
}

export default Layout
