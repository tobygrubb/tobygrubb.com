import styled from 'styled-components/macro'
import getTheme from 'util/getTheme'

const _wrap = getTheme('_wrap')
const Styled = {}

Styled.Text = styled.div`
  ${_wrap}
  max-width: 30em!important;
  margin: 0px auto;
`

export default Styled
