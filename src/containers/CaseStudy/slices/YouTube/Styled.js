import styled from 'styled-components/macro'

const Wrapper = styled.div`
  width: 100%;
  height: 0;
  padding-top: ${props => props.padding}%;
`

const Iframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

export default { Wrapper, Iframe }
