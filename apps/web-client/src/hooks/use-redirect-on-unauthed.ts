import { useEffect } from "react"

import { Auth } from "firebase/auth"
import { useRouter } from "next/router"

import { useFirebaseAuthState } from "@nham-avey/common"

export const useRedirectOnUnauthed = (auth: Auth, redirectUrl: string) => {
  const { user, isLoading } = useFirebaseAuthState(auth)
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace(redirectUrl)
    }
  }, [isLoading, router, redirectUrl, user])
}

export default useRedirectOnUnauthed
