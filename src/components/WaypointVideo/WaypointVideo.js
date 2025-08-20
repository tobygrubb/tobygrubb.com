import React from 'react'
import Waypoint from 'react-waypoint'
import VideoNode from 'components/VideoNode/VideoNode'

export default class WaypointVideo extends React.Component {
  state = {
    playing: false,
  }

  onEnter = () => {
    this.setState({ playing: true })
  }

  onLeave = () => {
    this.setState({ playing: false })
  }

  render() {
    return (
      <Waypoint
        onEnter={!this.props.controls ? this.onEnter : () => null}
        onLeave={this.onLeave}
      >
        <div>
          <VideoNode {...this.props} playing={this.state.playing} />
        </div>
      </Waypoint>
    )
  }
}
