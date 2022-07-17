import { useCallback, useEffect, useMemo } from "react"

import { onAuthStateChanged, User, Auth } from "firebase/auth"
import useLoadingValue from "src/hooks/use-loading-value"
import firebaseService from "src/services/firebase-service"

const { auth: fallbackAuth } = firebaseService

interface UseFirebaseAuthStateParams {
  auth?: Auth
}

const useFirebaseAuthState = ({
  auth = fallbackAuth,
}: UseFirebaseAuthStateParams = {}) => {
  const getCurrentUser = useCallback(() => auth.currentUser, [auth.currentUser])
  const {
    error,
    isLoading,
    setError,
    setValue: setUser,
    value: user,
  } = useLoadingValue<User | null, Error>(getCurrentUser)

  useEffect(() => {
    return onAuthStateChanged(auth, setUser, setError)
  }, [auth, setError, setUser])

  return useMemo(() => ({ error, isLoading, user }), [error, isLoading, user])
}

export default useFirebaseAuthState
