import React from 'react'
import PropTypes from 'prop-types'
import Styled from './Styled'

const View = ({ view: activeView, filterActive, viewName, children, aside }) => {

  return (
    <Styled.View
      isActive={activeView === viewName}
      {...{ viewName, aside, activeView, filterActive }}
    >
      {children}
    </Styled.View>
  )
}

View.defaultProps = {
  aside: false,
  filterActive: false,
  children: null,
}

View.propTypes = {
  // current app view
  view: PropTypes.string.isRequired,
  filterActive: PropTypes.bool,
  // what to call the current view
  viewName: PropTypes.string.isRequired,
  aside: PropTypes.bool,
  children: PropTypes.any,
}

export default View
