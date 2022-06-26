import { isBlurhashValid } from "blurhash"
import { Blurhash } from "react-blurhash"
import { ErrorBoundary } from "react-error-boundary"
import ErrorFallback from "src/components/error-fallback"

interface BlurhashPlaceholderProps {
  blurhash?: string
  size?: number
}

const DefaultBlurhashPlaceholder = ({
  blurhash = "",
  size = 35,
}: BlurhashPlaceholderProps) => {
  if (!blurhash || !isBlurhashValid(blurhash)) {
    return null
  }

  return (
    <Blurhash
      className="overflow-hidden rounded-full"
      hash={blurhash}
      width={size}
      height={size}
      resolutionX={4}
      resolutionY={4}
      punch={1}
    />
  )
}

const BlurhashPlaceholder = (props: BlurhashPlaceholderProps) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <DefaultBlurhashPlaceholder {...props} />
    </ErrorBoundary>
  )
}

export default BlurhashPlaceholder
