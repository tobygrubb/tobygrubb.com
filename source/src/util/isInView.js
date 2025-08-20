const isInView = (rect, offset = 0) => {
  const isBelowVpTop = rect.bottom - offset <= 0
  const isAboveVpBottom = rect.top - window.innerHeight - offset <= 0
  return isAboveVpBottom !== isBelowVpTop
}

export default isInView
