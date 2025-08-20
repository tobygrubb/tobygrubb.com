import React from 'react'
import PropTypes from 'prop-types'

const GridIcon = props => {
  const { view } = props
  return (
    <div className={`icon icon--grid ${view === 'work' ? '-enabled' : ''}`}>
      <span className="icon__item icon--grid__item" />
      <span className="icon__item icon--grid__item" />
      <span className="icon__item icon--grid__item" />
      <span className="icon__item icon--grid__item" />
    </div>
  )
}

GridIcon.propTypes = {
  view: PropTypes.string.isRequired,
}

export default GridIcon
