import { useState, useEffect } from 'react'
import { fetchPrayerTimes } from '../lib/api'

const PRAYER_KEYS = ['Fajr','Sunrise','Dhuhr','Asr','Maghrib','Isha']
const ICONS = { Fajr:'🌙', Sunrise:'🌅', Dhuhr:'☀️', Asr:'🌤', Maghrib:'🌆', Isha:'🌌' }
const ARABIC = { Fajr:'الفجر', Sunrise:'الشروق', Dhuhr:'الظهر', Asr:'العصر', Maghrib:'المغرب', Isha:'العشاء' }

function toMins(t) { const [h,m]=t.split(':').map(Number); return h*60+m }
function fmt12(t) { const [h,m]=t.split(':').map(Number); const ap=h>=12?'PM':'AM'; return `${h%12||12}:${String(m).padStart(2,'0')} ${ap}` }

export function usePrayerTimes(lat, lng, method = 2) {
  const [prayers, setPrayers] = useState([])
  const [meta, setMeta] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (lat == null || lng == null) return
    setLoading(true)
    fetchPrayerTimes(lat, lng, method).then(data => {
      const nowMins = new Date().getHours()*60 + new Date().getMinutes()
      let foundNext = false
      const list = PRAYER_KEYS.map(key => {
        const raw = data.timings[key]
        const mins = toMins(raw)
        const isPast = mins <= nowMins
        const isNext = !isPast && !foundNext && key !== 'Sunrise'
        if (isNext) foundNext = true
        return { key, name: key, arabic: ARABIC[key], icon: ICONS[key], timeStr: fmt12(raw), mins, isPast, isNext }
      })
      setPrayers(list)
      setMeta(data.meta)
      setLoading(false)
    }).catch(e => { setError(e.message); setLoading(false) })
  }, [lat, lng, method])

  return { prayers, meta, loading, error }
}
