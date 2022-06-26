import { RouteObject, Navigate, Outlet } from "react-router-dom"
import AppLayout from "src/components/layout/app-layout"
import { APP_PREFIX_PATH } from "src/config/app-config"

const defaultAppRoutes: RouteObject[] = [
  {
    path: "*",
    element: <Navigate to={APP_PREFIX_PATH} />,
  },
  {
    path: APP_PREFIX_PATH,
    element: <AppLayout />,
    children: [
      {
        path: "users",
        element: <Outlet />,
        children: [
          {
            path: "customers",
            element: <CustomersPage />,
          },
          {
            path: "drivers",
            element: <DriversPage />,
          },
          {
            path: "admins",
            element: <AdminsPage />,
          },
          {
            path: "",
            element: <Navigate to="customers" />,
          },
        ],
      },
    ],
  },
]

export default defaultAppRoutes
