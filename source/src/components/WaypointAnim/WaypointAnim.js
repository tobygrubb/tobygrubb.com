import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Waypoint from 'react-waypoint'
import './WaypointAnim.scss'

export default function WaypointAnim({ name, className, children, disabled }) {
  const [visible, setVisible] = useState(false)
  const classNames = [
    className,
    `-waypointAnim--${name}`,
    visible ? '-enabled' : '',
  ].join(' ')

  return (
    <Waypoint
      onEnter={() => setVisible(true)}
      onLeave={() => setVisible(false)}
      topOffset="100px"
      bottomOffset="100px"
    >
      <div className={!disabled ? classNames : className}>{children}</div>
    </Waypoint>
  )
}

WaypointAnim.defaultProps = {
  name: 'fadeIn',
  className: '',
  disabled: false,
}
WaypointAnim.propTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
}
