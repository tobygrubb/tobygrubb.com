import { createRef, useEffect, useState } from 'react'

export default function useCutoff(cutoff) {
  const [isCutoff, setCutoffState] = useState(true)
  const ref = createRef()

  useEffect(() => {
    const node = ref.current

    const calc = () => {
      if (node) {
        const width = node.offsetWidth
        setCutoffState(width < cutoff)
      }
    }

    calc()

    window.addEventListener('resize', calc)

    return () => {
      window.removeEventListener('resize', calc)
    }
    // eslint-disable-next-line
  }, [])

  return { ref, visible: !isCutoff }
}
