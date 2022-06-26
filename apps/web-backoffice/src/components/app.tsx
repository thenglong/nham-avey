import "@chatscope/chat-ui-kit-styles/dist/default/styles.css"
import { useMemo } from "react"

import { useRoutes } from "react-router-dom"
import firebaseService from "src/services/firebase-service"
import LoadingIndicator from "src/components/loading-indicator"
import useFirebaseAuthState from "src/hooks/firebase/use-firebase-auth-state"

import "src/i18n/i18n"
import "antd/dist/antd.css"
import authRoutes from "src/routes/auth-routes"
import defaultAppRoutes from "src/routes/default-app-routes"
import _logger from "src/utils/logger-utils"

const logger = _logger.withTag("DefaultApp")

function App() {
  const { user: firebaseUser, isLoading: isLoadingFirebaseUser } = useFirebaseAuthState({
    onStateChanged: async user => {
      if (!user) return
      const tokenResult = await user.getIdTokenResult()
      const { roles } = tokenResult?.claims ?? {}
      if (
        !(Array.isArray(roles) && (roles.includes("STAFF") || roles.includes("ADMIN")))
      ) {
        firebaseService.auth.signOut()
        // TODO: handling error message
      }
    },
  })
  const { data: currentUser, isLoading: isLoadingCurrentUser } = useCurrentUserQuery()

  const authRouter = useRoutes(authRoutes)
  const defaultAppRouter = useRoutes(defaultAppRoutes)

  const isLoading = useMemo(
    () => isLoadingFirebaseUser || isLoadingCurrentUser,
    [isLoadingFirebaseUser, isLoadingCurrentUser]
  )

  if (isLoading) return <LoadingIndicator cover="page" />
  if (!firebaseUser) return authRouter

  return defaultAppRouter
}

export default App
