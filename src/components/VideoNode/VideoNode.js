import React, { memo, useContext, useState, createContext } from 'react'
import PropTypes from 'prop-types'
import { VideoCtx } from 'react-video-controls'
import Styled from './Styled'
import Controls from './Controls'
import useAutoplay from './hooks/useAutoplay'

export const PlayerCtx = createContext()

const VideoNode = memo(
  ({ url, autoPlay, poster, controls, muteToggle, playing }) => {
    // const attr = {playsInline: autoPlay}

    return (
      // Pass props here like muted etc
      <Styled.VideoProvider
        src={url}
        // loop if controls aren't present
        loop={!controls}
        muted={!controls}
        autoplay={autoPlay}
      >
        <Player
          shouldPlay={playing}
          muteToggle={muteToggle}
          controlsEnabled={controls}
          poster={poster}
        />
      </Styled.VideoProvider>
    )
  }
)

VideoNode.propTypes = {
  url: PropTypes.string.isRequired,
  poster: PropTypes.string,
  controls: PropTypes.bool,
  muteToggle: PropTypes.bool,
  playing: PropTypes.bool,
}

/**
 * This is the player itself
 */
function Player({ shouldPlay, muteToggle, controlsEnabled, poster }) {
  const { video, state, controls, wrapperRef } = useContext(VideoCtx)
  const [hovered, setHovered] = useState()
  const [hasPlayed, setHasPlayed] = useState(false)

  React.useEffect(() => {
    if (state.isPlaying) {
      setHasPlayed(true)
    }
  }, [state.isPlaying])

  useAutoplay(shouldPlay)

  const muteEnabled = muteToggle && !controlsEnabled
  const ctrlsActive =
    (state.isPlaying && hovered) ||
    state.seeking ||
    (muteEnabled && state.muted)

  function toggleMute() {
    if (state.muted) controls.unmute()
    else controls.mute()
  }

  function handleClick(e) {
    e.stopPropagation()
    if (muteEnabled) return toggleMute()
    if (controlsEnabled)
      return state.isPlaying ? controls.pause() : controls.play()
    return null
  }

  return (
    <PlayerCtx.Provider value={{ toggleMute }}>
      <Styled.Wrapper
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        ref={wrapperRef}
      >
        {!state.isPlaying && !state.seeking && (
          <Styled.PlayWrapper>
            <Styled.Play />
          </Styled.PlayWrapper>
        )}
        <Styled.ControlWrapper active={ctrlsActive}>
          {muteEnabled && (
            <Styled.MutePadding>
              <MuteToggle />
            </Styled.MutePadding>
          )}
          {controlsEnabled && <Controls />}
        </Styled.ControlWrapper>
        <Styled.VideoWrapper
          poster={!hasPlayed ? poster : 'false'}
          hasPayed={hasPlayed}
          onClick={handleClick}
        >
          {video}
        </Styled.VideoWrapper>
      </Styled.Wrapper>
    </PlayerCtx.Provider>
  )
}

export function MuteToggle() {
  const { state } = useContext(VideoCtx)
  const { toggleMute } = useContext(PlayerCtx)
  return <Styled.Mute muted={state.muted} onClick={toggleMute} />
}

export default VideoNode
