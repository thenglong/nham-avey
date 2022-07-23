import { useMutation } from "@tanstack/react-query"
import { GoogleAuthProvider, signInWithPopup, Auth } from "firebase/auth"

const provider = new GoogleAuthProvider()

const signInWithGoogle = (auth: Auth) => signInWithPopup(auth, provider)

export const useSignInGooglePopup = () => {
  const { isLoading, error, mutateAsync, mutate } = useMutation(signInWithGoogle)

  return {
    isLoading,
    error,
    signIn: mutate,
    signInAsync: mutateAsync,
  }
}

export default useSignInGooglePopup
