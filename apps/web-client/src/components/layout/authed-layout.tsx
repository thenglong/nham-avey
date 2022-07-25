import { ReactNode } from "react"

import Footer from "src/components/layout/footer"
import { Header } from "src/components/layout/header"

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
