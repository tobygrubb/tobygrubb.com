import styled, { css } from 'styled-components'
import * as Controls from 'react-video-controls'

const VideoWrapper = styled.div`
  video {
  }
`
const Wrapper = styled.div`
  @import url('https://fonts.googleapis.com/css?family=Roboto+Mono&display=swap');
  display: grid;
  grid-template-columns: auto auto 1fr auto auto;
  align-items: center;
  grid-gap: 1rem;
  font-family: 'Roboto Mono';
  font-size: 80%;
  padding: 0.5rem;
`

const buttonStyle = css`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  color: white;
`

const Play = styled(Controls.Play)`
  ${buttonStyle};
  background: orange;
`

const Pause = styled(Controls.Pause)`
  ${buttonStyle}
  background: seagreen;
`

const Mute = styled(Controls.Mute)`
  ${buttonStyle}
  background: blue;
`

const Unmute = styled(Controls.Unmute)`
  ${buttonStyle}
  background: purple;
`

const Fullscreen = styled(Controls.Fullscreen)`
  ${buttonStyle}
  background: red;
`

const SeekBar = styled(Controls.SeekBar)`
  border-radius: 2.5rem;
  padding-right: 5rem;
  box-sizing: border-box;
  background: orangered;
`

const Progress = styled(Controls.SeekBar.Progress)`
  position: relative;
  height: 5rem;
  border-radius: 2.5rem;
  padding: 0 2.5rem;
  background: violet;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    height: 5rem;
    width: 5rem;
    background: skyblue;
    z-index: 50;
    border-radius: 50%;
  }
`

export default {
  Play,
  Pause,
  Wrapper,
  Mute,
  Unmute,
  SeekBar,
  Progress,
  Fullscreen,
  VideoWrapper,
}
