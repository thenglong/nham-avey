import { useState } from "react"

import { useFirebaseAuthState, useMeQuery } from "@nham-avey/common"
import ProfileLinkButton from "src/components/buttons/profile-link-button"
import { Hamburger } from "src/components/hamburger"
import LogoLink from "src/components/links/logo-link"
import LargeScreenMenu from "src/components/menu/large-screen-menu"
import SmallScreenMenu from "src/components/menu/small-screen-menu"
import firebaseServices from "src/services/firebase-services"

const { auth } = firebaseServices

export const Header = () => {
  const { user } = useFirebaseAuthState(auth)
  const { data } = useMeQuery({ skip: !user })
  const [isExpanded, setIsExpanded] = useState(false)

  const handleToggleMenu = () => setIsExpanded(prevState => !prevState)

  return (
    <header className="border-b-[1px] border-base-300 shadow">
      <div className="subtitle-1 container navbar mx-auto h-20 justify-between bg-base-100 px-4 lg:px-8">
        <div className="navbar-start h-full">
          <LogoLink />
        </div>

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
              isOpen={isExpanded}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            />
          </button>
        </div>
      </div>
      <SmallScreenMenu isOpen={isExpanded} isLoggedIn={!!data?.me} />
    </header>
  )
}
