import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons"
import { Layout } from "antd"
import Clock from "react-live-clock"
import { Link } from "react-router-dom"
import Logo from "src/components/logo"
import useThemeActions from "src/hooks/redux/use-theme-actions"
import { useTypedSelector } from "src/hooks/redux/use-typed-selector"

import { NavProfile } from "./nav-profile"

const { Header } = Layout

interface HeaderNavProps {
  isMobile?: boolean
}

export const HeaderNav = ({ isMobile = false }: HeaderNavProps) => {
  const themeState = useTypedSelector(state => state.theme)

  const { navCollapsed, mobileNav } = themeState

  const { onMobileNavToggle, toggleCollapsedNav } = useThemeActions()

  const onToggle = () => {
    if (!isMobile) {
      toggleCollapsedNav(!navCollapsed)
    } else {
      onMobileNavToggle(!mobileNav)
    }
  }

  return (
    <Header className="fixed left-0 z-[1000] h-[70px] w-full bg-white pl-0 pr-3 shadow-md shadow-gray-200">
      <div className="flex w-full">
        <Link to="/app" className="w-36 md:w-[revert]">
          <Logo />
        </Link>
        <div className="relative flex w-full justify-between">
          <div className="flex">
            <ul className="ant-menu ant-menu-root ant-menu-horizontal">
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
              <li
                className="ant-menu-item ant-menu-item-only-child"
                onClick={() => {
                  onToggle()
                }}
              >
                {navCollapsed || isMobile ? (
                  <MenuUnfoldOutlined className="!text-[1.25rem]" />
                ) : (
                  <MenuFoldOutlined className="!text-[1.25rem]" />
                )}
              </li>
            </ul>
          </div>
          <div className="flex px-[1rem]">
            <Clock
              ticking
              format="dddd, MMMM Do, YYYY, h:mm:ss A"
              timezone="Asia/Bangkok"
              className="mr-10"
            />
            <NavProfile />
          </div>
        </div>
      </div>
    </Header>
  )
}

export default HeaderNav
