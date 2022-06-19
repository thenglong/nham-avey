import { yupResolver } from "@hookform/resolvers/yup"
import clsx from "clsx"
import { NextSeo } from "next-seo"
import Link from "next/link"
import { useForm } from "react-hook-form"
import * as yup from "yup"

import { LoginMutation, useLoginMutation } from "../__generated__/types.react-apollo"
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

const LoginPage = () => {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginForm>({
    mode: "onTouched",
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
        <h1 className="my-10 w-52 text-4xl font-semibold">Nham Avey</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-5 mb-5 grid w-full gap-3">
          <div className="form-control w-full">
            <label htmlFor="email" className="label">
              <span className="label-text">Your Email Address</span>
            </label>
            <input
              id="email"
              {...register("email")}
              type="email"
              placeholder="Email"
              className="input input-primary w-full"
            />
            <label htmlFor="email" className="label">
              <span className="label-text-alt text-error">{errors.email?.message}</span>
            </label>
          </div>

          <div className="form-control w-full">
            <label htmlFor="password" className="label">
              <span className="label-text">Your Password</span>
            </label>
            <input
              {...register("password")}
              id="password"
              type="password"
              className="input input-primary w-full"
            />
            <label htmlFor="password" className="label">
              <span className="label-text-alt text-error">
                {errors.password?.message}
              </span>
            </label>
          </div>

          <button
            className={clsx("btn btn-primary", {
              loading,
            })}
            disabled={!isValid}
          >
            Log in
          </button>
          {loginMutationResult?.login.error && (
            <FormError errorMessage={loginMutationResult?.login.error} />
          )}
        </form>

        <Link href="/create-account">
          <a className="link">Create an Account instead</a>
        </Link>
      </div>

      <div className="mt-40 flex w-max flex-col gap-2">
        <button className="btn" data-set-theme="dark" data-act-class="ACTIVECLASS">
          Dark Theme
        </button>
        <button
          className="btn btn-outline"
          data-set-theme="light"
          data-act-class="ACTIVECLASS"
        >
          Light Theme
        </button>
      </div>
    </div>
  )
}

export default LoginPage
