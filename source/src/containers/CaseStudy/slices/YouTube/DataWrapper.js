import React from 'react'
import YouTube from '.'
/* eslint react/prop-types:0 */

function DataWrapper({ data }) {
  const { height, width, embed_url: url } = data.primary.url
  return <YouTube url={url} ratio={(height / width) * 100} />
}

// DataWrapper.propTypes = {}

export default DataWrapper
