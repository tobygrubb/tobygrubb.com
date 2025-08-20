import styled from 'styled-components/macro'
import PropTypes from 'prop-types'

const Styled = {}

Styled.WebsiteFrame = styled.div`
  overflow: hidden;
  border-radius: ${props => props.calcWidth / 130}px;

  svg {
    width: ${props => props.calcWidth + 3}px;
    display: block;
  }
`

Styled.WebsiteFrame.propTypes = {
  calcWidth: PropTypes.number,
}

export default Styled
