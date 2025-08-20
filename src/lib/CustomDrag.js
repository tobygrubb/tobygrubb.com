import { gsap, VelocityTracker } from 'gsap/all'
import CustomMouseMove from './CustomMouseMove'

const BOUNDS_BORDER = 50
const MIN_DISTANCE = 5
let viewport
let resizing = false

export function createDrag(vp) {
  viewport = vp
  viewport
    .on('pointerdown', onDragStart)
    .on('pointerup', onDragEnd)
    .on('pointerupoutside', onDragEnd)
    .on('pointermove', onDragMove)

  window.addEventListener('wheel', handleWheel)

  VelocityTracker.track(viewport.position, 'x,y')
}

function onDragStart(event) {
  CustomMouseMove.disable()

  if (this.tween) {
    this.tween.kill()
  }

  this.data = event.data
  this.distance = 0
  this.disableClick = false
  this.lastPosition = this.data.getLocalPosition(this.parent)
}

function onDragMove(event) {
  if (this.lastPosition) {
    var newPosition = this.data.getLocalPosition(this.parent)

    if (this.distance < MIN_DISTANCE) {
      const distance = Math.sqrt(
        Math.pow(newPosition.x - this.lastPosition.x, 2) +
          Math.pow(newPosition.y - this.lastPosition.y, 2)
      )
      if (this.distance + distance >= MIN_DISTANCE) {
        this.disableClick = true
        this.distance = MIN_DISTANCE + 1
      } else {
        this.distance += distance
      }
    }

    const newX = this.position.x + newPosition.x - this.lastPosition.x
    const newY = this.position.y + newPosition.y - this.lastPosition.y

    if (this.screenWidth < this.width) {
      this.position.x = Math.min(
        BOUNDS_BORDER * 2,
        Math.max(newX, this.screenWidth - (this.width + BOUNDS_BORDER * 2))
      )
    }

    if (this.screenHeight < this.height) {
      this.position.y = Math.min(
        BOUNDS_BORDER * 2,
        Math.max(newY, this.screenHeight - (this.height + BOUNDS_BORDER * 2))
      )
    }

    this.lastPosition = newPosition
  }
}

function handleWheel(e) {
  if (window.location.pathname !== '/') {
    return
  }

  CustomMouseMove.disable()

  const newX = viewport.position.x - e.deltaX
  const newY = viewport.position.y - e.deltaY

  if (window.innerWidth < viewport.width) {
    viewport.position.x = Math.min(
      BOUNDS_BORDER,
      Math.max(newX, viewport.screenWidth - (viewport.width + BOUNDS_BORDER))
    )
  }

  if (window.innerHeight < viewport.height) {
    viewport.position.y = Math.min(
      BOUNDS_BORDER,
      Math.max(newY, viewport.screenHeight - (viewport.height + BOUNDS_BORDER))
    )
  }

  CustomMouseMove.enable(viewport.center)
}

export function updateBounds() {
  resizing = true
  if (window.innerWidth > viewport.width) {
    viewport.position.x = (window.innerWidth - viewport.width) * 0.5
  } else {
    viewport.position.x = Math.min(
      BOUNDS_BORDER,
      Math.max(
        viewport.position.x,
        viewport.screenWidth - (viewport.width + BOUNDS_BORDER)
      )
    )
  }
  if (window.inneHeight > viewport.widthHeight) {
    viewport.position.y = (window.inneHeight - viewport.height) * 0.5
  } else {
    viewport.position.y = Math.min(
      BOUNDS_BORDER,
      Math.max(
        viewport.position.y,
        viewport.screenHeight - (viewport.height + BOUNDS_BORDER)
      )
    )
  }
}

function onDragEnd(event) {
  this.data = null
  this.lastPosition = null

  const vX = VelocityTracker.getByTarget(this.position).get('x') * 0.5
  const vY = VelocityTracker.getByTarget(this.position).get('y') * 0.5

  this.tween = gsap.to(this.position, {
    inertia: {
      duration: { min: 0.5, max: 1 },
      x:
        this.screenWidth < this.width
          ? {
              resistance: 500,
              velocity: Math.max(Math.min(1500, vX), -1500),
              min: this.screenWidth - (this.width + BOUNDS_BORDER),
              max: BOUNDS_BORDER,
            }
          : {},
      y:
        this.screenWidth < this.height
          ? {
              velocity: Math.max(Math.min(1500, vY), -1500),
              resistance: 500,
              min: this.screenHeight - (this.height + BOUNDS_BORDER),
              max: BOUNDS_BORDER,
            }
          : {},
    },
    onComplete: () => {
      this.tween = null
      CustomMouseMove.enable()
    },
  })
}

export default {
  createDrag,
  updateBounds,
}
