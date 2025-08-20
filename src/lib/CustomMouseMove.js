import gsap from 'gsap/all'

const OFFSET = 25

let center = { x: 0, y: 0 }
let percent
let viewport
let enabled = false
let tween

export function create(vp) {
  viewport = vp
  window.addEventListener('mousemove', (event) => {
    percent = {
      x: (event.clientX - viewport.screenWidth / 2) / viewport.screenWidth,
      y: (event.clientY - viewport.screenHeight / 2) / viewport.screenHeight,
    }
    if (enabled) {
      tween = gsap.to(viewport, {
        duration: 0.3,
        overwrite: true,
        x: center.x + percent.x * OFFSET,
        y: center.y + percent.y * OFFSET,
      })
    }
  })
}

export function enable(newCenter) {
  if (newCenter) {
    center.x = newCenter.x
    center.y = newCenter.y
  }

  center.x = viewport.x - (percent ? percent.x * OFFSET : 0)
  center.y = viewport.y - (percent ? percent.y * OFFSET : 0)
  enabled = true
}

export function disable() {
  enabled = false
  if (tween) {
    tween.kill()
  }
}

export default {
  create,
  enable,
  disable,
}
