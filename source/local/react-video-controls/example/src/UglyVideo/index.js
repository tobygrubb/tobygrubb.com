import React, { useContext } from 'react'
// import PropTypes from 'prop-types'

import Styled from './Styled'
import VideoProvider, {
  Mute,
  Play,
  Pause,
  Unmute,
  Fullscreen,
  VideoCtx,
  SeekBar,
} from 'react-video-controls'

function UglyVideo() {
  const { video, state } = useContext(VideoCtx)
  return (
    <Styled.Wrapper>
      {video}
      <SeekBar />
      <Play>Play</Play>
      <Pause>Pause</Pause>
      {state.formatted.time}
      {state.formatted.duration}
      <Mute>Mute</Mute>
      <Unmute>Un-Mute</Unmute>
      <Fullscreen>FullScreen</Fullscreen>
    </Styled.Wrapper>
  )
}

export default ({ src, muted, autoPlay, loop }) => (
  <VideoProvider {...{ src, muted, autoPlay, loop }}>
    <UglyVideo />
  </VideoProvider>
)
