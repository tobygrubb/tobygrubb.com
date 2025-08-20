import { createGlobalStyle } from 'styled-components'
import media from './media'

const GlobalStyle = createGlobalStyle`
  body,
  html {
    font-size: 17.5px;
    ${media.sm`
      font-size: 19px;
    `}
    ${media.md`
      font-size: 20px;
    `}
    ${media.lg`
      font-size: 21.5px;
    `}
  }


  body {
    color: ${props => props.theme.color.primary};
    font-family: ${props => props.theme.fontFaces.body};
    line-height: ${props => props.theme.lineHeights.body};
    font-stretch: normal;
    font-style: normal;
    overflow: hidden;
  }

  strong {
    font-family: ${props => props.theme.fontFaces.bodyBold};
  }

  em,
  .em {
    font-style: italic;
  }

  h1,
  .h1 {
    font-size: ${props => props.theme.fontSizes[6]};
    line-height: 1.25;
    font-family: ${props => props.theme.fontFaces.body};

    ${media.xs`
      font-size: 1.4em;
    `}
  }


  h2,
  .h2 {
    font-size: ${props => props.theme.fontSizes[4]};
    line-height: ${props => props.theme.lineHeights.heading};
    font-family: ${props => props.theme.fontFaces.display};
  }


  h3,
  .h3 {
    font-size: ${props => props.theme.fontSizes[0]};
    line-height: ${props => props.theme.lineHeights.body};
    letter-spacing: .2em;
    text-transform: uppercase;
    font-family: ${props => props.theme.fontFaces.bodyBold};
  }

  h4 {
    font-size: ${props => props.theme.fontSizes.tight};
    line-height: ${props => props.theme.lineHeights.tight};
    font-family: ${props => props.theme.fontFaces.body};

    em {
      font-family: ${props => props.theme.fontFaces.serif};
      font-style: italic;
    }
  }

`

export default GlobalStyle
