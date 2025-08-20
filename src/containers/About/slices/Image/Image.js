import React from 'react'
import ResponsiveImage from 'components/ResponsiveImage/ResponsiveImage'
import PropTypes from 'prop-types'
import Styled from './styled'

const Image = (props) => {

  const fullscreen = false
  const offset = 0

  const { src, responsiveUrls } = props
  const classnames = props?.props?.data?.primary?.class_names
  return (
    <div className={`about__image ${classnames}`}>
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
            offset={offset}
          />
        </ResponsiveImage>
      </Styled.ImageWrapper>
    </div>
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
