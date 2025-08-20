import React from 'react'
import './Loading.scss'

export default function Loading({ hasBg = true }) {
  return (
    <div className={`loader ${hasBg ? 'has-background' : 'no-background'}`}>
      <img
        className={`loader__icon ${hasBg ? 'no-background' : 'has-background'}`}
        src="https://images.prismic.io/thisstaging/854aa699-9715-4d8e-be93-f762e3cc0ca1_dotspreload_360.gif"
        alt="loading"
      />
    </div>
  )
}
