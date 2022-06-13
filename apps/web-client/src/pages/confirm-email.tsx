import { useEffect } from "react"

import { gql, useApolloClient } from "@apollo/client"
import { NextSeo } from "next-seo"
import { useRouter } from "next/router"

import {
  useGetMeQuery,
  useVerifyEmailMutation,
  VerifyEmailMutation,
} from "../__generated__/types.react-apollo"

export const ConfirmEmailPage = () => {
  const { data: userData } = useGetMeQuery()
  const client = useApolloClient()
  const router = useRouter()

  const onCompleted = (data: VerifyEmailMutation) => {
    const {
      verifyEmail: { ok },
    } = data
    if (ok && userData?.me.id) {
      client.writeFragment({
        id: `User:${userData.me.id}`,
        fragment: gql`
          fragment VerifiedUser on User {
            verified
          }
        `,
        data: {
          verified: true,
        },
      })
      router.push("/")
    }
  }

  const [verifyEmail] = useVerifyEmailMutation({
    onCompleted,
  })

  useEffect(() => {
    const [, code] = window.location.href.split("code=")
    verifyEmail({
      variables: {
        input: {
          code,
        },
      },
    })
  }, [verifyEmail])

  return (
    <div className="mt-52 flex flex-col items-center justify-center">
      <NextSeo title="Verify Email | Nham Avey" />
      <h2 className="mb-1 text-lg font-medium">Confirming email...</h2>
      <h4 className="text-sm text-gray-700">Please wait, don&apos;t close this page</h4>
    </div>
  )
}
