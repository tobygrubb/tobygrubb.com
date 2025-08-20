import styled, { css } from 'styled-components/macro'
import Parallax from 'components/Parallax/Parallax'
import getTheme from 'util/getTheme'
import { sizes } from 'styles/media'

const _wrap = getTheme('_wrap')
const _grid = getTheme('_grid')
const _padding = getTheme('_padding')

const Styled = {}

const setColWidth = (size, id) => {
  const getMediaWidth = () => {
    switch (size) {
      case 'SMALL':
        return 33.33
      case 'LARGE':
        return 66.66
      default:
        return 50
    }
  }
  if (id === 'MEDIA') return getMediaWidth()
  if (id === 'TEXT') return 100 - getMediaWidth()
  throw new Error('Choose either TEXT or MEDIA')
}

const _col = css`
  flex-basis: 50%;
`

Styled.Text = styled.div`
  ${_padding}
  flex-basis:50%;
  @media (min-width: ${sizes.desktop}px) {
    flex-basis: ${props => setColWidth(props.theme.size, 'TEXT')};
  }

  & > div {
    max-width: 25em;
    margin: 0 auto 50px;
  }
`

Styled.Media = styled(Parallax)`
  ${_col} ${_padding}
  max-width: 80em;
  margin-bottom: 50px;
  flex-basis: 50%;

  > div {
    /* removes weird non crop on mobile */
    transform: translate3d(0, 0, 0);
  }

  @media (min-width: ${sizes.desktop}px) {
    flex-basis: ${props => setColWidth(props.theme.size, 'MEDIA')}%;
    margin: 90px auto;
  }

  img,
  video {
    width: 100%;
  }
`

Styled.Columns = styled.div`
  ${_grid}
  ${_wrap}
`
export default Styled
