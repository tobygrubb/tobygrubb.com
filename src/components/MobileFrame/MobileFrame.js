import React, { createRef } from 'react'
import useBorderRadiusPercent from 'hooks/useBorderRadiusPercent'
import PropTypes from 'prop-types'
import Styled from './styled'

const MobileFrame = ({ children, shadowOpacity }) => {
  const ref = createRef()
  const radius = useBorderRadiusPercent(ref, 10)

  return (
    <Styled.MobileFrame ref={ref} radius={radius} shadowOpacity={shadowOpacity}>
      {children}
    </Styled.MobileFrame>
  )
}
MobileFrame.propTypes = {
  children: PropTypes.node.isRequired,
}
export default MobileFrame
