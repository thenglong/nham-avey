import { useEffect } from "react"

import { yupResolver } from "@hookform/resolvers/yup"
import clsx from "clsx"
import { NextSeo } from "next-seo"
import Link from "next/link"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import * as yup from "yup"

import { useFirebaseAuthState, useSignInWithEmailAndPassword } from "@nham-avey/common"
import { FormError } from "src/components/form-error"
import useRedirectOnAuthed from "src/hooks/useRedirectOnAuthed"
import firebaseService from "src/services/firebase-services"

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
})

interface LoginForm {
  email: string
  password: string
}

const { auth } = firebaseService

const LoginPage = () => {
  useRedirectOnAuthed(auth, "/")
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: yupResolver(schema),
  })

  const { signIn, isLoading: isSigningIn, error } = useSignInWithEmailAndPassword()

  const onSubmit = async () => {
    const { email, password } = getValues()
    signIn({ email, password, auth })
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
              loading: isSigningIn,
            })}
          >
            Log in
          </button>
          <div className="text-center">
            {error && <FormError errorMessage={error.message} />}
          </div>
        </form>

        <Link href="/create-account">
          <a className="link">Create an Account instead</a>
        </Link>
      </div>
    </div>
  )
}

export default LoginPage
