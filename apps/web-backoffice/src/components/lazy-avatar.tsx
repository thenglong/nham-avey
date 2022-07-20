import { Avatar } from "antd"
import initials from "initials"
import { LazyLoadImage } from "react-lazy-load-image-component"
import BlurhashPlaceholder from "src/components/blurhash-placeholder"

interface LazyAvatarProps {
  photoUrl?: string
  alt?: string
  blurhash?: string
  name?: string
  size?: number
}

const LazyAvatar = ({
  photoUrl,
  alt,
  blurhash = "",
  name = "",
  size = 35,
}: LazyAvatarProps) => {
  if (photoUrl)
    return (
      <LazyLoadImage
        alt={alt}
        src={photoUrl}
        useIntersectionObserver
        style={{ height: size, width: size }}
        className="rounded-full object-contain"
        placeholder={<BlurhashPlaceholder blurhash={blurhash} size={size} />}
      />
    )

  return (
    <Avatar size={size} className="bg-primary">
      {initials(name)}
    </Avatar>
  )
}

export default LazyAvatar
