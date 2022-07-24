import { motion } from "framer-motion"
import Link from "next/link"

import { Restaurant } from "@nham-avey/common"

interface RestaurantCardProps {
  restaurant: Restaurant
}

export const RestaurantCard = ({ restaurant }: RestaurantCardProps) => (
  <Link href={`/restaurant/${restaurant.slug}`}>
    <a className="ring-base-200 card bg-base-100 hover:bg-base-100 aspect-[12/10] w-full ring-1">
      <figure className="!block h-1/2 w-full object-cover">
        <motion.div
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.025, opacity: 0.75 }}
          style={{
            backgroundImage: `url(${restaurant.coverImageUrls?.[0]})`,
          }}
          className="h-full w-full bg-cover object-cover"
        />
      </figure>
      <div className="card-body p-6 pt-3">
        <h2 className="card-title">{restaurant.name}</h2>
      </div>
    </a>
  </Link>
)

export default RestaurantCard
