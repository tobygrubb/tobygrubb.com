import useDOMWidth from 'hooks/useDOMWidth'

export default function useBorderRadiusPercent(ref, percent) {
  const width = useDOMWidth(ref)
  const percentCalc = (percent / 100) * width

  return percentCalc
}
