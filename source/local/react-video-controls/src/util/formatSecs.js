import TimeFormat from 'hh-mm-ss'

export default function formatSecs(secs) {
  const rounded = Math.round(secs)
  const formatted = TimeFormat.fromS(rounded)
  return formatted
}
