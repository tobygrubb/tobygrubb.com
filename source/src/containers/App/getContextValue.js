export default function getContextValue({ caseStudies, currentCs }) {
  const contextUids = caseStudies.map(cs => cs.uid)
  const csIndex = contextUids.indexOf(currentCs)
  const unselected = csIndex === -1

  let csData = {
    caseStudies,
    unselected,
    currentIndex: unselected ? undefined : csIndex,
  }

  if (!unselected) {
    const currentCsDoc = caseStudies[csIndex]
    const currentUid = currentCsDoc.uid
    const csDarkState = currentCsDoc.data.preserve_white_nav === 'true'
    const nextIndex = (csIndex + 1) % caseStudies.length
    const isLastCaseStudy = nextIndex === caseStudies.length
    const nextUsableIndex = isLastCaseStudy ? 0 : nextIndex
    const nextUid = caseStudies[nextUsableIndex].uid
    const csIsNotFound = contextUids.indexOf(currentCs) === -1
    const hasCurrentData = csIsNotFound && unselected

    csData = {
      ...csData,
      csIndex,
      currentCsDoc,
      currentUid,
      csDarkState,
      nextIndex,
      isLastCaseStudy,
      nextUsableIndex,
      nextUid,
      csIsNotFound,
      hasCurrentData,
    }
  }

  const data = {
    contextUids,
    csData,
  }

  return data
}
