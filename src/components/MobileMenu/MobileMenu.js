import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { LayoutContext } from 'containers/Layout/Layout'
import './MobileMenu.scss'

const Nav = () => {

  const {
    setMobileMenu,
  } = useContext(LayoutContext)

  // const handleClick = () => {
  //   setMobileMenu(false)
  // }

  return (
    <nav className={`mobile-menu`}>
      <ul>
        <li><Link to='/' onClick={() => {
          setMobileMenu(false)
        }}>Home</Link></li>
        <li><Link to='/about' onClick={() => {
          setMobileMenu(false)
        }}>About</Link></li>
        <li><a href='https://thisllc.myshopify.com' target="_blank" rel="noopener noreferrer" onClick={() => {
          setMobileMenu(false)
        }}>Shop</a></li>
        <li><a href='mailto:look@this.design' onClick={() => {
          setMobileMenu(false)
        }}>Contact</a></li>
      </ul>
    </nav>
  )
}

export default Nav
