import styled, { css } from 'styled-components/macro'

const wrapFull = css`
  width: 100%;
  max-width: none;
`

const wrapDefault = css`
  max-width: 1500px;
  width: 80%;
`

const Wrap = styled.div`
  ${props => (props.full ? wrapFull : wrapDefault)}
  margin: 0px auto;
`

Wrap.defaultProps = {
  full: false,
}

export default Wrap
