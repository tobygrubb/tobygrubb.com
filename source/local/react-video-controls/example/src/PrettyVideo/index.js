import React, { useContext } from 'react'
// import PropTypes from 'prop-types'
import VideoProvider, { VideoCtx } from 'react-video-controls'
import Styled from './Styled'

function PrettyVideo({ src, muted, autoPlay, loop }) {
  return (
    <VideoProvider {...{ src, muted, autoPlay, loop }}>
      <VideoContent />
    </VideoProvider>
  )
}

function VideoContent() {
  const { video, state, controls, wrapperRef } = useContext(VideoCtx)
  return (
    <Styled.VideoWrapper ref={wrapperRef}>
      <div style={{ flex: 1 }} onClick={controls.togglePlay}>
        {video}
      </div>
      <Styled.Wrapper>
        {state.isPlaying ? (
          <Styled.Pause>Pause</Styled.Pause>
        ) : (
          <Styled.Play>Play</Styled.Play>
        )}
        <div>
          {state.formatted.time} / {state.formatted.duration}
        </div>
        <Styled.SeekBar>
          <Styled.Progress />
        </Styled.SeekBar>

        {state.muted ? (
          <Styled.Unmute>Un-Mute</Styled.Unmute>
        ) : (
          <Styled.Mute>Mute</Styled.Mute>
        )}
        <Styled.Fullscreen>Fullsc.</Styled.Fullscreen>
      </Styled.Wrapper>
    </Styled.VideoWrapper>
  )
}

// PrettyVideo.propTypes = {}

export default PrettyVideo
