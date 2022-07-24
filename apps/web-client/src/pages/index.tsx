import {
  DependencyList,
  MutableRefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react"

import clsx from "clsx"
import { GetServerSidePropsContext } from "next"
import { NextSeo } from "next-seo"

import {
  CategoriesDocument,
  Restaurant,
  RestaurantsDocument,
  RestaurantsQuery,
  RestaurantsQueryVariables,
  useCategoriesQuery,
  useRestaurantsQuery,
} from "@nham-avey/common"
import CategoryItem from "src/components/category-item"
import { AuthedLayout } from "src/components/layout/authed-layout"
import { RestaurantCard } from "src/components/restaurant-card"
import { APP_NAME, DEFAULT_PAGE_STATE } from "src/constants/common-constants"
import { useRestaurantPageStateContext } from "src/context/restaurant-page-state-context"
import { addApolloState, initializeApollo } from "src/graphql/apollo-config"

interface PageState {
  page: number
  take: number
  q: string
}

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
    const loadedLength = loadedRestaurants?.restaurants.restaurants?.length as number
    const defaultLength = restaurantData?.restaurants?.restaurants?.length as number
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
    ({ currPos }: ScrollProps) => {
      setScrollYPosition(currPos.y)
    },
    [setScrollYPosition]
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
      const newPageState: PageState = { ...previousState, page: previousState.page + 1 }
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
      <div className="container mx-auto px-8">
        {/* Top Categories */}
        <div className="mb-6 mt-12 grid grid-cols-3 gap-8 md:grid-cols-6">
          {categoriesData?.categories.categories?.map(category => (
            <CategoryItem category={category} key={category.id} />
          ))}
        </div>

        <h3 className="h3 mt-12 mb-6">Top Restaurants</h3>
        <div className="mb-12 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {restaurants?.map(restaurant => (
            <RestaurantCard restaurant={restaurant as Restaurant} key={restaurant.id} />
          ))}
        </div>

        {/* Load More button */}
        {restaurantData?.restaurants.hasNext && (
          <div className="mb-16 text-center">
            <button
              className={clsx("btn btn-active btn-sm w-30 h-10 hover:shadow-lg", {
                "loading btn-ghost": isLoadingRestaurant,
              })}
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

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect

interface IPosition {
  x: number
  y: number
}

interface ScrollProps {
  prevPos: IPosition
  currPos: IPosition
}

type ElementRef = MutableRefObject<HTMLElement | undefined>

const isBrowser = typeof window !== `undefined`
const zeroPosition = { x: 0, y: 0 }

const getClientRect = (element?: HTMLElement) => element?.getBoundingClientRect()

const getScrollPosition = ({
  element,
  useWindow,
  boundingElement,
}: {
  element?: ElementRef
  boundingElement?: ElementRef
  useWindow?: boolean
}) => {
  if (!isBrowser) {
    return zeroPosition
  }

  if (useWindow) {
    return { x: window.scrollX, y: window.scrollY }
  }

  const targetPosition = getClientRect(element?.current || document.body)
  const containerPosition = getClientRect(boundingElement?.current)

  if (!targetPosition) {
    return zeroPosition
  }

  return containerPosition
    ? {
        x: (containerPosition.x || 0) - (targetPosition.x || 0),
        y: (containerPosition.y || 0) - (targetPosition.y || 0),
      }
    : { x: targetPosition.left, y: targetPosition.top }
}

interface UseScrollPosition {
  effect: (props: ScrollProps) => void
  deps?: DependencyList
  element?: ElementRef
  useWindow?: boolean
  wait?: number
  boundingElement?: ElementRef
}

const useScrollPosition = ({
  useWindow,
  boundingElement,
  element,
  wait,
  effect,
  deps,
}: UseScrollPosition): void => {
  const position = useRef(getScrollPosition({ useWindow, boundingElement }))

  let throttleTimeout: number | null = null

  const callBack = () => {
    const currPos = getScrollPosition({ element, useWindow, boundingElement })
    effect({ prevPos: position.current, currPos })
    position.current = currPos
    throttleTimeout = null
  }

  useIsomorphicLayoutEffect(() => {
    if (!isBrowser) {
      return undefined
    }

    const handleScroll = () => {
      if (wait) {
        if (throttleTimeout === null) {
          throttleTimeout = window.setTimeout(callBack, wait)
        }
      } else {
        callBack()
      }
    }

    if (boundingElement) {
      boundingElement.current?.addEventListener("scroll", handleScroll, { passive: true })
    } else {
      window.addEventListener("scroll", handleScroll, { passive: true })
    }

    return () => {
      if (boundingElement) {
        boundingElement.current?.removeEventListener("scroll", handleScroll)
      } else {
        window.removeEventListener("scroll", handleScroll)
      }

      if (throttleTimeout) {
        clearTimeout(throttleTimeout)
      }
    }
  }, deps)
}

useScrollPosition.defaultProps = {
  deps: [],
  element: false,
  useWindow: false,
  wait: null,
  boundingElement: false,
}
