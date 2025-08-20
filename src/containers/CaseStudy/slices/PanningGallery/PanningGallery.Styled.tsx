import styled from 'styled-components'

const Wrapper = styled.div<{ isCursor?: boolean }>`
  cursor: ${props => (props.isCursor ? 'none' : 'inherit')};
  overflow: hidden;
  outline: none !important;
  width: 100%;

  img {
    width: 100%; /* half-width */
  }

  .flickity-slider {
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
  }
`

const ImageWrapper = styled.div<{ width?: number }>`
  width: ${props => (props.width ? props.width : 70)}%;
  padding: 0.5rem;
  box-sizing: border-box;
`

const Cursor = styled.div<{ visible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  display: ${props => (props.visible ? 'block' : 'fixed')};
  mix-blend-mode: exclusion;
  pointer-events: none;
  cursor: pointer;
`

const CursorInner = styled.div<{ inverted?: boolean }>`
  transform: translate3d(-50%, -50%, 0)
    ${props => (props.inverted ? 'rotate(180deg)' : '')};

  svg {
    width: 1.35em;
    display: block;
  }
`

export default { ImageWrapper, Wrapper, Cursor, CursorInner }
