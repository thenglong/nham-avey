import { lazy } from "react"

import { Navigate, RouteObject } from "react-router-dom"

const AdminsPage = lazy(() => import("src/pages/admins-page"))
const CustomersPage = lazy(() => import("src/pages/customers-page"))
const DriversPage = lazy(() => import("src/pages/drivers-page"))

const userRoutes: RouteObject[] = [
  {
    path: "",
    element: <Navigate to="admins" />,
  },
  {
    path: "admins",
    element: <AdminsPage />,
  },
  {
    path: "customers",
    element: <CustomersPage />,
  },
  {
    path: "drivers",
    element: <DriversPage />,
  },
  {
    path: "*",
    element: <Navigate to="customers" />,
  },
]

export default userRoutes
