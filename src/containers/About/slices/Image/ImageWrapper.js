import React from 'react'
import Image from './Image'

Image.Wrapper = props => {
  const api = props.data.value
    ? props.data.value[0] // v1 structure
    : props.data.primary // v2 structure

  const src = api.image ? api.image.url : api.file.url
  const { offset, layout } = api

  const fullscreen = layout === 'fullscreen'

  const mobileUrl = api.image && api.image.mobile && api.image.mobile.url
  const desktopUrl = api.image && api.image.desktop && api.image.desktop.url
  const fwUrl = api.image && api.image['main-fs'] && api.image['main-fs'].url

  const responsiveUrls = {
    mobile: mobileUrl,
    fullWidth: fwUrl,
    desktop: desktopUrl,
  }

  return (
    <Image
      {...{
        mobileUrl,
        src,
        responsiveUrls,
        fullscreen,
        offset,
        props,
      }}
    />
  )
}

export default Image
