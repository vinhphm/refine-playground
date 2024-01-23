import { memo, useEffect, useState } from 'react'

interface MarkerProps extends google.maps.MarkerOptions {
  onClick?: () => void
}

// eslint-disable-next-line react-refresh/only-export-components
const Marker = ({ onClick, ...options }: MarkerProps) => {
  const [marker, setMarker] = useState<google.maps.Marker>()

  useEffect(() => {
    if (!marker)
      setMarker(new google.maps.Marker())

    // remove marker from map on unmount
    return () => {
      if (marker)
        marker.setMap(null)
    }
  }, [marker])

  useEffect(() => {
    if (marker) {
      marker.setOptions({
        ...options,
        clickable: !!onClick,
      })
      marker.addListener('click', () => {
        onClick?.()
      })
    }

    return () => {
      if (marker)
        google.maps.event.clearListeners(marker, 'click')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [marker, options])

  return null
}

// eslint-disable-next-line react-refresh/only-export-components
export default memo(Marker)
