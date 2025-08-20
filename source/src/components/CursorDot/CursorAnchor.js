import React, { useState, useContext } from 'react'
import isMobile from 'util/isMobile'
import CursorContext from 'components/CursorDot/CursorContext'
import PropTypes from 'prop-types'
import icons from './icons'

const CursorAnchor = ({ children, onClick, detached, textId, className }) => {
  const { updateCursor } = useContext(CursorContext)
  const [enabled, handleHover] = useState(false)

  // const enableCursor = () => {
  //   handleHover(true)
  //   updateCursor({
  //     enabled: true,
  //     icon: detached && textId,
  //   })
  // }

  const disableCursor = () => {
    updateCursor({ enabled: false, icon: null })
    handleHover(false)
  }

  function handleClick() {
    disableCursor()
    if (onClick) {
      onClick()
    }
  }

  if (!isMobile()) {
    return (
      <div
        // onMouseEnter={enableCursor}
        // onMouseLeave={disableCursor}
        onClick={handleClick}
        className={`${className || ''} cursorAnchor ${
          enabled ? '-hovered' : ''
        }`}
      >
        {children}
        {!detached && <AttachedCursor {...{ enabled, textId }} />}
      </div>
    )
  }
  return (
    <div onClick={onClick} className={`${className && className} cursorAnchor`}>
      {children}
    </div>
  )
}

export default React.memo(CursorAnchor)

const AttachedCursor = React.memo(({ textId, enabled }) => (
  <div className="cursorAnchor__wrapper">
    <div className={`cursor__text ${enabled && 'cursor__text--enabled'}`}>
      {icons[textId]}
    </div>
  </div>
))

CursorAnchor.defaultProps = {
  detached: false,
}

CursorAnchor.propTypes = {
  textId: PropTypes.string.isRequired,
  detached: PropTypes.bool,
}
