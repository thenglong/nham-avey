import { useCallback, useEffect, useMemo } from "react"

import { QueryResult } from "@apollo/client"
import clsx from "clsx"
import { NextSeo } from "next-seo"

import {
  Restaurant,
  RestaurantsQuery,
  RestaurantsQueryVariables,
  ScrollProps,
  useCategoriesQuery,
  useRestaurantsQuery,
  useScrollPosition,
} from "@nham-avey/common"
import CategoryCard from "src/components/cards/category-card"
import { MemoedRestaurantCards as RestaurantCards } from "src/components/cards/restaurant-cards"
import { AuthedLayout } from "src/components/layout/authed-layout"
import { APP_NAME, DEFAULT_PAGE_STATE } from "src/constants/common-constants"
import {
  PageState,
  useRestaurantPageStateContext,
} from "src/context/restaurant-page-state-context"

export const CATEGORIES_VARIABLES = { ...DEFAULT_PAGE_STATE, page: 1, take: 6 } // take only top 6

const HomePage = () => {
  const {
    pageState,
    setPageState,
    loadedRestaurants,
    setLoadedRestaurants,
    setScrollYPosition,
    scrollYPosition,
  } = useRestaurantPageStateContext()

  const {
    data: restaurantData,
    fetchMore: fetchMoreRestaurant,
    loading: isLoadingRestaurant,
    updateQuery,
  } = useRestaurantsQuery({
    variables: DEFAULT_PAGE_STATE,
    notifyOnNetworkStatusChange: true,
    nextFetchPolicy: "cache-and-network",
  })

  const handleScroll = useCallback(
    ({ currentPosition }: ScrollProps) => setScrollYPosition(currentPosition.y),
    [setScrollYPosition],
  )

  useScrollPosition({ effect: handleScroll, wait: 800 })

  // update scroll position when navigate back
  useEffect(() => {
    const loadedLength = loadedRestaurants?.restaurants.data?.length as number
    const defaultLength = restaurantData?.restaurants.data?.length as number
    if (loadedLength > defaultLength) {
      updateQuery(prev => {
        return {
          ...prev,
          restaurants: {
            ...prev.restaurants,
            ...loadedRestaurants?.restaurants,
          },
        }
      })
      if (window.scrollY === 0) {
        window.scrollBy({ top: -scrollYPosition })
      }
    } else {
      setLoadedRestaurants(restaurantData)
    }
  }, [
    pageState,
    restaurantData,
    loadedRestaurants,
    scrollYPosition,
    setLoadedRestaurants,
    updateQuery,
  ])

  const { data: categoriesData } = useCategoriesQuery({
    variables: CATEGORIES_VARIABLES,
  })

  // const { register, handleSubmit, getValues } = useForm<FormProps>()
  // const router = useRouter()
  //
  // const onSearchSubmit = () => {
  //   const { searchTerm } = getValues()
  //   router.push({
  //     pathname: "/search",
  //     search: `?term=${searchTerm}`,
  //   })
  // }

  const handleLoadMore = useCallback(() => {
    setPageState(previousState => {
      const newPageState: PageState = {
        ...previousState,
        page: previousState.page + 1,
      }
      fetchMoreRestaurant({
        variables: newPageState,
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev

          const updatedData: QueryResult<
            RestaurantsQuery,
            RestaurantsQueryVariables
          >["data"] = {
            restaurants: {
              ...fetchMoreResult.restaurants,
              data: [
                ...(prev?.restaurants?.data || []),
                ...(fetchMoreResult.restaurants?.data || []),
              ],
            },
          }
          return Object.assign({}, prev, updatedData)
        },
      })

      return newPageState
    })
  }, [fetchMoreRestaurant, setPageState])

  // this makes support for ssr since inside the useEffect,
  // the loaded will be rendered on the client
  const restaurants = useMemo<Restaurant[]>(() => {
    if (
      (loadedRestaurants?.restaurants.data?.length as number) >
      (restaurantData?.restaurants?.data?.length as number)
    ) {
      return loadedRestaurants?.restaurants.data as []
    } else {
      return restaurantData?.restaurants?.data as []
    }
  }, [restaurantData, loadedRestaurants])

  return (
    <AuthedLayout>
      <NextSeo title={APP_NAME} />
      <div className="container mx-auto px-4 lg:px-8">
        {/* Top Categories */}
        <div className="mb-6 mt-12 grid grid-cols-3 gap-8 md:grid-cols-6">
          {categoriesData?.categories.data?.map(category => (
            <CategoryCard category={category} key={category.id} />
          ))}
        </div>

        <h3 className="h3 mt-12 mb-6">Top Restaurants</h3>
        <RestaurantCards restaurants={restaurants} />

        {/* Load More button */}
        {restaurantData?.restaurants.hasNext && (
          <div className="mb-16 text-center">
            <button
              className={clsx(
                "w-30 btn btn-active btn-sm h-10 hover:shadow-lg",
                {
                  "loading btn-ghost": isLoadingRestaurant,
                },
              )}
              onClick={handleLoadMore}
            >
              {isLoadingRestaurant ? "Loading" : "Load More"}
            </button>
          </div>
        )}
      </div>
    </AuthedLayout>
  )
}

export default HomePage
