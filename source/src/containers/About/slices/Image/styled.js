import styled, { css } from 'styled-components'

const Styled = {}

const _wrap = css`
  ${theme => theme.theme._wrap}}
`

Styled.ImageWrapper = styled.div`
  max-width: 100%;
  overflow: hidden;
  ${props => !props.fullscreen && _wrap}
`

Styled.Img = styled.img`
  width: 100%;
  margin-left: ${props => props.offset}%;
`

export default Styled
