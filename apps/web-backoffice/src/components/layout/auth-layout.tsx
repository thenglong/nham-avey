import { Suspense } from "react"

import { Outlet } from "react-router-dom"
import LoadingIndicator from "src/components/loading-indicator"

export const AuthLayout = () => {
  return (
    <Suspense fallback={<LoadingIndicator cover="page" />}>
      <div className="h-screen">
        <Outlet />
      </div>
    </Suspense>
  )
}

export default AuthLayout
