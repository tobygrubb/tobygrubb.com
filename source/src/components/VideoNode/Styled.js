import styled from 'styled-components/macro'
import * as Controls from 'react-video-controls'
import MuteIcon from './icons/Mute'
import FullscreenIcon from './icons/FullScreen'
import PlayIcon from './icons/Play'

const VideoProvider = styled(Controls.default)`
  &[poster] {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const Wrapper = styled.div`
  position: relative;
  overflow: hidden;
  user-select: none;
`

const VideoWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;

  &:after {
    content: '';
    ${'' /* display: ${props => (props.hasPlayed ? 'none' : 'block')} */}
    background: url(${props => props.poster});
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    height: 100%;
    background-size: cover;
    background-position: 50% 50%;
  }
`

const DUR = 300
const ease = props => props.theme.ease.standard

const ControlWrapper = styled.div`
  font-size: ${props => props.theme.fontSizes[2]};
  color: ${props => props.theme.color.white};
  letter-spacing: 0.05em;
  position: absolute;
  z-index: 100;
  width: 100%;
  bottom: 0;
  right: 0;

  opacity: ${props => (props.active ? 1 : 0)};
  transform: translateY(${props => (props.active ? 0 : '1em')});
  transition: ${DUR}ms transform ${ease}, ${DUR}ms opacity ${ease};
`

const MutePadding = styled.div`
  padding: 0.5em 1em;
`

const Mute = styled(MuteIcon)`
  width: 1.34em;
`
const Fullscreen = styled(FullscreenIcon)`
  width: 0.85em;
`

const PLAY_SIZE = 4.75

const PlayWrapper = styled(Controls.Play)`
  position: absolute;
  z-index: 10;

  top: 50%;
  left: 50%;

  width: ${PLAY_SIZE}em;
  height: ${PLAY_SIZE}em;
  border-radius: ${PLAY_SIZE / 2}em;

  border: 2px solid white;

  box-sizing: border-box;

  transform: translate3d(-50%, -50%, 0);
  display: flex;
  justify-content: center;
  align-items: center;
`

const Play = styled(PlayIcon)`
  fill: white;
  width: 0.85em;
  position: relative;
  left: 3%;
`

export default {
  Play,
  PlayWrapper,
  VideoProvider,
  Mute,
  Wrapper,
  ControlWrapper,
  Fullscreen,
  MutePadding,
  VideoWrapper,
}
