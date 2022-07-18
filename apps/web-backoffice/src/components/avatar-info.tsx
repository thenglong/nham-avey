import clsx from "clsx"
import LazyAvatar from "src/components/lazy-avatar"

interface AvatarInfoProps {
  title: string
  photoUrl: string
  subTitle?: string
  blurhash?: string
  reverse?: boolean
}

export const AvatarInfo = ({
  title,
  subTitle,
  photoUrl,
  blurhash,
  reverse,
}: AvatarInfoProps) => {
  return (
    <div
      className={clsx("flex h-16 items-center", {
        "flex-row-reverse": reverse,
      })}
    >
      <div className="rounded-full ring-2 ring-offset-2">
        <LazyAvatar
          photoUrl={photoUrl}
          alt={title}
          name={title}
          blurhash={blurhash}
          size={50}
        />
      </div>
      <div
        className={clsx("mx-2", {
          "text-right": reverse,
        })}
      >
        <div>
          <div className="font-semibold">{title} </div>
        </div>
        <div className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-gray-700">
          {subTitle}
        </div>
      </div>
    </div>
  )
}

export default AvatarInfo
