import { useAdminGetRestaurantsQuery } from "@nham-avey/common"

export const AdminsPage = () => {
  const result = useAdminGetRestaurantsQuery()

  console.log(result)

  return <p>Admins Page</p>
}

export default AdminsPage
