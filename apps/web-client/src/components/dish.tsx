import { ReactNode } from "react"

import { restaurant_restaurant_restaurant_menu_options } from "__generated__/restaurant"

interface DishProps {
  id?: number
  isSelected?: boolean
  description: string
  name: string
  price: number
  isCustomer?: boolean
  orderStarted?: boolean
  options?: restaurant_restaurant_restaurant_menu_options[] | null
  addItemToOrder?: (dishId: number) => void
  removeFromOrder?: (dishId: number) => void
  children: ReactNode
}

export const Dish = ({
  id = 0,
  isSelected,
  description,
  name,
  price,
  isCustomer = false,
  orderStarted = false,
  options,
  addItemToOrder,
  removeFromOrder,
  children: dishOptions,
}: DishProps) => {
  const onClick = () => {
    if (orderStarted) {
      if (!isSelected && addItemToOrder) {
        return addItemToOrder(id)
      }
    }
    if (isSelected && removeFromOrder) {
      return removeFromOrder(id)
    }
  }

  return (
    <div
      className={`cursor-pointer border px-8 py-4 transition-all ${
        isSelected ? "border-gray-800" : "hover:border-gray-800"
      }`}
    >
      <div className="mb-5">
        <h3 className="flex items-center text-lg font-medium">
          {name}{" "}
          {orderStarted && (
            <button
              className={`ml-3 py-1 px-3 text-sm text-white  focus:outline-none ${
                isSelected ? "bg-red-500" : " bg-lime-600"
              }`}
              onClick={onClick}
            >
              {isSelected ? "Remove" : "Add"}
            </button>
          )}
        </h3>
        <h4 className="font-medium">{description}</h4>
      </div>
      <span>$ {price}</span>
      {isCustomer && options && options?.length !== 0 && (
        <div>
          <h5 className="mt-6 mb-3 font-medium">Dish Options</h5>
          <div className="grid justify-start gap-2"> {dishOptions}</div>
        </div>
      )}
    </div>
  )
}
