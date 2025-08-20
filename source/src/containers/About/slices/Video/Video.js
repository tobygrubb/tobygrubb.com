import React from 'react'
import WaypointVideo from 'components/WaypointVideo/WaypointVideo'
import sizeCheck from 'util/sizeCheck'
import './Video.scss'

const Video = (props) => {
  const data = props.data.value[0]
  const { url } = data.file
  const isFullScreen = data.layout === 'fullscreen'
  const videoHasAudio = data.audio === 'true'
  const videoHasControls = data.autoplay !== 'autoplay'
  const poster = data.poster.url
  sizeCheck({ ...data.file }, 7)

  return (
    <div
      className={`about__video ${data.class_names} ${
        isFullScreen ? '-fs' : '-wrap'
      }`}
    >
      <WaypointVideo
        muteToggle={videoHasAudio}
        controls={videoHasControls}
        url={url}
        poster={poster}
      />
    </div>
  )
}

export default React.memo(Video)
