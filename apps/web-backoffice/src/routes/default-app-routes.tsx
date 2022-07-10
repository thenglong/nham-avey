import { Navigate, Outlet, RouteObject } from "react-router-dom"
import AppLayout from "src/components/layout/app-layout"
import { APP_PREFIX_PATH } from "src/config/app-config"
import userRoutes from "src/routes/user-routes"

export const USER_PREFIX_PATH = "users"

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
        path: "*",
        element: <Navigate to={USER_PREFIX_PATH} />,
      },
      {
        path: USER_PREFIX_PATH,
        element: <Outlet />,
        children: userRoutes,
      },
    ],
  },
]

export default defaultAppRoutes
