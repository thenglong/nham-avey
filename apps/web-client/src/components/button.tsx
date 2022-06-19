import { ReactNode } from "react"

import clsx from "clsx"

interface ButtonProps {
  isLoading: boolean
  actionText: string
  children: ReactNode
}

const baseClass =
  "inline-flex text-xs font-bold mx-5 my-3 justify-center tracking-wide outline-none"

export const Button = ({ children }: ButtonProps) => (
  <button className={baseClass}>{children}</button>
)
