import { MutationFunction, useMutation, UseMutationOptions } from "@tanstack/react-query"
import { FirebaseError } from "firebase/app"
import {
  Auth,
  browserLocalPersistence,
  browserSessionPersistence,
  signInWithEmailAndPassword,
  UserCredential,
} from "firebase/auth"

interface SignInParams {
  auth: Auth
  email: string
  password: string
  staySignedIn?: boolean
}

const doSignInWithEmailAndPassword: MutationFunction<
  UserCredential,
  SignInParams
> = async ({ auth, email, password, staySignedIn = true }) => {
  const persistence = staySignedIn ? browserLocalPersistence : browserSessionPersistence
  await auth.setPersistence(persistence)
  return signInWithEmailAndPassword(auth, email, password)
}

export const useSignInWithEmailAndPassword = (
  options?: Omit<
    UseMutationOptions<UserCredential, FirebaseError, SignInParams>,
    "mutationFn"
  >
) => {
  const { error, isLoading, mutate, mutateAsync } = useMutation<
    UserCredential,
    FirebaseError,
    SignInParams
  >(doSignInWithEmailAndPassword, options)

  return {
    error,
    isLoading,
    signIn: mutate,
    signInAsync: mutateAsync,
  }
}

export default useSignInWithEmailAndPassword
