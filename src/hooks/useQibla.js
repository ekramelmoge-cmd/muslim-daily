import { useState, useEffect } from 'react'
import { fetchQibla } from '../lib/api'

export function useQibla(lat, lng) {
  const [qiblaAngle, setQiblaAngle] = useState(null)
  const [heading, setHeading] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [hasCompass, setHasCompass] = useState(false)

  useEffect(() => {
    if (lat == null || lng == null) return
    fetchQibla(lat, lng).then(d => { setQiblaAngle(d); setLoading(false) }).catch(e => { setError(e.message); setLoading(false) })
  }, [lat, lng])

  useEffect(() => {
    const handler = e => {
      if (e.webkitCompassHeading != null) { setHeading(e.webkitCompassHeading); setHasCompass(true) }
      else if (e.alpha != null) { setHeading(360 - e.alpha); setHasCompass(true) }
    }
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission !== 'function') {
      window.addEventListener('deviceorientation', handler, true)
    }
    return () => window.removeEventListener('deviceorientation', handler, true)
  }, [])

  const requestCompass = async () => {
    if (typeof DeviceOrientationEvent?.requestPermission === 'function') {
      const perm = await DeviceOrientationEvent.requestPermission()
      if (perm === 'granted') {
        window.addEventListener('deviceorientation', e => {
          if (e.webkitCompassHeading != null) setHeading(e.webkitCompassHeading)
        }, true)
        setHasCompass(true)
      }
    }
  }

  return { qiblaAngle, heading, needleAngle: qiblaAngle != null ? qiblaAngle - heading : 0, hasCompass, loading, error, requestCompass }
}
