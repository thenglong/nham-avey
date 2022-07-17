import { signIn, SignInResponse } from "next-auth/react"
import { useMutation, UseMutationOptions } from "react-query"

interface SignInArgs {
  email: string
  password: string
}

const useSignIn = (
  options?:
    | Omit<
        UseMutationOptions<SignInResponse | undefined, unknown, SignInArgs, unknown>,
        "mutationFn"
      >
    | undefined
) => {
  return useMutation(
    ({ email, password }: SignInArgs) =>
      signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl: `${window.location.origin}`,
      }),
    options
  )
}

export default useSignIn
