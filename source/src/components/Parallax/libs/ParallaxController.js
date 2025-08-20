// Scrollable container
let container = null

// Only bind listener once
let mounted = false

// All parallax elements to be updated
let els = []

// Ticking
let ticking = false

// speed of parallax
let speed = 0

/**
 * calculates offset of a DOM element
 * @param {[type]} el Dom Element
 */
const _getOffset = el => {
  const bounds = el.getBoundingClientRect()
  const distFromCtr = window.innerHeight / 2 - (bounds.height / 2 + bounds.top)
  return ((distFromCtr / 400) * -speed).toFixed(2)
}

/**
 * Checks if element is in view
 * @param {[type]} el Dom Element
 */
const _isInView = (el, bias = 200) => {
  const bounds = el.getBoundingClientRect()
  const isBelowView = bounds.top - bias - window.innerHeight > 0
  const isAboveView = bounds.bottom + bias < 0
  return !isBelowView && !isAboveView
}

/**
 * Makes changes to DOM and updates
 * position of Elements
 */
const _updateElements = () => {
  els.forEach((el, i) => {
    const offset = _getOffset(el)

    if (_isInView(el)) {
      els[i].style.transform = `translate3d(0,${offset}px, 0)`
    }
  })
  ticking = false
}

/**
 * Manages rAF ticking and calls _updateElements
 */
const _handleScroll = () => {
  if (!ticking) {
    ticking = true
    window.requestAnimationFrame(_updateElements)
  }
}

/**
 * Sets up event listener
 */
const _addListener = () => {
  container.addEventListener('scroll', _handleScroll, { passive: true })
}

const _removeListener = () => {
  container.removeEventListener('scroll', _handleScroll, { passive: true })
}

/**
 * Public methods
 */
export default class ParallaxController {
  constructor(props) {
    ;({ container, speed } = props)
    this.el = props.el
  }

  init = () => {
    els.push(this.el)

    if (!mounted) {
      _addListener()
      mounted = true
    }
  }

  destroy = () => {
    _removeListener()
    mounted = false
    els = []
  }
}
