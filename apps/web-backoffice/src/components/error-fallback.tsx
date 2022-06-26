import { FallbackProps } from "react-error-boundary"
import logger from "src/utils/logger-utils"

const ErrorFallback = ({ error, resetErrorBoundary: _ }: FallbackProps) => {
  logger.error("ErrorFallback", error)
  return <p>Somethings went wrong</p>
}

export default ErrorFallback
