import { useEffect, useContext } from 'react'
import { VideoCtx } from 'react-video-controls'

export default function useAutoplay(shouldPlay) {
  const { video, controls } = useContext(VideoCtx)
  useEffect(
    () => {
      if (shouldPlay) {
        controls.play()
        video.ref.current.setAttribute("playsinline", null);
      } else {
        controls.pause()
        video.ref.current.removeAttribute("playsinline");
      }
    },
    // eslint-disable-next-line
    [shouldPlay]
  )
}
