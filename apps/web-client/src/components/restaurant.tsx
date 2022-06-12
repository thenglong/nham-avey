import Link from "next/link"

interface RestaurantProps {
  id: string
  coverImg: string
  name: string
  categoryName?: string
}

export const Restaurant = ({ id, coverImg, name, categoryName }: RestaurantProps) => (
  <Link href={`/restaurants/${id}`}>
    <div className="flex flex-col">
      <div
        style={{ backgroundImage: `url(${coverImg})` }}
        className="mb-3 bg-cover bg-center py-28"
      />
      <h3 className="text-xl font-medium">{name}</h3>
      <span className="mt-2 border-t border-gray-400 py-2 text-xs opacity-50">
        {categoryName}
      </span>
    </div>
  </Link>
)
