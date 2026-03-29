import { useState, useRef, useEffect } from 'react'

export function useAdhan() {
  const [playing, setPlaying] = useState(null)
  const [loading, setLoading] = useState(false)
  const audioRef = useRef(null)

  const play = (url, key) => {
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null }
    if (playing === key) { setPlaying(null); return }
    setLoading(true)
    const audio = new Audio(url)
    audio.crossOrigin = 'anonymous'
    audio.oncanplaythrough = () => setLoading(false)
    audio.onended = () => setPlaying(null)
    audio.onerror = () => { setLoading(false); setPlaying(null) }
    audio.play().catch(() => setPlaying(null))
    audioRef.current = audio
    setPlaying(key)
  }

  const stop = () => {
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null }
    setPlaying(null)
  }

  useEffect(() => () => audioRef.current?.pause(), [])

  return { playing, loading, play, stop }
}
