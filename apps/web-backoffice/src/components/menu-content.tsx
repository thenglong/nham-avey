import { Menu } from "antd"
import { useNavigate } from "react-router-dom"

const MenuContent = () => {
  const navigate = useNavigate()
  return (
    <Menu
      theme="light"
      mode="inline"
      defaultSelectedKeys={[""]}
      selectedKeys={[""]}
      defaultOpenKeys={[""]}
      className="h-max border-r-0"
      items={[
        {
          key: "restaurants",
          title: "Restaurants",
          label: "Restaurants",
          onClick: () => navigate("/app/restaurants"),
        },
      ]}
    />
  )
}

export default MenuContent
