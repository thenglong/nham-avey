import { MutationFunction, useMutation } from "@tanstack/react-query"
import { FirebaseError } from "firebase/app"
import {
  Auth,
  browserLocalPersistence,
  browserSessionPersistence,
  signInWithEmailAndPassword,
  UserCredential,
} from "firebase/auth"
import firebaseService from "src/services/firebase-service"

const { auth: fallbackAuth } = firebaseService

interface SignInParams {
  auth?: Auth
  email: string
  password: string
  staySignedIn?: boolean
}

const doSignInWithEmailAndPassword: MutationFunction<
  UserCredential,
  SignInParams
> = async ({ auth = fallbackAuth, email, password, staySignedIn = true }) => {
  const persistence = staySignedIn ? browserLocalPersistence : browserSessionPersistence
  await auth.setPersistence(persistence)
  return signInWithEmailAndPassword(auth, email, password)
}

const useSignInWithEmailAndPassword = () => {
  const { error, isLoading, mutate, mutateAsync } = useMutation<
    UserCredential,
    FirebaseError,
    SignInParams
  >(doSignInWithEmailAndPassword)

  return {
    error,
    isLoading,
    signIn: mutate,
    signInAsync: mutateAsync,
  }
}

export default useSignInWithEmailAndPassword
