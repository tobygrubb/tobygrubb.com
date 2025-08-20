import styled, { css } from 'styled-components'
import * as Controls from 'react-video-controls'

const Wrapper = styled.div`
  position: relative;
  color: white;
  overflow: hidden;
  font-family: helvetica;
  font-size: 0.85rem;

  * {
    text-transform: uppercase;
    letter-spacing: 0.085em;
  }
`

const VideoWrapper = styled.div`
  width: 100%;
  height: 100%;

  video {
    object-position: center;
    height: 100%;
  }
`

const ControlWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;

  box-sizing: border-box;

  transition: 200ms transform ease-out, 200ms opacity ease-out;
  transform: translateY(${props => (props.enabled ? 0 : 0.75)}rem);
  opacity: ${props => (props.enabled ? 100 : 0)};
`

const ButtonWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr auto auto;
  align-items: center;
  grid-gap: 1.5rem;
  padding: 1.5rem 1rem;
`

const buttonStyle = css``

const Play = styled(Controls.Play)`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 10;

  width: 6rem;
  height: 6rem;
  border-radius: 50%;

  border: 2px solid white;

  display: flex;
  justify-content: center;
  align-items: center;

  transform: translate3d(-50%, -50%, 0);
`

const Mute = styled(Controls.Mute)`
  ${buttonStyle}
`

const Unmute = styled(Controls.Unmute)`
  ${buttonStyle}
`

const Fullscreen = styled(Controls.Fullscreen)`
  ${buttonStyle}
`

const SeekBar = styled(Controls.SeekBar)`
  background: rgba(0, 0, 0, 0.07);
  position: relative;
  overflow: visible;

  /* increase clickable area */
  &::after {
    content: '';
    position: absolute;
    top: -7px;
    bottom: -7px;
    width: 100%;
  }
`

const Progress = styled(Controls.SeekBar.Progress)`
  background: orange;
  height: 3px;
`

export default {
  Play,
  Wrapper,
  Mute,
  Unmute,
  Fullscreen,
  ControlWrapper,
  ButtonWrapper,
  Progress,
  SeekBar,
  VideoWrapper,
}
