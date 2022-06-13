import { faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"

import { useGetMeQuery } from "../__generated__/types.react-apollo"

export const Header = () => {
  const { data } = useGetMeQuery()

  return (
    <>
      {!data?.me.verified && (
        <div className="bg-red-500 p-3 text-center text-base text-white">
          <span>Please verify your email</span>
        </div>
      )}
      <header className="py-4">
        <div className="item-center mx-auto flex w-full max-w-screen-xl justify-between px-5 xl:px-0">
          <Link href="/">
            <h1 className="my-10 w-52 text-4xl font-semibold">Nham Avey</h1>
          </Link>
          <span className="text-xs">
            <Link href="/edit-profile">
              <FontAwesomeIcon icon={faUser} className="text-xl" /> {data?.me.email}
            </Link>
          </span>
        </div>
      </header>
    </>
  )
}
