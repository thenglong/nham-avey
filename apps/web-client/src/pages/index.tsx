import { useCallback, useEffect, useMemo } from "react"

import clsx from "clsx"
import { GetServerSidePropsContext } from "next"
import { NextSeo } from "next-seo"

import {
  CategoriesDocument,
  Restaurant,
  RestaurantsDocument,
  RestaurantsQuery,
  RestaurantsQueryVariables,
  ScrollProps,
  useCategoriesQuery,
  useRestaurantsQuery,
  useScrollPosition,
} from "@nham-avey/common"
import CategoryItem from "src/components/category-item"
import { AuthedLayout } from "src/components/layout/authed-layout"
import { RestaurantCard } from "src/components/restaurant-card"
import { APP_NAME, DEFAULT_PAGE_STATE } from "src/constants/common-constants"
import {
  PageState,
  useRestaurantPageStateContext,
} from "src/context/restaurant-page-state-context"
import { addApolloState, initializeApollo } from "src/graphql/apollo-config"

const CATEGORIES_VARIABLES = { ...DEFAULT_PAGE_STATE, page: 1, take: 6 } // take only top 6

export const getServerSideProps = async (_: GetServerSidePropsContext) => {
  const apolloClient = initializeApollo()

  await apolloClient.query<RestaurantsQuery, RestaurantsQueryVariables>({
    query: RestaurantsDocument,
    variables: DEFAULT_PAGE_STATE,
  })

  await apolloClient.query({
    query: CategoriesDocument,
    variables: CATEGORIES_VARIABLES,
  })

  return addApolloState(apolloClient, {
    props: {},
  })
}

const RestaurantsPage = () => {
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

  useEffect(() => {
    const loadedLength = loadedRestaurants?.restaurants.restaurants
      ?.length as number
    const defaultLength = restaurantData?.restaurants?.restaurants
      ?.length as number
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

  const handleScroll = useCallback(
    ({ currentPosition }: ScrollProps) => setScrollYPosition(currentPosition.y),
    [setScrollYPosition],
  )

  useScrollPosition({ effect: handleScroll, wait: 800 })

  // this makes support for ssr since inside the useEffect,
  // the loaded will be rendered on the client
  const restaurants = useMemo<Restaurant[]>(() => {
    if (
      (loadedRestaurants?.restaurants.restaurants?.length as number) >
      (restaurantData?.restaurants?.restaurants?.length as number)
    ) {
      return loadedRestaurants?.restaurants.restaurants as []
    } else {
      return restaurantData?.restaurants?.restaurants as []
    }
  }, [restaurantData, loadedRestaurants])

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
          const updatedData = {
            restaurants: {
              ...fetchMoreResult.restaurants,
              restaurants: [
                ...(prev?.restaurants?.restaurants || []),
                ...(fetchMoreResult.restaurants.restaurants || []),
              ],
            },
          }
          return Object.assign({}, prev, updatedData)
        },
      })

      return newPageState
    })
  }, [fetchMoreRestaurant, setPageState])

  return (
    <AuthedLayout>
      <NextSeo title={APP_NAME} />
      <div className="container mx-auto px-4 lg:px-8">
        {/* Top Categories */}
        <div className="mb-6 mt-12 grid grid-cols-3 gap-8 md:grid-cols-6">
          {categoriesData?.categories.categories?.map(category => (
            <CategoryItem category={category} key={category.id} />
          ))}
        </div>

        <h3 className="h3 mt-12 mb-6">Top Restaurants</h3>
        <div className="mb-12 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {restaurants?.map(restaurant => (
            <RestaurantCard
              restaurant={restaurant as Restaurant}
              key={restaurant.id}
            />
          ))}
        </div>

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

export default RestaurantsPage
