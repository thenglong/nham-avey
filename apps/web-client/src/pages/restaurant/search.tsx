import { useEffect } from "react"

import { NextSeo } from "next-seo"
import { useRouter } from "next/router"

import { usePubicGetRestaurantsLazyQuery } from "@nham-avey/common"

interface PageState {
  page: number
  take: number
  q: string
}

const pageState: PageState = {
  page: 1,
  take: 2,
  q: "",
}

/**
 * @todo Implement this component.
 */
const SearchPage = () => {
  const { query, isReady } = useRouter()
  const { term } = query
  const router = useRouter()
  const [getRestaurants, { loading, data }] = usePubicGetRestaurantsLazyQuery()

  useEffect(() => {
    if (!isReady || loading) return

    if (!term) {
      router.replace("/")
      return
    }
    getRestaurants({
      variables: pageState,
    })
  }, [router, getRestaurants, term, isReady, loading])

  if (loading) return <p>Loading...</p>

  return (
    <h1>
      <NextSeo title="Search | Nham Avey" />
      <pre>{JSON.stringify(data || {}, null, 2)}</pre>
    </h1>
  )
}

export default SearchPage
