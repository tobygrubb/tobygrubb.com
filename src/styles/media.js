import { css } from 'styled-components'

const sizes = {
  // legacy
  desktop: 1200,
  laptop: 992,
  tablet: 768,
  phone: 576,

  // new
  xl: 1900,
  lg: 1440,
  md: 1024,
  sm: 768,
  xs: 576,
}

// Iterate through the sizes and create a media template
const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) =>
    css`
      @media (min-width: ${sizes[label]}px) {
        ${css(...args)}
      }
    `.join('')
  return acc
}, {})

export { sizes }
export default media
