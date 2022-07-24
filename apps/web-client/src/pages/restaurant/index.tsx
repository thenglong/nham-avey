import { useState } from "react"

import { NextSeo } from "next-seo"
import Link from "next/link"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"

import { Restaurant, useCategoriesQuery, useRestaurantsQuery } from "@nham-avey/common"
import RestaurantCard from "src/components/restaurant-card"

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
  const [page, setPage] = useState(1)
  const { data: data, loading } = useRestaurantsQuery({
    variables: pageState,
    notifyOnNetworkStatusChange: true,
  })

  interface IFormProps {
    searchTerm: string
  }

  const onPrevPageClick = () => setPage(current => current - 1)
  const onNextPageClick = () => setPage(current => current + 1)
  const { register, handleSubmit, getValues } = useForm<IFormProps>()
  const router = useRouter()

  const { data: categoriesData } = useCategoriesQuery({
    variables: { ...pageState, page: 1, take: 6 }, // take top 6
  })

  const onSearchSubmit = () => {
    const { searchTerm } = getValues()
    router.push({
      pathname: "/restaurant/search",
      search: `?term=${searchTerm}`,
    })
  }

  return (
    <div>
      <NextSeo title="Home | Nham Avey" />
      <form
        onSubmit={handleSubmit(onSearchSubmit)}
        className="flex w-full items-center justify-center bg-gray-800 py-40"
      >
        <input
          {...register("searchTerm", {
            required: true,
            min: 3,
          })}
          type="Search"
          className="input w-3/4 rounded-md border-0 md:w-3/12"
          placeholder="Search restaurants..."
        />
      </form>
      {!loading && (
        <div className="mx-auto mt-8 max-w-screen-2xl pb-20">
          <div className="mx-auto flex max-w-sm justify-around ">
            {categoriesData?.categories.categories?.map(category => (
              <Link href={`/category/${category.slug}`} key={category.id}>
                <div className="group flex cursor-pointer flex-col items-center">
                  <div
                    className="h-16 w-16 rounded-full bg-cover group-hover:bg-gray-100"
                    style={{ backgroundImage: `url(${category.coverImageUrl})` }}
                  ></div>
                  <span className="mt-1 text-center text-sm font-medium">
                    {category.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-16 grid gap-x-5 gap-y-10 md:grid-cols-3">
            {data?.restaurants?.restaurants?.map(restaurant => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant as Restaurant} />
            ))}
          </div>
          <div className="mx-auto mt-10 grid max-w-md grid-cols-3 items-center text-center ">
            {page > 1 ? (
              <button
                onClick={onPrevPageClick}
                className="text-2xl font-medium focus:outline-none"
              >
                &larr;
              </button>
            ) : (
              <div></div>
            )}
            <span>
              Page {page} of {data?.restaurants.pageCount}
            </span>
            {page !== data?.restaurants.pageCount ? (
              <button
                onClick={onNextPageClick}
                className="text-2xl font-medium focus:outline-none"
              >
                &rarr;
              </button>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default RestaurantsPage
