import styled, { css } from 'styled-components/macro'
import _setPositionStyles from '../../util/_setPositionStyles'

const Styled = {}

const zIndex = {
  media: 0,
  aux: 20,
  fill: 0,
  splash: 10, // main
  header: 30,
}

Styled.Logo = styled.img`
  width: 140px;
  position: absolute;
  bottom: 130px;
  transform: translateY(calc(-50vh));
  @media (max-width: 475px) {
    transform: translateY(calc(-50vh + 140px));
    // top: unset;
    // transform: translateY(0);
    // bottom: 45%;
  }
  transition: transform 600ms ${({ theme }) => theme.ease.standard};
  ${({ next, csTransitioning }) => {
    if (next && !csTransitioning) {
      return css`
        transform: translateY(0);
        @media (max-width: 475px) {
          transform: translateY(0);
        }
      `
    }
    return null
  }}
`

Styled.Cover = styled.div`
  height: var(--windowHeight);
  width: 100%;
  position: relative;
  color: white;
  z-index: 1;
`

Styled.Fill = styled.div`
  background-color: ${({ backgroundColor }) => backgroundColor || '#161616'};
  height: var(--windowHeight);
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: ${zIndex.fill};
`

Styled.Header = styled.div`
  ${css(({ theme }) => theme._wrapNav)}
  position: absolute;
  box-s
  left: 0;
  top: 0;
  z-index: ${zIndex.header};
  transform: translate3d(0, 0, 0);
  bottom: 0;
  display: flex;
  align-items: flex-end;
  width 100%;
  box-sizing: border-box;
  padding-bottom: 150px;
  @media (max-width:475px) {
    padding-bottom: 60px;
  }
`

const Item = styled.div`
  margin-bottom: 3.5vh;
  transition:
    opacity 600ms ${({ theme }) => theme.ease.standard},
    transform 600ms ${({ theme }) => theme.ease.standard};

  ${({ itemTitle, next, csTransitioning, isHome }) => {
    if ((!itemTitle && next) || isHome) {
      return css`
        opacity: 0;
      `
    }
    if (itemTitle && next && !csTransitioning) {
      return css`
        transform: translateY(150px);
        opacity: 0;
      `
    }
    return null
  }}
`

Styled.Title = styled(Item)`
  margin-bottom: 15px;
  p {
    font-family: calibre-light;
    line-height: 0.9;
    font-size: 80px;
    margin-top: 0;
    margin-bottom: 15px;
    @media (max-width: 475px) {
      font-size: 30px;
    }
  }
`

Styled.Desc = styled(Item)``

Styled.Services = styled(Item)`
  ${css(({ theme }) => theme._h3)}
`

Styled.Splash = styled.div`
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  background-image: ${({ image }) => image && `url(${image})`};
  background-size: cover;
  background-position: center center;
  z-index: ${zIndex.splash};
`

Styled.Video = styled.video`
  height: 100%;
  width: 100%;
  object-fit: cover;
  display: block;
  position: relative;
  z-index: ${zIndex.media};
`

Styled.AuxWrapper = styled.div`
  position: absolute;
  width: auto;
  max-width: 100%;
  z-index: ${zIndex.aux};
  width: ${(props) => props.width}vw;
  ${({ position }) => _setPositionStyles(position)};
`

Styled.AuxImg = styled.img`
  width: 100%;
`

export default Styled
