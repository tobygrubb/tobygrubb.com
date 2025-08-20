import { GRID_CONFIG } from 'components/Work/Coordinates'
import gsap from 'gsap/all'
import * as PIXI from 'pixi.js'
import emitter from 'tiny-emitter/instance'
import Viewport from './Viewport'

import PlaySvg from './../components/Work/Play.svg'
import { asText } from 'util/helpers'

export const GRID_MARGIN = 30
export const ITEM_WIDTH = 215
export const ITEM_HEIGHT = 450
export const ITEM_RATIO = ITEM_WIDTH / ITEM_HEIGHT

const ANIMATION_OPTIONS = {
  duration: 3,
  ease: 'power3.out',
}

let CARDS = []
let cardFilter = 'all'

export function worldBounds(cardCount) {
  const coords = { minX: 0, maxX: 0, minY: 0, maxY: 0 }
  for (let i = 0; i < cardCount + 1; i++) {
    const point = GRID_CONFIG[i]
    if (point[0] < coords.minX) coords.minX = point[0]
    if (point[0] > coords.maxX) coords.maxX = point[0]
    if (point[1] < coords.minY) coords.minY = point[1]
    if (point[1] > coords.maxY) coords.maxY = point[1]
  }
  const width =
    (Math.abs(coords.minX) + Math.abs(coords.maxX)) *
      (ITEM_WIDTH + GRID_MARGIN) +
    ITEM_WIDTH
  const height =
    (Math.abs(coords.minY) + Math.abs(coords.maxY)) *
      (ITEM_HEIGHT + GRID_MARGIN) +
    ITEM_HEIGHT * 1.5
  return { width, height }
}

function createVideoCard(video) {
  let texture = PIXI.Texture.from(video.video.url)
  texture.baseTexture.resource.source.loop = true
  texture.baseTexture.resource.source.muted = true

  const button = PIXI.Sprite.from(PlaySvg)
  button.anchor.set(0.5)

  const scale = ITEM_HEIGHT / 1920
  const translateX = (1080 * scale - ITEM_WIDTH) * 0.5
  let matrix = new PIXI.Matrix()
  matrix.scale(scale, scale)
  matrix.translate(-translateX, 0)

  const item = new PIXI.Sprite()
  item.anchor.set(0.5)

  const bgColor = new PIXI.Graphics()
  bgColor.beginFill(0x000000, 1)
  bgColor.drawRoundedRect(0, 0, ITEM_WIDTH, ITEM_HEIGHT, 8)
  bgColor.endFill()

  const bgImage = new PIXI.Graphics()
  bgImage.beginTextureFill({
    texture,
    matrix,
  })
  bgImage.drawRoundedRect(0, 0, ITEM_WIDTH, ITEM_HEIGHT, 8)
  bgImage.endFill()

  bgImage.position.x = bgColor.position.x = ITEM_WIDTH * -0.5
  bgImage.position.y = bgColor.position.y = ITEM_HEIGHT * -0.5

  item.addChild(bgColor)
  item.addChild(bgImage)
  item.addChild(button)

  item.eventMode = 'static'
  item.cursor = 'pointer'

  item.alpha = 0
  item.position.y = 150

  item.on('click', function (e) {
    emitter.emit('video:click', video, item.position)
  })

  return {
    view: item,
  }
}

function createCard(caseStudy, cardIndex) {
  const header = caseStudy.data.header?.[0]?.image1
  const thumbnail = caseStudy.data.thumbnail
  const image = header?.url ? header : thumbnail

  const imageUrl = image.url
  const imageDimensions = image.dimensions

  const texture = PIXI.Texture.from(imageUrl)

  const scale = ITEM_HEIGHT / imageDimensions.height
  const translateX = (imageDimensions.width * scale - ITEM_WIDTH) * 0.5
  let matrix = new PIXI.Matrix()
  matrix.scale(scale, scale)
  matrix.translate(-translateX, 0)

  const point = GRID_CONFIG[cardIndex + 1]

  const item = new PIXI.Sprite()
  item.anchor.set(0.5)
  item.position.x = (ITEM_WIDTH + GRID_MARGIN) * point[0]
  item.position.y = (ITEM_HEIGHT + GRID_MARGIN) * point[1] + 150

  //create bg
  const bgImage = new PIXI.Graphics()
  bgImage.beginTextureFill({
    texture,
    matrix,
  })
  bgImage.drawRoundedRect(0, 0, ITEM_WIDTH, ITEM_HEIGHT, 8)
  bgImage.endFill()
  item.addChild(bgImage)

  // create overlay
  const overlay = new PIXI.Container()
  overlay.alpha = 0

  //create bg
  // const bgOverlay = new PIXI.Graphics()
  // bgOverlay.beginFill(0x000000)
  // bgOverlay.drawRoundedRect(0, 0, ITEM_WIDTH, ITEM_HEIGHT, 8)
  // bgOverlay.endFill()
  // bgOverlay.alpha = 0.2
  // overlay.addChild(bgOverlay)

  // create logo
  const logo = PIXI.Sprite.from(caseStudy.data.svg.url)
  logo.position.y = ITEM_WIDTH / 2 + 80
  logo.position.x = 20
  logo.scale.x = 80 / caseStudy.data.svg.dimensions.width
  logo.scale.y = logo.scale.x
  overlay.addChild(logo)

  // create title
  const tagline = asText(caseStudy.data.header[0].copy)
  const taglineText = new PIXI.Text(tagline, {
    fontFamily: 'calibre-light',
    fontSize: 20,
    fill: 0xffffff,
    align: 'left',
    wordWrap: true,
    wordWrapWidth: ITEM_WIDTH - 40,
  })
  taglineText.x = 20
  taglineText.y = ITEM_HEIGHT - taglineText.height - 80
  overlay.addChild(taglineText)

  // create work text
  const workText = new PIXI.Text('VIEW WORK', {
    fontFamily: 'calibre-light',
    fontSize: 10,
    letterSpacing: 3,
    fill: 0xffffff,
    align: 'left',
  })
  workText.x = 20
  workText.y = ITEM_HEIGHT - 60
  overlay.addChild(workText)

  item.addChild(overlay)

  overlay.position.x = bgImage.position.x = ITEM_WIDTH * -0.5
  overlay.position.y = bgImage.position.y = ITEM_HEIGHT * -0.5

  item.eventMode = 'static'
  item.cursor = 'pointer'

  item.alpha = 0

  item.on('mouseover', function (e) {
    // bgImage.scale.x = 1.02
    // bgImage.scale.y = 1.02
    // bgImage.position.x = ITEM_WIDTH * -0.01 + ITEM_WIDTH * -0.5
    // bgImage.position.y = ITEM_HEIGHT * -0.01 + ITEM_HEIGHT * -0.5

    gsap.to(bgImage.scale, {
      x: 1.02,
      y: 1.02,
      duration: 0.5,
      overwrite: true,
    })
    gsap.to(bgImage.position, {
      x: ITEM_WIDTH * -0.01 + ITEM_WIDTH * -0.5,
      y: ITEM_HEIGHT * -0.01 + ITEM_HEIGHT * -0.5,
      duration: 0.5,
      overwrite: true,
    })

    gsap.to(overlay, {
      alpha: 1,
      duration: 0.5,
      overwrite: true,
    })
  })
  item.on('mouseout', function (e) {
    // bgImage.scale.x = 1
    // bgImage.scale.y = 1
    // bgImage.position.x = ITEM_WIDTH * -0.5
    // bgImage.position.y = ITEM_HEIGHT * -0.5

    gsap.to(bgImage.scale, {
      x: 1,
      y: 1,
      duration: 0.5,
      overwrite: true,
    })
    gsap.to(bgImage.position, {
      x: ITEM_WIDTH * -0.5,
      y: ITEM_HEIGHT * -0.5,
      duration: 0.5,
      overwrite: true,
    })

    gsap.to(overlay, {
      alpha: 0,
      duration: 0.3,
      overwrite: true,
    })
  })
  item.on('click', function (e) {
    const viewport = Viewport.get()
    if (!viewport.disableClick) {
      const position = item.getGlobalPosition()
      emitter.emit('card:click', caseStudy, position)
    }
  })

  return {
    view: item,
    overlay,
    bgImage,
  }
}

export function showCards(delay = 0.5) {
  CARDS.forEach((card, i) => {
    const delay = Math.random() * 0.75 + 0.25
    gsap.to(card.view.position, {
      y: '-=150',
      delay,
      ...ANIMATION_OPTIONS,
    })
    gsap.to(card.view, {
      alpha: 1,
      delay,
      ...ANIMATION_OPTIONS,
    })
  })
}

export function hideCards() {
  CARDS.forEach((card, i) => {
    gsap.to(card.view.position, {
      y: '+=150',
      ...ANIMATION_OPTIONS,
      duration: 0,
    })
    gsap.to(card.view, {
      alpha: 0,
      ...ANIMATION_OPTIONS,
      duration: 0,
    })
  })
}

export function updateFilter(filter, caseStudies) {
  cardFilter = filter
  CARDS.forEach((card, i) => {
    if (i > 0) {
      const item = caseStudies[i - 1]
      const hasTag =
        item.tags && item.tags.length > 0 && item.tags.includes(cardFilter)

      gsap.to(card.view, {
        alpha: hasTag || filter === 'all' ? 1 : 0.25,
        ...ANIMATION_OPTIONS,
      })
    }
  })
}

export function toggleCards(canHover, caseStudies) {
  CARDS.forEach((card, i) => {
    if (i > 0) {
      if (cardFilter === 'all') {
        card.view.eventMode = canHover ? 'static' : 'none'
        card.view.cursor = canHover ? 'pointer' : 'none'
      } else {
        const item = caseStudies[i - 1]
        const hasTag =
          item.tags && item.tags.length > 0 && item.tags.includes(cardFilter)
        card.view.eventMode = canHover && hasTag ? 'static' : 'none'
        card.view.cursor = canHover && hasTag ? 'pointer' : 'none'
      }
      if (!canHover)
        gsap.to(card.overlay, {
          alpha: 0,
          ...ANIMATION_OPTIONS,
        })
      gsap.to(card.bgImage.scale, {
        x: 1,
        y: 1,
        ...ANIMATION_OPTIONS,
      })
      gsap.to(card.bgImage.position, {
        x: ITEM_WIDTH * -0.5,
        y: ITEM_HEIGHT * -0.5,
        ...ANIMATION_OPTIONS,
      })
    }
  })
}

export function createCards(video, caseStudies) {
  const view = new PIXI.Container()

  const videoCard = createVideoCard(video)
  view.addChild(videoCard.view)
  CARDS.push(videoCard)

  for (var i = 0; i < caseStudies.length; i++) {
    const card = createCard(caseStudies[i], i)
    CARDS.push(card)
    view.addChild(card.view)
  }

  return view
}
