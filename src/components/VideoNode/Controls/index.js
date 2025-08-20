import React, { useContext } from 'react'
import { VideoCtx, Fullscreen } from 'react-video-controls'
import Styled from './Styled'
import { MuteToggle } from '../VideoNode'

export default function Controls() {
  const { state } = useContext(VideoCtx)

  const { duration, time } = state.formatted
  return (
    <>
      <Styled.SeekBar>
        <Styled.Progress />
      </Styled.SeekBar>
      <Styled.ControlsLayout>
        <Styled.ControlItem>
          <Styled.Time>
            <span>{time}</span>
            <span>{duration}</span>
          </Styled.Time>
        </Styled.ControlItem>
        <Styled.ControlItem>
          <MuteToggle />
        </Styled.ControlItem>
        <Styled.ControlItem>
          <Fullscreen>
            <Styled.Fullscreen />
          </Fullscreen>
        </Styled.ControlItem>
      </Styled.ControlsLayout>
    </>
  )
}
