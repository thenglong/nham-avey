import { useEffect } from "react"

import { Auth } from "firebase/auth"
import { useRouter } from "next/router"

import { useFirebaseAuthState } from "@nham-avey/common"

export const useRedirectOnAuthed = (auth: Auth, redirectUrl: string) => {
  const { user } = useFirebaseAuthState(auth)
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.replace(redirectUrl)
    }
  }, [router, redirectUrl, user])
}

export default useRedirectOnAuthed
