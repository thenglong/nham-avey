import Link from "next/link"

export const ProfileLinkButton = () => {
  return (
    <Link href="/profile">
      <a className="avatar">
        <div className="h-10 rounded-xl ring-2 ring-primary ring-offset-1 transition-shadow ease-in-out hover:ring-primary-focus hover:ring-offset-2">
          <img src="https://placeimg.com/192/192/people" alt="profile" />
        </div>
      </a>
    </Link>
  )
}

export default ProfileLinkButton
