import gsap from 'gsap/all'
import { ITEM_HEIGHT, ITEM_WIDTH } from './ViewportCards'
import * as PIXI from 'pixi.js'
import emitter from 'tiny-emitter/instance'

let overlay
let sprite
let mask
let props
let screen
let animating = false
let currentUID = ''

let MaskConfig = {
  width: ITEM_WIDTH,
  height: ITEM_HEIGHT,
  radius: 8,
}

function create() {
  overlay = new PIXI.Container()
  overlay.alpha = 0
  overlay.visible = false
  overlay.eventMode = 'static'
  overlay.cursor = 'pointer'
  overlay.addEventListener('click', handleClick)
  return overlay
}

function handleClick() {
  if (animating) {
    return
  }
  hide()
}

function setImage(image) {
  if (image === props?.image) {
    return
  }

  if (sprite) {
    sprite.mask = null
    overlay.removeChild(sprite)
    sprite.destroy()
  } else {
    mask = new PIXI.Graphics()
    drawMask()
    overlay.addChild(mask)
  }

  sprite = PIXI.Sprite.from(image)
  sprite.anchor.set(0.5)
  sprite.mask = mask
  overlay.addChild(sprite)
}

function setConfig({ image, ...options }) {
  if (image) {
    setImage(image)
  }

  props = options

  //initialize overlay start
  overlay.position.x = props.startX
  overlay.position.y = props.startY
  sprite.scale.x = props.startScale
  sprite.scale.y = props.startScale
}

function resize(width, height) {
  screen = {
    width,
    height,
  }
}

function show(uid) {
  if (animating) return
  currentUID = uid
  overlay.visible = true
  animating = true

  gsap.to(overlay, {
    duration: 0.3,
    ease: 'expo.inOut',
    alpha: 1,
  })

  gsap.to(overlay, {
    duration: 1,
    ease: 'expo.inOut',
    x: screen.width / 2,
    y: screen.height / 2,
    delay: 0.3,
  })

  gsap.to(sprite.scale, {
    duration: 1,
    ease: 'expo.inOut',
    x: props.endScale,
    y: props.endScale,
    delay: 0.3,
  })

  //animate mask
  gsap.to(MaskConfig, {
    duration: 1,
    ease: 'expo.inOut',
    width: screen.width,
    height: screen.height,
    radius: 0,
    delay: 0.3,
    onUpdate: drawMask,
    onComplete: showComplete,
  })
}

function showComplete() {
  animating = false
  emitter.emit('route:update', { uid: currentUID })
}

function hide(animate = true) {
  if (animating || !overlay || !props) return

  animating = true
  const duration = animate ? 1 : 0

  gsap.to(overlay, {
    duration,
    ease: 'expo.inOut',
    x: props.startX,
    y: props.startY,
    alpha: 0,
  })

  gsap.to(sprite.scale, {
    duration,
    ease: 'expo.inOut',
    x: props.startScale,
    y: props.startScale,
  })

  //animate mask
  gsap.to(MaskConfig, {
    duration,
    ease: 'expo.inOut',
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    radius: 8,
    onUpdate: drawMask,
    onComplete: hideComplete,
  })
}

function hideComplete() {
  animating = false
  overlay.visible = false
}

function drawMask() {
  mask.clear()
  mask.beginFill(0x00ff00)
  mask.drawRoundedRect(
    -MaskConfig.width / 2,
    -MaskConfig.height / 2,
    MaskConfig.width,
    MaskConfig.height,
    MaskConfig.radius
  )
  mask.endFill()
}

export default {
  create,
  setConfig,
  show,
  hide,
  resize,
}
