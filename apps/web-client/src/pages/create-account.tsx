import { yupResolver } from "@hookform/resolvers/yup"
import clsx from "clsx"
import { NextSeo } from "next-seo"
import Link from "next/link"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import * as yup from "yup"

import {
  CreateAccountMutation,
  useCreateAccountMutation,
  UserRole,
} from "../__generated__/types.react-apollo"
import { FormError } from "../components/form-error"

interface CreateAccountForm {
  email: string
  password: string
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
})

const CreateAccountPage = () => {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CreateAccountForm>({
    mode: "onChange",
    resolver: yupResolver(schema),
  })

  const router = useRouter()

  const onCompleted = (data: CreateAccountMutation) => {
    const {
      createAccount: { ok },
    } = data

    if (ok) {
      alert("Account Created! Log in now!")
      router.push("/")
    }
  }

  const [createAccountMutation, { loading, data: createAccountMutationResult }] =
    useCreateAccountMutation({ onCompleted })

  const onSubmit = () => {
    if (!loading) {
      const { email, password } = getValues()
      createAccountMutation({
        variables: {
          createAccountInput: { email, password, role: UserRole.Client },
        },
      })
    }
  }

  return (
    <div className="mt:10 flex h-screen flex-col items-center lg:mt-28">
      <NextSeo title="Create Account | Nham Avey" />
      <div className="flex w-full max-w-screen-sm flex-col items-center px-5">
        <h1 className="my-10 w-52 text-4xl font-semibold">Nham Avey</h1>
        <h4 className="mb-5 w-full text-left text-3xl font-medium">
          Let&lsquo;s get started
        </h4>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-5 mb-5 grid w-full gap-3">
          <div className="form-control w-full">
            <label htmlFor="email" className="label">
              <span className="label-text">Your Email Address</span>
            </label>
            <input
              id="email"
              {...register("email")}
              type="email"
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
              type="password"
              id="password"
              className="input input-primary w-full"
            />
            <label htmlFor="password" className="label">
              <span className="label-text-alt text-error">
                {errors.password?.message}
              </span>
            </label>
          </div>

          <button
            disabled={isValid}
            className={clsx("btn btn-primary", {
              loading,
            })}
          >
            Create Account
          </button>
          {createAccountMutationResult?.createAccount.error && (
            <FormError errorMessage={createAccountMutationResult.createAccount.error} />
          )}
        </form>
        <Link href="/login">
          <a className="link">Log In Instead</a>
        </Link>
      </div>
    </div>
  )
}

export default CreateAccountPage
