import Link from "next/link"

import { Restaurant } from "@nham-avey/common"

interface RestaurantCardProps {
  restaurant: Restaurant
}

export const RestaurantCard = ({ restaurant }: RestaurantCardProps) => (
  <Link href={`/restaurants/${restaurant.id}`}>
    <a className="card bg-base-100 aspect-[12/10] w-full ring-1">
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
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </a>
  </Link>
)

export default RestaurantCard
