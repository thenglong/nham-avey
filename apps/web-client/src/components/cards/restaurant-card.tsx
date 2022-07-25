import { CSSProperties, MouseEventHandler, useState } from "react"

import {
  ClockIcon,
  StarIcon as StarIconOutline,
} from "@heroicons/react/outline"
import { StarIcon as StarIconSolid } from "@heroicons/react/solid"
import Link from "next/link"

import { Restaurant } from "@nham-avey/common"

interface RestaurantCardProps {
  restaurant: Restaurant
}

export const RestaurantCard = ({ restaurant }: RestaurantCardProps) => {
  const firstCategory = restaurant.categories?.[0]
  const [isFavorite, setIsFavorite] = useState(Math.random() > 0.5) // TODO

  const handleToggleFavorite: MouseEventHandler<HTMLButtonElement> = event => {
    event.preventDefault()
    event.stopPropagation()
    event.nativeEvent.stopImmediatePropagation()
    setIsFavorite(isFavorite => !isFavorite)
  }

  return (
    <Link href={`/restaurant/${restaurant.slug}`}>
      <a className="restaurant-card card aspect-[12/10] w-full ring-1 ring-base-200 hover:shadow-lg">
        <figure className="!block h-2/3 w-full overflow-hidden object-cover">
          <div
            style={
              {
                "--image-url": `url(${restaurant.coverImageUrls?.[0]})`,
              } as CSSProperties
            }
            className="restaurant-card-image h-full w-full bg-cover object-cover"
          />
        </figure>
        <div className="flex flex-row p-6 p-4">
          <div className="flex-[4]">
            <h3 className="h6">{restaurant.name}</h3>
            <div className="mt-1.5 flex items-center justify-start">
              <ClockIcon className="mr-2 h-4" />
              <p className="small-2 inline text-gray-500">30-40 min</p>
              <span className="small-2 mx-2 text-primary">•</span>
              <p className="small-2 inline text-gray-500">From $10</p>
            </div>
            <div className="mt-3 h-8 overflow-hidden">
              {firstCategory && (
                <button className="btn btn-ghost h-8 min-h-fit w-max gap-1 rounded-2xl bg-base-200 px-3 normal-case">
                  <img
                    className="h-4"
                    src={
                      firstCategory?.iconUrl ||
                      "https://storage.googleapis.com/nham-avey-dev.appspot.com/fb00b8f3-4c8b-4f8f-b4ef-a752b90d2af5.png"
                    }
                    alt=""
                  />
                  <span className="pt-0.5">{firstCategory.name}</span>
                </button>
              )}
            </div>
          </div>
          <div className="flex-1 text-right">
            {isFavorite ? (
              <button className="w-6 opacity-80" onClick={handleToggleFavorite}>
                <StarIconSolid className="text-primary" />
              </button>
            ) : (
              <button
                className="w-6 p-0.5 opacity-80"
                onClick={handleToggleFavorite}
              >
                <StarIconOutline />
              </button>
            )}
          </div>
        </div>
      </a>
    </Link>
  )
}

export default RestaurantCard
