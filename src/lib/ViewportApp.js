import { gsap, InertiaPlugin, PixiPlugin } from 'gsap/all'
gsap.registerPlugin(InertiaPlugin)
gsap.registerPlugin(PixiPlugin)

import * as PIXI from 'pixi.js'
import Viewport from './Viewport'
import {
  createCards,
  hideCards,
  ITEM_HEIGHT,
  ITEM_WIDTH,
  showCards,
  toggleCard,
  toggleCards,
  updateFilter,
  worldBounds,
} from './ViewportCards'
import emmiter from 'tiny-emitter/instance'
import CustomMouseMove from './CustomMouseMove'
import Overlay from './Overlay'
import CustomDrag from './CustomDrag'

let app
let overlay
let started = false

export function isInited() {
  if (app) {
    return true
  }
  return false
}

export function init() {
  app = new PIXI.Application({
    background: 0x000000,
    width: window.innerWidth,
    height: window.innerHeight,
    resolution: window.devicePixelRatio,
    antialias: true,
  })
  app.view.style.width = '100vw'
  app.view.style.height = '100vh'
  return app
}

export function preload(images) {
  return Promise.all(
    images.map((path) => {
      return new Promise((resolve) => {
        var img = new Image()
        img.onload = () => {
          resolve()
        }
        img.src = path
      })
    })
  )
}

export function create(caseStudies, homepage) {
  const bounds = worldBounds(caseStudies.length)

  const viewport = Viewport.create(
    app.renderer,
    bounds.width,
    bounds.height,
    true
  )

  const center = {
    x: app.screen.width / 2,
    y: app.screen.height / 2,
  }

  app.stage.addChild(viewport)

  overlay = Overlay.create()
  app.stage.addChild(overlay)

  const cards = createCards(
    {
      image: homepage.image,
      video: homepage.video_reel_loop,
    },
    caseStudies
  )
  cards.position.x = bounds.width * 0.5
  cards.position.y = bounds.height * 0.5

  viewport.addChild(cards)

  // move to the right spot
  viewport.moveCenter(cards.position.x, cards.position.y)
  // viewport.fit(true)

  CustomMouseMove.enable()

  emmiter.on('filter:change', ({ key }) => {
    updateFilter(key, caseStudies)
  })

  emmiter.on('filter:show', () => {
    CustomMouseMove.disable()
    toggleCards(false, caseStudies)
    gsap.to(cards.position, {
      duration: 0.7,
      ease: 'power3.out',
      x: bounds.width * 0.5 - 378,
    })
    gsap.to(cards.scale, {
      duration: 0.7,
      x: 0.85,
      y: 0.85,
    })
  })
  emmiter.on('filter:hide', () => {
    toggleCards(true, caseStudies)
    gsap.to(cards.position, {
      duration: 0.7,
      ease: 'power3.out',
      x: bounds.width * 0.5,
    })
    gsap.to(cards.scale, {
      duration: 0.7,
      x: 1,
      y: 1,
    })
    CustomMouseMove.enable()
  })

  emmiter.on('card:click', function (caseStudy, position) {
    const header = caseStudy.data.header[0]

    CustomMouseMove.disable()

    const config = {}
    config.image = header.image1?.url
    config.startX = position.x
    config.startY = position.y
    config.startScale = ITEM_HEIGHT / header.image1.dimensions.height

    const AppRatio = window.innerWidth / window.innerHeight
    const ImageRatio =
      header.image1.dimensions.width / header.image1.dimensions.height

    if (ImageRatio < AppRatio) {
      config.endScale = app.screen.width / header.image1.dimensions.width
    } else {
      config.endScale = app.screen.height / header.image1.dimensions.height
    }

    Overlay.resize(window.innerWidth, window.innerHeight)
    Overlay.setConfig(config)
    Overlay.show(caseStudy.uid)
  })

  emmiter.on('overlay:hide', () => {
    Overlay.hide(false)
    hideCards()
  })

  emmiter.on('cards:show', () => {
    if (started) {
      showCards()
    }
  })

  window.onresize = () => {
    CustomMouseMove.disable()
    app.renderer.resize(window.innerWidth, window.innerHeight)
    viewport.resize(window.innerWidth, window.innerHeight)
    CustomDrag.updateBounds()
    CustomMouseMove.enable(viewport.center)
  }
}

export function get() {
  return app
}

export function start() {
  started = true
  update()
  showCards()
}

function update() {
  // const vp = Viewport.get()
  // if (vp.dirty) {
  //   //update animations
  //   app.renderer.render(vp)
  //   app.renderer.render(overlay)
  //   vp.dirty = false
  // }
  requestAnimationFrame(() => update())
}

export default {
  init,
  isInited,
  create,
  preload,
  get,
  start,
}
