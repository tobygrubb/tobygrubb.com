import React from 'react'
import PropTypes from 'prop-types'

const ResponsiveImage = ({ mobile, children, desktop }) => (
  <picture>
    {mobile && <source srcSet={mobile} media="(max-width: 600px)" />}
    {desktop && <source srcSet={desktop} media="(min-width: 1440px)" />}
    {children}
  </picture>
)

ResponsiveImage.defaultProps = {
  mobile: null,
  desktop: null,
}

ResponsiveImage.propTypes = {
  mobile: PropTypes.string,
  desktop: PropTypes.string,
  children: PropTypes.node.isRequired,
}

export default ResponsiveImage
