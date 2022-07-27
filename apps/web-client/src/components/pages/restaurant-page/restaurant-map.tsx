import React from "react"

import GoogleMapReact from "google-map-react"

import LocationMarker from "src/components/pages/restaurant-page/location-marker"

const defaultProps = {
  center: {
    lat: 11.556374,
    lng: 104.928207,
  },
  zoom: 11,
}

export const RestaurantMap = () => {
  return (
    <div className="h-full w-full">
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <LocationMarker lat={11.556374} lng={104.928207} />
      </GoogleMapReact>
    </div>
  )
}

export default RestaurantMap
