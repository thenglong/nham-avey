import { ReactNode } from "react"

import Footer from "../footer"
import { Header } from "../header"

interface AuthedLayoutProps {
  children: ReactNode
}

export const AuthedLayout = ({ children }: AuthedLayoutProps) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}

export const PageLoading = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <span className="text-xl font-medium tracking-wide">Loading...</span>
    </div>
  )
}
