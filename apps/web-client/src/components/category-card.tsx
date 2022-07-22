import Link from "next/link"

import { Category } from "@nham-avey/common"

interface CategoryCardProps {
  category: Category
}

export const CategoryCard = ({ category }: CategoryCardProps) => (
  <Link href={`/category/${category.slug}`}>
    <a className="rounded-2xl p-3 text-center ring-2">
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
