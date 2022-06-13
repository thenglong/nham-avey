import { useEffect } from "react"

import { NextSeo } from "next-seo"
import { useRouter } from "next/router"

import { useSearchRestaurantLazyQuery } from "../../__generated__/types.react-apollo"

/**
 * @todo Implement this component.
 */
const SearchPage = () => {
  const { query, isReady } = useRouter()
  const { term } = query
  const router = useRouter()
  const [callQuery, { loading, data }] = useSearchRestaurantLazyQuery()

  useEffect(() => {
    if (!isReady || loading) return

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
  }, [router, callQuery, term, isReady, loading])

  if (loading) return <p>Loading...</p>

  return (
    <h1>
      <NextSeo title="Search | Nham Avey" />
      <pre>{JSON.stringify(data || {}, null, 2)}</pre>
    </h1>
  )
}

export default SearchPage
