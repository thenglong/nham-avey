import { useState } from "react"

import { useMeQuery } from "@nham-avey/common"
import { Hamburger } from "src/components/hamburger"
import HomeLogoLink from "src/components/home-logo-link"
import LargeScreenMenu from "src/components/large-screen-menu"
import ProfileLinkButton from "src/components/profile-link-button"
import SmallMenu from "src/components/small-menu"

export const Header = () => {
  const { data } = useMeQuery()
  const [isOpen, setIsOpen] = useState(false)

  const handleToggleMenu = () => setIsOpen(prevState => !prevState)

  return (
    <header className="border-b-[1px] border-base-300 shadow">
      <div className="subtitle-1 container navbar mx-auto h-20 bg-base-100 px-4 lg:px-8">
        <div className="navbar-start h-full">
          <HomeLogoLink />
        </div>
        <div className="grow"></div>
        <div className="navbar-end lg:flex">
          <div className="hidden gap-4 md:flex">
            <LargeScreenMenu />
            <ProfileLinkButton />
          </div>
          <button
            className="btn btn-ghost pr-1 hover:bg-transparent md:hidden"
            onClick={handleToggleMenu}
          >
            <Hamburger
              isOpen={isOpen}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            />
          </button>
        </div>
      </div>
      <SmallMenu isOpen={isOpen} isLoggedIn={!!data?.me} />
    </header>
  )
}
