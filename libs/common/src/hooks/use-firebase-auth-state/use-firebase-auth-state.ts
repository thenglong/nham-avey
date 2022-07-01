import { useCallback, useEffect, useMemo } from "react"

import { onAuthStateChanged, User, Auth } from "firebase/auth"
import useLoadingValue from "src/hooks/use-loading-value/use-loading-value"
import firebaseService from "src/services/firebase-services"

const { auth: fallbackAuth } = firebaseService
export interface UseFirebaseAuthState {
  onStateChanged?: (user: User | null) => void
  auth?: Auth
}
export const useFirebaseAuthState = ({
  onStateChanged,
  auth = fallbackAuth,
}: UseFirebaseAuthState = {}) => {
  const getCurrentUser = useCallback(() => auth.currentUser, [auth.currentUser])
  const {
    error,
    isLoading,
    setError,
    setValue: setUser,
    value: user,
  } = useLoadingValue<User | null, Error>(getCurrentUser)

  useEffect(() => {
    return onAuthStateChanged(
      auth,
      user => {
        setUser(user)
        onStateChanged?.(user)
      },
      setError
    )
  }, [auth, onStateChanged, setError, setUser])

  return useMemo(() => ({ error, isLoading: isLoading, user }), [error, isLoading, user])
}

export default useFirebaseAuthState
