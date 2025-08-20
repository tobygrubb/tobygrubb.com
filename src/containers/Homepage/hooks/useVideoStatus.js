import { useState, useRef, useEffect } from 'react'

export default function useVideoStatus() {
  const [videoLoaded, setVideoLoaded] = useState(false)
  const ref = useRef()

  useEffect(() => {
    ref.current.onloadeddata = () => setVideoLoaded(true)
  }, [])

  return { videoLoaded, ref }
}
