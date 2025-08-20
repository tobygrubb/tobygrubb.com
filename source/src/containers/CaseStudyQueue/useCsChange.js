import { useContext, useState } from 'react'
import theme from 'styles/theme'
import { LayoutContext } from 'containers/Layout/Layout'

export default function useCsChange({ history }) {
  const [isAnimating, setIsAnimating] = useState(false)
  const { nextUid } = useContext(LayoutContext).csState

  const commitQueueChange = () => {
    history.push(`/work/${nextUid}`)
    setIsAnimating(false)
  }

  const initCsChange = () => {
    setTimeout(commitQueueChange, theme.rootTransition.duration)
    setIsAnimating(true)
  }

  return { initCsChange, isAnimating }
}
