import { useCallback, useMemo } from "react"

import { QuestionOutlined, UserOutlined } from "@ant-design/icons"
import { Grid, Menu } from "antd"
import { ItemType } from "antd/lib/menu/hooks/useItems"
import { useNavigate } from "react-router-dom"
import useThemeActions from "src/hooks/redux/use-theme-actions"

const { useBreakpoint } = Grid

const MenuContent = () => {
  const navigate = useNavigate()
  const breakpoint = useBreakpoint()
  const { toggleMobileNav } = useThemeActions()

  const isMobile = !breakpoint.lg

  const handleItemClick = useCallback(
    (link: string) => {
      if (isMobile) toggleMobileNav(false)

      navigate(link)
    },
    [isMobile, navigate, toggleMobileNav]
  )

  const items: ItemType[] = useMemo(
    () => [
      {
        key: "restaurants",
        title: "Restaurants",
        label: "Restaurants",
        onClick: () => handleItemClick("/app/restaurants/restaurants"),
        icon: <QuestionOutlined />,
      },
      {
        key: "users",
        title: "Users",
        label: "Users",
        icon: <UserOutlined />,
        children: [
          {
            key: "users.admins",
            title: "Restaurants",
            label: "Administrator",
            onClick: () => handleItemClick("/app/users/admins"),
            icon: <UserOutlined />,
          },
          {
            key: "users.drivers",
            title: "Drivers",
            label: "Drivers",
            onClick: () => handleItemClick("/app/users/drivers"),
            icon: <UserOutlined />,
          },
          {
            key: "users.customers",
            title: "Customers",
            label: "Customers",
            onClick: () => handleItemClick("/app/users/customers"),
            icon: <UserOutlined />,
          },
        ],
      },
    ],
    [handleItemClick]
  )

  return <Menu theme="light" mode="inline" className="h-max border-r-0" items={items} />
}

export default MenuContent
