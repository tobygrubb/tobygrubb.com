import styled, { css } from 'styled-components'

const Styled = {}

const _indicatorWidth = 40
const _indicatorMargin = 5

const _transition = css`
  transition: 900ms opacity cubic-bezier(0.4, 0, 0.2, 1),
    900ms transform cubic-bezier(0.4, 0, 0.2, 1);
`

Styled.OverlayNav = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
`

const NavItem = styled.div`
  height: 100%;
  position: absolute;
}`

Styled.Prev = styled(NavItem)`
  left: 0;
  width: 25%;
  cursor: w-resize;
`

Styled.Next = styled(NavItem)`
  left: 25%;
  width: 75%;
  cursor: e-resize;
`

Styled.ImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  outline: none;
  cursor: pointer;
  padding-top: ${({ ratio }) => `${ratio}%`}}};
`

Styled.Image = styled.img`
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  opacity: 0;
  transform: ${({ animate }) => (animate ? 'scale(1.08)' : 'scale(1)')};

  ${({ previous, animate }) =>
    previous &&
    css`
      opacity: 1;
      z-index: -1;

      ${animate &&
        css`
          transform: scale(1);
          ${_transition}
        `}
    `}

  ${({ current, animate }) =>
    current &&
    css`
      opacity: 1;
      transform: scale(1.04);
      ${animate ? _transition : null}
    `}
`

Styled.Gallery = styled.div`
  position: relative;
`

Styled.Indicators = styled.div`
  display: flex;
`

Styled.Indicators.Inner = styled.div`
  position: relative;
  display: inline-flex;
  margin: 25px auto 0;
`

Styled.Indicator = styled.div`
  width: ${_indicatorWidth + _indicatorMargin * 2}px;
  height: 3px;
  display: inline-block;
  transition: ${({ theme }) => `200ms transform ${theme.ease.standard}`};
  cursor: pointer;
  margin: 0 auto;

  &::after {
    content: '';
    width: ${_indicatorWidth}px
    background: ${({ theme }) => (theme.dark ? 'white' : 'black')}
    opacity: .10;
    height: 3px;
    margin: 0 auto;
    display: block;
  }
`

Styled.Indicator.Current = styled(Styled.Indicator)`
  z-index: 100;
  left: 0;
  top: 0;
  position: absolute;
  transform: translate3d(${({ index }) => index * 100}%, 0, 0);

  &::after {
    content: '';
    opacity: 0.6;
  }
`

export default Styled
