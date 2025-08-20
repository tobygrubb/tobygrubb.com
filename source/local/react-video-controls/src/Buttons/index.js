import React, { useContext } from 'react'
import { VideoCtx } from '..'
import Styled from './Styled'

export function Play(props) {
  const { controls } = useContext(VideoCtx)
  return <Styled.Button onClick={controls.play} {...props} />
}

export function Pause(props) {
  const { controls } = useContext(VideoCtx)
  return <Styled.Button onClick={controls.pause} {...props} />
}

export function Mute(props) {
  const { controls } = useContext(VideoCtx)
  return <Styled.Button onClick={controls.mute} {...props} />
}

export function Unmute(props) {
  const { controls } = useContext(VideoCtx)
  return <Styled.Button onClick={controls.unmute} {...props} />
}

export function Fullscreen(props) {
  const { controls } = useContext(VideoCtx)
  return (
    <Styled.Button
      onClick={() =>
        controls.fullScreen(props.playerRef && props.playerRef.current)
      }
      {...props}
    />
  )
}
