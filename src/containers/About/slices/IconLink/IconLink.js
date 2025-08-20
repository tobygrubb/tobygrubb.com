import React from 'react'
import './IconLink.scss'

const IconLink = ({type, url, children}) => {

  const handleLink = () => {
    if(type === 'email') {
      window.location.href = url
    } else {
      window.open(url)
    }
  }

  return <div className={`icon-link`}>
      <div className="icon-link__bar" onClick={() => {
        handleLink()
      }}>
        <div className="icon-link__text">
          <div className="icon-link__inner">
            {children}
          </div>
        </div>
        <div className="icon-link__icon">
          {type === 'email' && <svg viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.7867 7.33599C12.0049 8.02169 11.0186 8.39733 10 8.39733C8.98137 8.39733 7.99509 8.02169 7.21333 7.33599L0 0.937988V13.013L4.19333 8.60999C4.32087 8.49531 4.48492 8.43539 4.6527 8.44219C4.82049 8.449 4.97965 8.52203 5.09838 8.64669C5.21711 8.77136 5.28666 8.93848 5.29314 9.11465C5.29962 9.29082 5.24255 9.46308 5.13333 9.59699L0.94 14H19.06L14.8667 9.59699C14.7574 9.46308 14.7004 9.29082 14.7069 9.11465C14.7133 8.93848 14.7829 8.77136 14.9016 8.64669C15.0204 8.52203 15.1795 8.449 15.3473 8.44219C15.5151 8.43539 15.6791 8.49531 15.8067 8.60999L20 13.013V0.937988L12.7867 7.33599Z" fill="black"/>
              <path d="M11.9333 6.3L19 0H1L8.06667 6.3C8.61632 6.75884 9.2978 7.00862 10 7.00862C10.7022 7.00862 11.3837 6.75884 11.9333 6.3Z" fill="black"/>
            </svg>}
          {type === 'map' && <svg viewBox="0 0 14 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 8.10596C14 13.135 7 18.2119 7 18.2119C7 18.2119 0 13.135 0 8.10596C0 3.07688 3.13401 0 7 0C10.866 0 14 3.07688 14 8.10596Z" fill="black"/>
              <circle cx="7" cy="7" r="3" fill="white"/>
            </svg>}
        </div>
      </div>
  </div>
}

export default IconLink
