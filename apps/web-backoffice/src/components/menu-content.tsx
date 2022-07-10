import { QuestionOutlined, UserOutlined } from "@ant-design/icons"
import { Menu } from "antd"
import { ItemType } from "antd/lib/menu/hooks/useItems"
import { useNavigate } from "react-router-dom"

type LinkItemType = ItemType & {
  path: string
}

const items: LinkItemType[] = [
  {
    key: "restaurants",
    title: "Restaurants",
    label: "Restaurants",
    path: "/app/restaurants",
    icon: <QuestionOutlined />,
  },
  {
    key: "users",
    title: "Restaurants",
    label: "Users",
    path: "/app/users",
    icon: <UserOutlined />,
  },
]

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
      items={items.map(item => ({ ...item, onClick: () => navigate(item.path) }))}
    />
  )
}

export default MenuContent
