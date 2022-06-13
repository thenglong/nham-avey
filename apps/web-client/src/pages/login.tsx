import { yupResolver } from "@hookform/resolvers/yup"
import { NextSeo } from "next-seo"
import Link from "next/link"
import { useForm } from "react-hook-form"
import * as yup from "yup"

import { LoginMutation, useLoginMutation } from "../__generated__/types.react-apollo"
import nuberLogo from "../assets/logo.svg"
import { Button } from "../components/button"
import { FormError } from "../components/form-error"
import { LOCAL_STORAGE_TOKEN } from "../constants/common-constants"
import { authTokenVar, isLoggedInVar } from "../graphql/apollo-config"

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
})

interface LoginForm {
  email: string
  password: string
}

export const LoginPage = () => {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginForm>({
    mode: "onChange",
    resolver: yupResolver(schema),
  })

  const onCompleted = (data: LoginMutation) => {
    const {
      login: { ok, token },
    } = data
    if (ok && token) {
      localStorage.setItem(LOCAL_STORAGE_TOKEN, token)
      authTokenVar(token)
      isLoggedInVar(true)
    }
  }

  const [loginMutation, { data: loginMutationResult, loading }] = useLoginMutation({
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
      <NextSeo title="Login | Nham Avey" />
      <div className="flex w-full max-w-screen-sm flex-col items-center px-5">
        <img src={nuberLogo} className="mb-10 w-52" alt="nuberLogo" />
        <h4 className="mb-5 w-full text-left text-3xl font-medium">Welcome back</h4>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-5 mb-5 grid w-full gap-3">
          <input
            {...register("email")}
            type="email"
            placeholder="Email"
            className="input "
          />

          {errors.email?.message && <FormError errorMessage={errors.email?.message[0]} />}

          {errors.email?.type === "pattern" && (
            <FormError errorMessage="Please enter a valid email" />
          )}

          <input
            {...register("password")}
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
