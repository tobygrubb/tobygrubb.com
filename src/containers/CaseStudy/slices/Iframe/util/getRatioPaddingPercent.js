export default function getRatioPaddingPercent(ratoString) {
  const ratioVals = ratoString.split(':').map(string => parseInt(string, 10))
  const result = (ratioVals[1] / ratioVals[0]) * 100
  const isNum = typeof result === 'number'
  return isNum ? result : null
}
