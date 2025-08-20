import React from 'react'
import Website from './Website'

Website.Wrapper = ({ data }) => {
  const {
    background,
    screenshot,
    layout,
    video,
    frame_color: frameColor,
    dot_color: dotColor,
  } = data.primary
  return (
    <Website
      background={background}
      src={screenshot.url}
      layout={layout}
      videoUrl={video.url}
      frameColor={frameColor || undefined}
      dotColor={dotColor || undefined}
      type="website"
    />
  )
}

export default Website
