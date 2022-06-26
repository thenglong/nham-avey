import { useCallback, useEffect, useMemo } from "react"

import { onAuthStateChanged, User } from "firebase/auth"

import useLoadingValue from "src/hooks/use-loading-value"
import firebaseService from "src/services/firebase-service"

const { auth } = firebaseService

const useFirebaseAuthState = (onStateChanged?: (user: User | null) => void) => {
  const getCurrentUser = useCallback(() => auth.currentUser, [])
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
  }, [setError, setUser])

  return useMemo(() => ({ error, isLoading: isLoading, user }), [error, isLoading, user])
}

export default useFirebaseAuthState
