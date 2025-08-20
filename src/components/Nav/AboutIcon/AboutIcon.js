import React from 'react'
import PropTypes from 'prop-types'

const AboutIcon = (props) => {
  const { view } = props
  return (
    <div className={`icon icon--about ${view === 'active' ? '-enabled' : ''}`}>
      <span className="icon__item icon--about__item" />
      <span className="icon__item icon--about__item" />
    </div>
  )
}
AboutIcon.propTypes = {
  view: PropTypes.string.isRequired,
}

export default AboutIcon
