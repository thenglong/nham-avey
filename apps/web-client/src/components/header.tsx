import { faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"

import { useGetMeQuery } from "@nham-avey/common"

export const Header = () => {
  const { data, loading } = useGetMeQuery()

  return (
    <header className="container mx-auto h-20 px-8">
      <div className="item-center mx-auto flex h-full w-full items-center justify-between">
        <Link href="/">
          <a className="h-full">
            <img className="h-full p-2" src="/images/logo.png" alt="Nham Avey Logo" />
          </a>
        </Link>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered input-accent ring-accent ml-8 w-full max-w-xs border-none !ring-2 focus:outline-none focus:ring-offset-2"
        />
        <div className="grow" />
        <span className="text-xs">
          <Link href="/edit-profile">
            <a>
              <FontAwesomeIcon icon={faUser} className="text-xl" /> {data?.getMe.email}
            </a>
          </Link>
        </span>
      </div>
    </header>
  )
}
