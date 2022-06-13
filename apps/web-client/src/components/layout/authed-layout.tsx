import { ReactNode } from "react"

import { Header } from "../header"

interface LoggedInRouterProps {
  children: ReactNode
}

export const LoggedInRouter = ({ children }: LoggedInRouterProps) => {
  return (
    <>
      <Header />
      {children}
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
