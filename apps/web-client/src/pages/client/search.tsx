import { useEffect } from "react"

import { NextSeo } from "next-seo"
import { useRouter } from "next/router"

import { useSearchRestaurantLazyQuery } from "../../__generated__/types.react-apollo"

export const SearchPage = () => {
  const { query } = useRouter()
  const { term } = query
  const router = useRouter()
  const [
    callQuery,
    // { loading, data }
  ] = useSearchRestaurantLazyQuery()

  useEffect(() => {
    if (!term) {
      router.replace("/")
      return
    }
    callQuery({
      variables: {
        input: {
          page: 1,
          query: term as string, // TODO
        },
      },
    })
  }, [router, callQuery, term])
  return (
    <h1>
      <NextSeo title="Search | Nham Avey" />
    </h1>
  )
}
