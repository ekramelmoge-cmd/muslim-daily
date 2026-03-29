import { useState, useEffect } from 'react'

export function useLocation() {
  const [state, setState] = useState({
    lat: null, lng: null, city: null,
    loading: true, error: null,
  })

  useEffect(() => {
    if (!navigator.geolocation) {
      setState({ lat: 44.9778, lng: -93.2650, city: 'Minneapolis', loading: false, error: null })
      return
    }
    navigator.geolocation.getCurrentPosition(
      async pos => {
        const { latitude: lat, longitude: lng } = pos.coords
        let city = 'Your Location'
        try {
          const r = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`)
          const d = await r.json()
          city = d.address?.city || d.address?.town || 'Your Location'
        } catch {}
        setState({ lat, lng, city, loading: false, error: null })
      },
      () => {
        setState({ lat: 44.9778, lng: -93.2650, city: 'Minneapolis', loading: false, error: null })
      },
      { timeout: 8000 }
    )
  }, [])

  return state
}
