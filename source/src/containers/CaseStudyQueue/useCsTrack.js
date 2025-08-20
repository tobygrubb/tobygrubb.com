import { useContext } from 'react'
import { LayoutContext } from 'containers/Layout/Layout'
import { ApiDataCtx } from 'containers/App/App'

export default function useCsTrack() {
  const { contextUids } = useContext(ApiDataCtx)

  const {
    inContext,
    currentUid,
    caseStudySelected,
    nextIndex,
    currentIndex,
  } = useContext(LayoutContext).csState

  const csTrack = (() => {
    if (inContext) {
      return [contextUids[currentIndex], contextUids[nextIndex]]
      // If not in context
    } if (!caseStudySelected) {
      return [contextUids[0], null]
    }
    // If not in context
    return [currentUid, contextUids[0]]
  })()

  return csTrack
}
