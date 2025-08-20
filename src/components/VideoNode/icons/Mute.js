import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

export default function Mute({ muted, ...props }) {
  return (
    <svg {...props} viewBox="0 0 26 19" xmlns="http://www.w3.org/2000/svg">
      <Speaker d="M14 5.16129282V18.25c0 .4142136-.3357864.75-.75.75-.1437982 0-.2845652-.0413389-.4055299-.1190915L5 13.8387072H.75c-.41421356 0-.75-.3357865-.75-.75V5.91129282c0-.41421356.33578644-.75.75-.75H5L12.8444701.11909155C12.9654348.04133889 13.1062018 0 13.25 0c.4142136 0 .75.33578644.75.75v4.41129282z" />
      <X disabled={!muted} d="M18 13l7-7M18 6l7 7" />
      <Arc
        disabled={muted}
        d="M18.5107505 15C20.5847595 13.9847251 22 11.9529342 22 9.61203513 22 7.08360315 20.3489227 4.91578937 18 4"
      />
    </svg>
  )
}

Mute.defaultProps = {
  muted: true,
}

Mute.propTypes = {
  muted: PropTypes.bool,
}

const ease = props => props.theme.ease.standard
const white = props => props.theme.color.white

const DUR = '300ms'

const Speaker = styled.path`
  fill: ${white};
  stroke: none;
`
const Line = styled.path`
  stroke: ${white};
  stroke-width: 1.5;
  fill: none;

  opacity: ${props => (props.disabled ? 0 : 1)};
  transform: translateX(${props => (props.disabled ? '-50%' : 0)});

  transition: ${DUR} transform ${ease}, ${DUR} opacity ${ease};
`

const X = styled(Line)``
const Arc = styled(Line)``
