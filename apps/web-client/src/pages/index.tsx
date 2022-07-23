import { useCallback, useState } from "react"

import clsx from "clsx"
import { GetStaticPropsContext } from "next"
import { NextSeo } from "next-seo"
import Link from "next/link"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"

import {
  usePubicGetRestaurantsQuery,
  PubicGetRestaurantsDocument,
  useGetCategoriesQuery,
  GetCategoriesDocument,
  Restaurant,
} from "@nham-avey/common"
import CategoryCard from "src/components/category-card"
import { AuthedLayout } from "src/components/layout/authed-layout"
import { RestaurantCard } from "src/components/restaurant-card"
import { addApolloState, initializeApollo } from "src/graphql/apollo-config"

interface FormProps {
  searchTerm: string
}

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

const RestaurantsPage = () => {
  const {
    data: restaurantData,
    fetchMore: fetchMoreRestaurant,
    loading: isLoadingRestaurant,
  } = usePubicGetRestaurantsQuery({
    variables: pageState,
    notifyOnNetworkStatusChange: true,
  })

  const { data: categoriesData } = useGetCategoriesQuery({
    variables: { ...pageState, page: 1, take: 6 }, // take top 6
  })

  const { register, handleSubmit, getValues } = useForm<FormProps>()
  const router = useRouter()

  const onSearchSubmit = () => {
    const { searchTerm } = getValues()
    router.push({
      pathname: "/search",
      search: `?term=${searchTerm}`,
    })
  }

  const handleLoadMore = useCallback(() => {
    pageState.page = pageState.page + 1
    fetchMoreRestaurant({
      variables: pageState,
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev
        return Object.assign({}, prev, {
          pubicGetRestaurants: {
            ...fetchMoreResult.pubicGetRestaurants,
            restaurants: [
              ...(prev?.pubicGetRestaurants?.restaurants || []),
              ...(fetchMoreResult.pubicGetRestaurants.restaurants || []),
            ],
          },
          getCategories: categoriesData?.getCategories,
        })
      },
    })
  }, [categoriesData, fetchMoreRestaurant])

  return (
    <AuthedLayout>
      <div className="container mx-auto px-8">
        {/* Top Categories */}
        <div className="mb-6 mt-12 grid grid-cols-3 gap-8 md:grid-cols-6">
          {categoriesData?.getCategories.categories?.map(category => (
            <CategoryCard category={category} key={category.id} />
          ))}
        </div>

        <h3 className="h3 mt-12 mb-6">Top Restaurants</h3>
        <div className="mb-12 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {restaurantData?.pubicGetRestaurants.restaurants?.map(restaurant => (
            <RestaurantCard restaurant={restaurant as Restaurant} key={restaurant.id} />
          ))}
        </div>

        {/* Load More button */}
        {restaurantData?.pubicGetRestaurants.hasNext && (
          <div className="mb-16 text-center">
            <button
              className={clsx("btn btn-active btn-sm w-30 h-10", {
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

export const getServerSideProps = async (_: GetStaticPropsContext) => {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: PubicGetRestaurantsDocument,
    variables: pageState,
  })

  await apolloClient.query({
    query: GetCategoriesDocument,
    variables: { ...pageState, take: 6 }, // take top 6
  })

  return addApolloState(apolloClient, {
    props: {},
  })
}
