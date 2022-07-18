import { lazy } from "react"

import { Navigate, RouteObject } from "react-router-dom"

const RestaurantsPage = lazy(() => import("src/pages/restaurants-page"))

const restaurantRoute: RouteObject[] = [
  {
    path: "",
    element: <Navigate to="restaurants" />,
  },
  {
    path: "restaurants",
    element: <RestaurantsPage />,
  },
  {
    path: "*",
    element: <Navigate to="restaurants" />,
  },
]

export default restaurantRoute
