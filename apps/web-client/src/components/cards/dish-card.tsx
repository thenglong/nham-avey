import React, { CSSProperties } from "react"

import { PlusIcon } from "@heroicons/react/solid"
import Link from "next/link"

export const DishCard = () => {
  return (
    <Link href="/dish/">
      <a className="restaurant-card card aspect-[10/12] w-full ring-1 ring-base-200 hover:shadow-lg">
        <figure className="!block h-3/5 w-full overflow-hidden object-cover">
          <div className="h-full w-full p-4 pb-0">
            <div
              style={
                {
                  "--image-url": `url(https://source.unsplash.com/random/?food,dish)`,
                } as CSSProperties
              }
              className="restaurant-card-image h-full w-full rounded-2xl bg-cover object-cover"
            />
          </div>
        </figure>
        <div className="p-6 p-4">
          <h3 className="h6">Food Name</h3>
          <p className="body-2 mt-1 inline text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A,
            numquam!
          </p>
          <div className="flex items-end justify-between">
            <p className="h4 mt-3">$10.999</p>
            <button className="btn btn-ghost h-8 min-h-max w-8 rounded bg-blue-100 p-0">
              <PlusIcon className="h-4 text-secondary" />
            </button>
          </div>
        </div>
      </a>
    </Link>
  )
}

export default DishCard
