import { gql, useApolloClient } from "@apollo/client"
import { yupResolver } from "@hookform/resolvers/yup"
import clsx from "clsx"
import { NextSeo } from "next-seo"
import { useForm } from "react-hook-form"
import * as yup from "yup"

import {
  EditProfileMutation,
  useEditProfileMutation,
  useGetMeQuery,
} from "../__generated__/types.react-apollo"

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
})

interface FormProps {
  email?: string
  password?: string
}

const EditProfilePage = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { isValid },
    setValue,
  } = useForm<FormProps>({
    mode: "onChange",
    resolver: yupResolver(schema),
  })

  const { data: userData } = useGetMeQuery({
    onCompleted: data => {
      setValue("email", data.me.email)
    },
  })
  const client = useApolloClient()

  const onCompleted = (data: EditProfileMutation) => {
    const {
      editProfile: { ok },
    } = data

    if (ok && userData) {
      const {
        me: { email: prevEmail, id },
      } = userData
      const { email: newEmail } = getValues()

      if (prevEmail !== newEmail) {
        client.writeFragment({
          id: `User:${id}`,
          fragment: gql`
            fragment EditedUser on User {
              verified
              email
            }
          `,
          data: {
            verified: false,
            email: newEmail,
          },
        })
      }
    }
  }
  const [editProfile, { loading }] = useEditProfileMutation({
    onCompleted,
  })

  const onSubmit = () => {
    const { email, password } = getValues()
    editProfile({
      variables: {
        input: {
          email,
          ...(password !== "" && { password }),
        },
      },
    })
  }
  return (
    <div className="mt-52 flex flex-col items-center justify-center">
      <NextSeo title="Edit Profile | Nham Avey" />
      <h4 className="text-2x1 mb-3 font-semibold">Edit Profile</h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-5 mb-5 grid w-full max-w-screen-sm gap-3"
      >
        <input
          {...register("email")}
          className="input"
          type="email"
          placeholder="Email"
        />
        <input
          {...register("password")}
          className="input"
          type="password"
          placeholder="Password"
        />

        <button
          className={clsx("btn btn-primary", {
            loading,
          })}
          disabled={!isValid}
        >
          Save Profile
        </button>
      </form>
    </div>
  )
}

export default EditProfilePage
