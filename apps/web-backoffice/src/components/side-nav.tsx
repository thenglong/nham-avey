import { Layout } from "antd"
import { Scrollbars } from "react-custom-scrollbars"
import { SIDE_NAV_WIDTH } from "src/constants/theme-constants"
import { useTypedSelector } from "src/hooks/redux/use-typed-selector"

import MenuContent from "./menu-content"

const { Sider } = Layout

export const SideNav = () => {
  const navCollapsed = useTypedSelector(state => state.theme.navCollapsed)

  return (
    <Sider
      className="fixed top-[70px] z-[999] h-[calc(100vh-var(--header-height))] bg-white shadow-[0_1px_4px_-1px_rgba(0,0,0,.25)]"
      width={SIDE_NAV_WIDTH}
      collapsed={navCollapsed}
    >
      <Scrollbars autoHide>
        <MenuContent />
      </Scrollbars>
    </Sider>
  )
}

export default SideNav
