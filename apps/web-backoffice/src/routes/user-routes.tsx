import { Navigate, RouteObject } from "react-router-dom"
import AdminsPage from "src/pages/admins-page"
import CustomersPage from "src/pages/customers-page"
import DriversPage from "src/pages/drivers-page"

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
