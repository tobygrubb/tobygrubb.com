import styled from 'styled-components/macro'
import getTheme from 'util/getTheme'
import theme from 'styles/theme'

const Styled = {}

const _wrap = getTheme('_wrap')
const _grid = getTheme('_grid')
const _padding = getTheme('_padding')

// -grid -wrap casestudy__diptych
Styled.Diptych = styled.div`
  ${_wrap};
  ${_grid};
`

Styled.DiptychItem = styled.div`
  ${_padding}
  flex-basis: 50%;
  margin-top: ${theme.margin.md};
  margin-bottom: ${theme.margin.md};
`

Styled.Img = styled.img`
  width: 100%;
`

Styled.Spacer = styled.div``

export default Styled
