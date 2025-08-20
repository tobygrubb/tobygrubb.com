import React from 'react'
import Helmet from 'react-helmet'
import config from 'site.config'
import PropTypes from 'prop-types'
import formatTitle from 'util/formatTitle'

function Head({ description, title, image, path }) {
  const url = `${config.url}${path}`
  return (
    <Helmet>
      <title>{title ? formatTitle(title) : config.title}</title>
      <meta name="description" content={description} />

      <meta charset="utf-8" />

      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={description} />

      {image && <meta property="og:image" content={image} />}
      <meta property="og:title" content={formatTitle(title)} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={config.title} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta property="og:description" content={description} />

      <meta name="twitter:card" content="summary" />
      {image && <meta name="twitter:image" content={image} />}

      {<link rel="canonical" href={url} />}
    </Helmet>
  )
}

Head.defaultProps = {
  title: null,
  description: config.description,
  image: '/messages-preview.jpg',
  path: '',
}

Head.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  path: PropTypes.string,
}

export default Head
