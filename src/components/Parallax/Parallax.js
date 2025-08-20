import React from 'react'
import PropTypes from 'prop-types'
import isMobile from 'util/isMobile'
import ParallaxController from './libs/ParallaxController'

export default class Parallax extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    className: PropTypes.string,
    speed: PropTypes.number,
  }

  static defaultProps = {
    speed: -100,
    className: null,
  }

  constructor(props) {
    super(props)
    this.ref = React.createRef()
  }

  componentDidMount() {
    this.controller = new ParallaxController({
      container: document.querySelector('.casestudy'),
      el: this.ref.current,
      speed: this.props.speed,
    })

    if (!isMobile()) {
      this.controller.init()
    }
  }

  componentWillUnmount() {
    this.controller.destroy()
  }

  render() {
    const { children, className } = this.props
    const { ref } = this

    return (
      <div className={className} ref={ref}>
        {children}
      </div>
    )
  }
}
