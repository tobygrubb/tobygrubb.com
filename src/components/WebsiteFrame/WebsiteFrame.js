import React, { createRef } from 'react'
import useDOMWidth from 'hooks/useDOMWidth'
import PropTypes from 'prop-types'
import Styled from './styled'

const WebsiteFrame = ({ dotColor, frameColor, children }) => {
  const ref = createRef()
  const width = useDOMWidth(ref)

  return (
    <Styled.WebsiteFrame calcWidth={width}>
      <div ref={ref}>
        <svg viewBox="0 0 632 20" xmlns="http://www.w3.org/2000/svg">
          <path fill={frameColor} d="M0 0h632v20H0z" />
          <circle fill={dotColor} cx="10" cy="10" r="2.75" />
          <circle fill={dotColor} cx="21" cy="10" r="2.75" />
          <circle fill={dotColor} cx="32" cy="10" r="2.75" />
        </svg>
        {children}
      </div>
    </Styled.WebsiteFrame>
  )
}

WebsiteFrame.defaultProps = {
  dotColor: '#fff',
  frameColor: '#D8D8D8',
}

WebsiteFrame.propTypes = {
  dotColor: PropTypes.string,
  frameColor: PropTypes.string,
  children: PropTypes.element.isRequired,
}
export default WebsiteFrame
