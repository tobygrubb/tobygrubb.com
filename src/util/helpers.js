export const asText = (field) => {
  const newString = field.map((item) => item.text).join('')
  return newString
}
