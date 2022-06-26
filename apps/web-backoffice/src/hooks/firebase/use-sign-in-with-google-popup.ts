import { GoogleAuthProvider, signInWithPopup, Auth } from "firebase/auth"
import { useMutation } from "react-query"
import firebaseService from "src/services/firebase-service"

const { auth: fallbackAuth } = firebaseService
const provider = new GoogleAuthProvider()

const signInWithGoogle = (auth: Auth = fallbackAuth) => signInWithPopup(auth, provider)

const useSignInGooglePopup = () => {
  const { isLoading, error, mutateAsync, mutate } = useMutation(signInWithGoogle)

  return {
    isLoading,
    error,
    signIn: mutate,
    signInAsync: mutateAsync,
  }
}

export default useSignInGooglePopup
