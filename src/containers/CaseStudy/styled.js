import styled, { css } from 'styled-components/macro'
import hexRgb from 'hex-rgb'

const Styled = {}

Styled.CaseStudy = styled.article`
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  z-index: 30;
  position: relative;
  overflow: auto;
  transform: translate3d(0, 0, 0);

  ${({ isHome, openingFromHome }) =>
    isHome &&
    css`
      height: ${openingFromHome ? 'var(--windowHeight)' : '400px'};
      overflow: hidden;
    `}

  ${({ next }) =>
    next &&
    css`
      z-index: 10;
      pointer-events: none;
      position: fixed;
    `}
`

Styled.Inner = styled.div`
  color: ${({ textColor }) => textColor};
  background-color: ${({ background, theme }) =>
    background || theme.color.caseStudyBg};
  transform: translateZ(0);
  position: relative;

  ${({ textColor }) =>
    textColor &&
    css`
      a {
        border-bottom: 1px solid
          ${(props) => {
            const { red, green, blue } = hexRgb(props.textColor)
            return `rgba(${red}, ${green}, ${blue}, 0.2)`
          }};
      }
    `}
`

Styled.Shim = styled.div`
  position: ${(props) => (props.home ? 'fixed' : 'relative')};
  top: 0;
  left: 0;
  display: block;
  height: 400px;
  width: 100%;
  z-index: 100;
  cursor: pointer;
`

export default Styled
