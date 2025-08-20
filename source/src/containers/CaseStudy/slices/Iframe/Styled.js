import styled from 'styled-components/macro'
import { Wrap } from 'components/Styled'

const Wrapper = styled(Wrap).attrs(({ full }) => ({ full }))``

const RatioEnforcer = styled.div`
  position: relative;
  height: 0;
  padding-top: ${props => props.ratio}%;
`

const Iframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
  display: block;
`

const Img = styled.img`
  width: 100%;
  display: block;
`

export default { Wrapper, Iframe, RatioEnforcer, Img }
