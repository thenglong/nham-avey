import { useDeviceSelectors } from "react-device-detect"

const useIsMobile = () => {
  const [selectors] = useDeviceSelectors(window.navigator.userAgent)
  return selectors.isMobile
}

export default useIsMobile
