import Link from "next/link"

export const HomeLogoLink = () => {
  return (
    <Link href="/">
      <a className="h-[90%] pl-0 text-xl normal-case">
        <img
          className="h-full w-full"
          src="/images/logo.png"
          alt="Nham avey logo"
        />
      </a>
    </Link>
  )
}

export default HomeLogoLink
