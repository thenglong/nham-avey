import { CSSProperties, Suspense } from "react"

import { Grid, Layout } from "antd"
import { Outlet } from "react-router-dom"
import Footer from "src/components/footer"
import HeaderNav from "src/components/header-nav"
import LoadingIndicator from "src/components/loading-indicator"
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
            <Content>
              <Suspense fallback={<LoadingIndicator cover="content" />}>
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
