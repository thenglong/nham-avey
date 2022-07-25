import Link from "next/link"

import { Category } from "@nham-avey/common"

interface CategoryItemProps {
  category: Category
}

export const CategoryCard = ({ category }: CategoryItemProps) => (
  <Link href={`/category/${category.slug}`}>
    <a className="rounded-2xl p-3 text-center ring-2 ring-base-300 transition-shadow ease-in-out hover:ring-primary-focus hover:ring-offset-2">
      <img
        src={category.coverImageUrl as string}
        className="mx-auto h-6 w-6 bg-red-300"
        alt=""
      />
      <h6>{category.name}</h6>
    </a>
  </Link>
)

export default CategoryCard
