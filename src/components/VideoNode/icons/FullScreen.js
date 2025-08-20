import React from 'react'
// import PropTypes from 'prop-types'

export default function Fullscreen({ ...props }) {
  return (
    <svg {...props} viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1 8V1h7m5 5v7H6"
        stroke="#FFF"
        fill="none"
        strokeWidth="1.5"
        fillRule="evenodd"
      />
    </svg>
  )
}

// .propTypes = {}
