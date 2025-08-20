import React from 'react'
import PropTypes from 'prop-types'

function ContextWrapper({ children }) {
  return <div>{children}</div>
}

ContextWrapper.propTypes = {
  children: PropTypes.elem.isRequired,
}

export default ContextWrapper
