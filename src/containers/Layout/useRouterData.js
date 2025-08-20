import { useContext, useState, useEffect } from 'react'
import { ApiDataCtx } from 'containers/App/App'

export default function useRouterData({ pathUid }) {
  const { contextUids } = useContext(ApiDataCtx)
  const [currentUid, setCurrentUid] = useState(pathUid)

  const currentIndex = (() => {
    const index = contextUids.indexOf(currentUid)
    return index > -1 ? index : null
  })()

  useEffect(() => {
    if (pathUid !== null) {
      setCurrentUid(pathUid)
    }
  }, [pathUid])

  const next = (() => {
    const nextIndex =
      currentIndex !== null ? (currentIndex + 1) % contextUids.length : 0
    const nextUid = contextUids[nextIndex]
    return {
      currentIndex,
      nextIndex,
      nextUid,
    }
  })()

  return {
    caseStudySelected: !!currentUid,
    inContext: currentIndex !== null,
    currentUid,
    ...next,
  }
}
