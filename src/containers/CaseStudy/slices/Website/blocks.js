import styled, { css } from 'styled-components/macro'
import getTheme from 'util/getTheme'

const _wrap = getTheme('_wrap')
const _wrapDub = getTheme('_wrapDub')
const Styled = {}

Styled.Website = styled.div`
  display: flex;
  ${({ background }) =>
    background &&
    css`
      background: ${background};
      padding: calc(80px + 5vw) 0;
    `}
`

Styled.WebsiteInner = styled.div`
  ${props => (props.layout === 'small' ? _wrapDub : _wrap)};
  position: relative;
  z-index: 10;
  margin: 0px auto;
`

Styled.Img = styled.img`
  width: 100%;
`

export default Styled
