import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import isMobile from 'util/isMobile'

import { CsContext } from 'containers/CaseStudy/CaseStudy'
import Styled from './blocks'

const Diptych = ({ images }) => {
  const { alt } = useContext(CsContext)
  return (
    <Styled.Diptych>
      {images.map(({ src, offset }, i) => (
        <Styled.DiptychItem key={src || i}>
          {src && <Styled.Img {...{ src, alt, offset }} />}
          {// If no image, put a spacer in except on mobile
          !src && !isMobile() && <Styled.Spacer />}
        </Styled.DiptychItem>
      ))}
    </Styled.Diptych>
  )
}

Diptych.defaultProps = {
  images: [{ src: null, offset: 0 }, { src: null, offset: 0 }],
}

Diptych.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string,
      offset: PropTypes.number,
    })
  ),
}

export default React.memo(Diptych)
