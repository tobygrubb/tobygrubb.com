import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { LayoutContext } from 'containers/Layout/Layout'
import emitter from 'tiny-emitter/instance'
import './SecondaryNav.scss'

const SecondaryNav = () => {
  const context = useContext(LayoutContext)
  const {
    view,
    navInverted,
    filters,
    setFilters,
    csState: { currentUid },
  } = context

  const navState = [
    navInverted && view === 'root' ? 'nav--dark' : '',
    `-view-is-${view}`,
    currentUid ? 'is-subpage' : '',
  ].join(' ')

  return (
    <nav className={`secondaryNav -wrap-nav ${navState}`}>
      <div className="secondaryNav__inner">
        <div className="secondaryNav__item">
          <a
            href="https://thisllc.myshopify.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            <span>SHOP</span>
          </a>
        </div>
        <div className={`secondaryNav__item filter`}>
          <button
            onClick={() => {
              setFilters({
                ...filters,
                active: true,
              })
              emitter.emit('filter:show')
            }}
          >
            {filters.tag === 'all' ? 'Filter' : 'Filtered'}
          </button>
        </div>
      </div>
    </nav>
  )
}

export default SecondaryNav
