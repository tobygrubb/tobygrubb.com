import media, { sizes } from 'styles/media'
import modularScale from './util/modularScale'

const scale = modularScale({
  base: 1,
  scale: 1.25,
  stepsDown: 3,
})

const fontSizes = scale.map((num) => `${num}rem`)

const margin = {
  lg: '5em',
  md: '2em',
  nav: '80px',
  navMobile: '40px',
}

const lineHeights = {
  single: 1,
  heading: 1.25,
  tight: 1.4,
  body: 1.85,
  loose: 2.25,
}

const fontFaces = {
  body: `'calibre-light', arial, sans-serif`,
  bodyBold: `'calibre-regular', arial, sans-serif`,
  display: `'domaineDiaplay-black', 'Times New Roman', Times, serif`,
  serif: `'TiemposHeadlineWeb-Light', 'Times New Roman', Times, serif`,
}

const grey = ['#111', '#333', '#666', '#999', '#ccc', '#eee', '#f9f9f9']
const color = {
  white: '#fff',
  black: '#000',
  primary: grey[0],
  caseStudyBg: grey[6],
  textLt: grey[2],
}

const ease = {
  standard: 'cubic-bezier(.4, 0, .2, 1)',
  decel: 'cubic-bezier(0, 0, .2, 1)',
  accel: 'cubic-bezier(.4, 0, 1, 1)',
}

export const mq = Object.keys(sizes).reduce(
  (acc, current) => ({
    ...acc,
    [current]: `(min-width: ${sizes[current]}px)`,
  }),
  {}
)

const theme = {
  ...{ color, margin, media, ease, fontSizes, scale, lineHeights, fontFaces },

  _h3: `
    font-size: ${fontSizes[0]};
    line-height: ${lineHeights.loose};
    letter-spacing: 1px;
    text-transform: uppercase;
    font-family: ${fontFaces.bodyBold};
  `,

  _wrapNav: `
    padding-left 40px;
    padding-right: 40px;

    ${media.tablet`
      padding-left 80px;
      padding-right: 80px;
    `};
  `,

  _padding: `
    ${media.tablet`
      padding: 0 4%;
    `}
  `,

  _wrap: `
    margin: 0px auto;
    padding: 0 8%;

    ${media.tablet`
      max-width: 1500px;
      width: 80%;
      padding: 0;
    `}
  `,

  _wrapDub: `
    margin: 0px auto;
    padding: 0 8%;

    max-width: 960px;
    width: 66.67%;
  `,

  _grid: `
    margin: 0 auto;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    display: block;

    ${media.tablet`display: flex;`}
  `,

  rootTransition: {
    duration: 600,
    ease: [0.4, 0, 0.2, 1],
  },
}

export default theme
