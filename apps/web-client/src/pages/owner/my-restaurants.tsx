import { NextSeo } from "next-seo"
import Link from "next/link"

import { useMyRestaurantsQuery } from "../../__generated__/types.react-apollo"
import { Restaurant } from "../../components/restaurant"

export const MyRestaurantsPage = () => {
  const { data } = useMyRestaurantsQuery()

  return (
    <div>
      <NextSeo title="My Restaurants | Nham Avey" />
      <div className="mx-auto mt-32 max-w-screen-2xl">
        <h2 className="mb-10 text-4xl font-medium">My Restaurants</h2>
        {data?.myRestaurants.ok && data.myRestaurants.restaurants.length === 0 ? (
          <>
            <h4 className="mb-5 text-xl">You have no restaurants</h4>
            <Link className="text-lime-600 hover:underline" href="/add-restaurant">
              Create one &rarr;
            </Link>
          </>
        ) : (
          <div className="mt-16 grid gap-x-5 gap-y-10 md:grid-cols-3">
            {data?.myRestaurants.restaurants.map(restaurant => (
              <Restaurant
                key={restaurant.id}
                id={restaurant.id + ""}
                coverImg={restaurant.coverImg}
                name={restaurant.name}
                categoryName={restaurant.category?.name}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
