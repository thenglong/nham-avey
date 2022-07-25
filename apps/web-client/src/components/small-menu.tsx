import { Transition } from "@headlessui/react"
import Link from "next/link"

interface MobileMenuProps {
  isOpen: boolean
  isLoggedIn: boolean
}

export const SmallMenu = ({ isLoggedIn, isOpen }: MobileMenuProps) => {
  return (
    <Transition
      show={isOpen}
      enter="transition ease-out duration-100 transform"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="transition ease-in duration-75 transform"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      <div className="md:hidden" id="mobile-menu">
        <ul className="subtitle-1 menu menu-vertical p-0">
          {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
          <li tabIndex={0}>
            {isLoggedIn ? (
              <Link href="profile">View Profile</Link>
            ) : (
              <Link href="sign-in">Sign In</Link>
            )}
          </li>
          <li>
            <Link href="#">Promotions</Link>
          </li>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control,jsx-a11y/no-noninteractive-tabindex */}
          <li tabIndex={0}>
            <a>Nearby Restaurants</a>
          </li>
          <li>
            <a>Our Picks</a>
          </li>
        </ul>
      </div>
    </Transition>
  )
}

export default SmallMenu
