import { yupResolver } from "@hookform/resolvers/yup"
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
import { Button } from "../components/button"
import { FormError } from "../components/form-error"

interface CreateAccountForm {
  email: string
  password: string
  role: UserRole
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
    defaultValues: {
      role: UserRole.Client,
    },
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
      const { email, password, role } = getValues()
      createAccountMutation({
        variables: {
          createAccountInput: { email, password, role },
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
          <input
            {...register("email")}
            type="email"
            placeholder="Email"
            className="input "
          />

          {errors.email?.message && <FormError errorMessage={errors.email?.message} />}

          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="input"
          />

          {errors.password?.message && (
            <FormError errorMessage={errors.password?.message} />
          )}

          <select
            className="input"
            {...register("role", {
              required: true,
            })}
          >
            {Object.keys(UserRole).map((role, index) => (
              <option key={index}>{role}</option>
            ))}
          </select>

          <Button canClick={isValid} loading={loading} actionText="Create Account" />
          {createAccountMutationResult?.createAccount.error && (
            <FormError errorMessage={createAccountMutationResult.createAccount.error} />
          )}
        </form>
        <div>
          Already have an account?{" "}
          <Link href="/login" className="text-lime-600 hover:underline">
            Log in now
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CreateAccountPage
