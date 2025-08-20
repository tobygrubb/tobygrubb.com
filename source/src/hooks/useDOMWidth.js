import { useEffect, useState } from 'react'
import useWindowSize from './useWindowSize'

export default function useDOMWidth(ref) {
  const [width, setWidth] = useState(0)
  const windowWidth = useWindowSize().width

  useEffect(
    () => {
      setWidth(ref.current.offsetWidth)
    },
    // eslint-disable-next-line
    [windowWidth]
  )

  return width
}
