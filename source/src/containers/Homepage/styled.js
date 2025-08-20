import styled, { css } from 'styled-components/macro'
import theme from 'styles/theme'

const Styled = {}

Styled.Homepage = styled.div`
  width: 100vw;
  height: var(--windowHeight);
  position: relative;
  z-index: 40;
  overflow: hidden;
`

Styled.Inner = styled.div`
  height: calc(var(--windowHeight) - ${theme.margin.navMobile});
  width: calc(100vw - ${theme.margin.navMobile});
  margin: 0 auto;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  overflow: hidden;

  ${theme.media.tablet`
    height: calc(var(--windowHeight) - ${theme.margin.nav});
    width: calc(100vw - ${theme.margin.nav});
  `}
`

Styled.Media = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

Styled.Image = styled.image(Styled.Media)
Styled.Video = styled.video(Styled.Media)

export default Styled
