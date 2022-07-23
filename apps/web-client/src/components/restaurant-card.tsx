import Link from "next/link"

import { Restaurant } from "@nham-avey/common"

interface RestaurantCardProps {
  restaurant: Restaurant
}

export const RestaurantCard = ({ restaurant }: RestaurantCardProps) => (
  <Link href={`/restaurant/${restaurant.id}`}>
    <a
      className="ring-accent hover:ring-accent-focus card bg-base-100 hover:bg-base-200 aspect-[12/10] w-full ring-2 transition-colors duration-500 ease-in-out"
      target="_blank"
    >
      <figure className="!block h-1/2 w-full object-cover">
        <img
          src={restaurant.coverImageUrls?.[0] || "https://placeimg.com/400/225/food"}
          className="h-full w-full object-cover"
          alt="Shoes"
        />
      </figure>
      <div className="card-body p-6 pt-3">
        <h2 className="card-title">{restaurant.name}</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className="card-actions justify-end">
          <button className="btn btn-accent">Buy Now</button>
        </div>
      </div>
    </a>
  </Link>
)

export default RestaurantCard
