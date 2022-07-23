import { useCallback, useEffect, useMemo } from "react"

import { onAuthStateChanged, User, Auth } from "firebase/auth"

import useLoadingValue from "../../hooks/use-loading-value/use-loading-value"

export const useFirebaseAuthState = (auth: Auth) => {
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
      },
      setError
    )
  }, [auth, setError, setUser])

  return useMemo(() => ({ error, isLoading: isLoading, user }), [error, isLoading, user])
}

export default useFirebaseAuthState
