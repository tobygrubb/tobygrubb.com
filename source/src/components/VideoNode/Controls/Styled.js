import styled from 'styled-components/macro'
import * as Controls from 'react-video-controls'
import FullscreenIcon from '../icons/FullScreen'

const Time = styled.div`
  display: flex;
  justify-content: space-between;
  letter-spacing: 0.15em;

  position: relative;
  width: 7.5em;

  &:before {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    height: 1em;
    transform: translate3d(-50%, -50%, 0);
    border-right: 1px solid white;
  }
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

const ControlItem = styled.div`
  margin: 0 0.75em;
  display: flex;
  align-items: center;

  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }
`

const Fullscreen = styled(FullscreenIcon)`
  width: 0.85em;
`

const ControlsLayout = styled.div`
  padding: 1em 1.5em;
  display: flex;
  align-items: center;

  > * {
    &:nth-child(1) {
      flex: 1;
    }
  }
`

export default {
  Fullscreen,
  ControlItem,
  SeekBar,
  Progress,
  Time,
  ControlsLayout,
}
