import { CSSProperties, Suspense } from "react"

import { LoadingOutlined } from "@ant-design/icons"
import { Grid, Layout, Spin } from "antd"
import { Outlet } from "react-router-dom"
import Footer from "src/components/footer"
import HeaderNav from "src/components/header-nav"
import { MobileNav } from "src/components/mobile-nav"
import PageHeader from "src/components/page-header"
import { SideNav } from "src/components/side-nav"
import {
  HEADER_HEIGHT,
  SIDE_NAV_COLLAPSED_WIDTH,
  SIDE_NAV_WIDTH,
} from "src/constants/theme-constants"
import { useTypedSelector } from "src/hooks/redux/use-typed-selector"

const { Content } = Layout
const { useBreakpoint } = Grid

const AppLayoutSuspenseLoader = () => {
  return (
    <div className="grid h-full w-full place-items-center">
      <Spin indicator={<LoadingOutlined style={{ fontSize: 54 }} spin />} />
    </div>
  )
}

export const AppLayout = () => {
  const breakpoint = useBreakpoint()
  const { navCollapsed } = useTypedSelector(state => state.theme)

  const getLayoutGutter = (): number => {
    if (!breakpoint.lg) return 0
    return navCollapsed ? SIDE_NAV_COLLAPSED_WIDTH : SIDE_NAV_WIDTH
  }

  const getLayoutDirectionGutter = (): CSSProperties => {
    return { paddingLeft: getLayoutGutter(), transition: "all 0.3s ease" }
  }

  return (
    <Layout>
      <HeaderNav />
      <Layout>
        {breakpoint.lg && <SideNav />}
        <Layout
          style={{
            ...getLayoutDirectionGutter(),
          }}
        >
          <div
            className="relative mt-[70px] p-[25px]"
            style={{
              minHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
            }}
          >
            <PageHeader title="App Title" />
            <Content className="h-full">
              <Suspense fallback={<AppLayoutSuspenseLoader />}>
                <Outlet />
              </Suspense>
            </Content>
          </div>
          <Footer />
        </Layout>
      </Layout>
      {!breakpoint.lg && <MobileNav />}
    </Layout>
  )
}

export default AppLayout
