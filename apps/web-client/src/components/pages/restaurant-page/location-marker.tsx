import { LocationMarkerIcon } from "@heroicons/react/solid"

export interface LocationMarkerProps {
  lat?: number
  lng?: number
}

export const LocationMarker = (_props: LocationMarkerProps) => (
  <LocationMarkerIcon className="h-10 w-10 text-primary" />
)

export default LocationMarker
