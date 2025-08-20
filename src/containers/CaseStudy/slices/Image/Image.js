import React, { useContext } from 'react'
import ResponsiveImage from 'components/ResponsiveImage/ResponsiveImage'
import { CsContext } from 'containers/CaseStudy/CaseStudy'
import PropTypes from 'prop-types'
import Styled from './styled'

const Image = ({ src, responsiveUrls, fullscreen, offset }) => {
  const { alt } = useContext(CsContext)
  return (
    <Styled.ImageWrapper {...{ fullscreen }}>
      <ResponsiveImage
        mobile={responsiveUrls.mobile}
        desktop={responsiveUrls.desktop}
      >
        <Styled.Img
          src={
            fullscreen && responsiveUrls.fullWidth
              ? responsiveUrls.fullWidth
              : src
          }
          alt={alt}
          offset={offset}
        />
      </ResponsiveImage>
    </Styled.ImageWrapper>
  )
}

Image.defaultProps = {
  offset: 0,
  responsiveUrls: {
    mobile: null,
    fullWidth: null,
    desktop: null,
  },
}

Image.propTypes = {
  fullscreen: PropTypes.bool.isRequired,
  src: PropTypes.string.isRequired,
  offset: PropTypes.number,
  responsiveUrls: PropTypes.shape({
    mobile: PropTypes.string,
    fullWidth: PropTypes.string,
    desktop: PropTypes.string,
  }),
}

export default React.memo(Image)
