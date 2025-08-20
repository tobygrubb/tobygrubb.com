import screenfull from 'screenfull'
import { useState } from 'react'
import formatSecs from '../util/formatSecs'

export default function useContextSuppliment(ctxValue, wrapperRef) {
  const [video, state, functions, ref] = ctxValue
  const [seeking, setSeeking] = useState(false)

  const togglePlay = state.isPlaying ? functions.pause : functions.play

  function fullScreen() {
    if (ref.current && screenfull.enabled) {
      screenfull.toggle(wrapperRef.current || ref.current)
    }
  }

  return {
    state: {
      ...state,
      seeking,

      formatted: {
        duration: formatSecs(state.duration),
        time: formatSecs(state.time),
      },
    },
    ref,
    wrapperRef,
    controls: { ...functions, togglePlay, fullScreen, setSeeking },
    video,
  }
}
