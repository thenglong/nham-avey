import { gql, useMutation } from "@apollo/client"
import { loginMutation, loginMutationVariables } from "__generated__/loginMutation"
import nuberLogo from "images/logo.svg"
import Link from "next/link"
import { useForm } from "react-hook-form"

import { Button } from "../components/button"
import { FormError } from "../components/form-error"
import { LOCAL_STORAGE_TOKEN } from "../constants/common-constants"
import { authTokenVar, isLoggedInVar } from "../graphql/apollo-config"

export const LOGIN_MUTATION = gql`
  mutation loginMutation($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      token
      error
    }
  }
`

interface ILoginForm {
  email: string
  password: string
}

export const Login = () => {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ILoginForm>({
    mode: "onChange",
  })

  const onCompleted = (data: loginMutation) => {
    const {
      login: { ok, token },
    } = data
    if (ok && token) {
      localStorage.setItem(LOCAL_STORAGE_TOKEN, token)
      authTokenVar(token)
      isLoggedInVar(true)
    }
  }

  const [loginMutation, { data: loginMutationResult, loading }] = useMutation<
    loginMutation,
    loginMutationVariables
  >(LOGIN_MUTATION, {
    onCompleted,
  })

  const onSubmit = () => {
    if (!loading) {
      const { email, password } = getValues()
      loginMutation({
        variables: { loginInput: { email, password } },
      })
    }
  }

  return (
    <div className="mt:10 flex h-screen flex-col items-center lg:mt-28">
      <Helmet>
        <title>Login | Nuber Eats</title>
      </Helmet>
      <div className="flex w-full max-w-screen-sm flex-col items-center px-5">
        <img src={nuberLogo} className="mb-10 w-52" alt="nuberLogo" />
        <h4 className="mb-5 w-full text-left text-3xl font-medium">Welcome back</h4>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-5 mb-5 grid w-full gap-3">
          <input
            {...register("email", {
              required: "Email is required",
              pattern:
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
            type="email"
            placeholder="Email"
            className="input "
          />

          {errors.email?.message && <FormError errorMessage={errors.email?.message[0]} />}

          {errors.email?.type === "pattern" && (
            <FormError errorMessage="Please enter a valid email" />
          )}

          <input
            {...register("password", {
              required: "Password is required",
              minLength: 4,
            })}
            type="password"
            placeholder="Password"
            className="input"
          />

          {errors.password?.message && (
            <FormError errorMessage={errors.password?.message[0]} />
          )}

          {errors.password?.type === "minLength" && (
            <FormError errorMessage="Password must be more than 4 chars." />
          )}

          <Button canClick={isValid} loading={loading} actionText="Log in" />
          {loginMutationResult?.login.error && (
            <FormError errorMessage={loginMutationResult?.login.error} />
          )}
        </form>
        <div>
          New to Nuber ?{" "}
          <Link href="/create-account" className="text-lime-600 hover:underline">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  )
}
