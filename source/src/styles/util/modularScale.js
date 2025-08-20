const modularScale = options => {
  const length = options.length || 10
  const scale = options.scale || 1.25
  const base = options.base || 1
  const stepsDown = options.stepsDown || 0

  const adjustedBase = (() => {
    let result = base
    for (let i = 0; i < stepsDown; i += 1) {
      result /= scale
    }
    return result
  })()

  return Array.from({ length })
    .reduce(
      (acc, _, i) => [...acc, i > 0 ? acc[i - 1] * scale : adjustedBase],
      []
    )
    .map(item => Math.round(item * 100) / 100)
}

export default modularScale
