import React, { useState, useEffect, useContext } from 'react'
import { ThemeProvider } from 'styled-components'
import Waypoint from 'react-waypoint'
import PropTypes from 'prop-types'
import ResponsiveImage from 'components/ResponsiveImage/ResponsiveImage'

import { CsContext } from 'containers/CaseStudy/CaseStudy'
import Styled from './styled'

const useTimer = ({ slide, setNext, animating }) => {
  useEffect(() => {
    let interval
    if (animating) {
      interval = setInterval(() => {
        setNext()
      }, 2500)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
    // eslint-disable-next-line
  }, [slide, animating])
}

function Gallery({ animate, imageUrls, ratio }) {
  const [slide, setSlide] = useState(0)
  const [animating, setAnimating] = useState(false)

  const { dark } = useContext(CsContext)

  const prevIndex = slide ? slide - 1 : imageUrls.length - 1
  const nextIndex = (slide + 1) % imageUrls.length

  const setNext = () => setSlide(nextIndex)
  const setPrev = () => setSlide(prevIndex)

  const handleNav = dir => {
    if (dir === 'NEXT') setNext()
    else if (dir === 'PREV') setPrev()
    else setSlide(dir)
    setAnimating(false)
  }

  useTimer({ slide, setNext, animating })

  return (
    <Waypoint
      onEnter={() => setAnimating(true)}
      onLeave={() => setAnimating(false)}
    >
      <div>
        <ThemeProvider theme={{ dark }}>
          <Styled.Gallery className="grid -wrap">
            <Styled.ImageContainer ratio={ratio}>
              {imageUrls.map(({ standard, mobile, desktop }, i) => (
                <ResponsiveImage key={standard} {...{ mobile, desktop }}>
                  <Styled.Image
                    src={standard}
                    current={slide === i}
                    previous={prevIndex === i}
                    animate={animate}
                  />
                </ResponsiveImage>
              ))}
              <Styled.OverlayNav>
                <Styled.Prev onClick={() => handleNav('PREV')} />
                <Styled.Next onClick={() => handleNav('NEXT')} />
              </Styled.OverlayNav>
            </Styled.ImageContainer>
            <Styled.Indicators>
              <Styled.Indicators.Inner>
                {imageUrls.map(({ standard }, i) => (
                  <Styled.Indicator
                    key={standard}
                    onClick={() => handleNav(i)}
                  />
                ))}
                <Styled.Indicator.Current index={slide} />
              </Styled.Indicators.Inner>
            </Styled.Indicators>
          </Styled.Gallery>
        </ThemeProvider>
      </div>
    </Waypoint>
  )
}

Gallery.propTypes = {
  animate: PropTypes.bool.isRequired,
  imageUrls: PropTypes.arrayOf(
    PropTypes.shape({
      standard: PropTypes.string.isRequired,
      mobile: PropTypes.string,
      desktop: PropTypes.string,
    })
  ).isRequired,
  ratio: PropTypes.number.isRequired,
}

export default React.memo(Gallery)
