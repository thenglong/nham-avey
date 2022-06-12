import { ReactNode } from "react"

interface UnauthedLayoutProps {
  children: ReactNode
}

export const UnauthedLayout = ({ children }: UnauthedLayoutProps) => {
  return children
}
