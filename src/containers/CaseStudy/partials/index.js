import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import CursorAnchor from 'components/CursorDot/CursorAnchor'
import Waypoint from 'react-waypoint'
import { LayoutContext } from 'containers/Layout/Layout'
import Slices from '../slices/Slices'
import Cover from './CaseStudyCover/Cover'
import Styled from '../styled'
import { CsContext } from '../CaseStudy'

const Partials = {}

Partials.Shim = (
  { isHome, initCsChange } // make one elem
) => (
  <CursorAnchor
    onClick={!isHome ? initCsChange : null}
    detached
    textId="launch"
  >
    <Styled.Shim home={isHome} />
  </CursorAnchor>
)

Partials.Shim.propTypes = {
  isHome: PropTypes.bool.isRequired,
  initCsChange: PropTypes.func.isRequired,
}

const NavChanger = () => {
  const { invertNav, revertNav, navInverted } = useContext(LayoutContext)
  const isDark = useContext(CsContext).dark

  return (
    <Waypoint
      onPositionChange={({ currentPosition }) => {
        if (currentPosition === 'above' && !navInverted && !isDark) {
          invertNav()
        } else {
          revertNav()
        }
      }}
    />
  )
}

const Body = ({ next, isHome, doc }) => {
  return !next && !isHome ? (
    <>
      <Partials.NavChanger />
      <Slices sliceData={doc.data.content} />
    </>
  ) : null
}

Partials.NavChanger = NavChanger
Partials.Cover = Cover
Partials.Body = Body

export default Partials
