import React, { useEffect, useRef, useState } from 'react'
import { PrismicImage } from 'types/prismic'
import S from './PanningGallery.Styled'
import Flickity from 'flickity-imagesloaded'

type PanningGallery = {
  items: {
    image: PrismicImage
  }[]
  primary: {
    cell_width: number | null
    cell_grouping: boolean
  }
}

type DirectionIndex = -1 | 0 | 1

const PanningGallery: React.FC<{ data: PanningGallery }> = ({ data }) => {
  const [directionIndex, setDirectionIndex] = useState<DirectionIndex>(0)
  const galleryRef = useRef(null)
  const cursorRef = useRef(null)
  const flickity = useRef<any>()

  // initialize flickity
  useEffect(() => {
    if (galleryRef.current) {
      const resizeForMobile = () => {
        const wrappers = [
          ...galleryRef.current.querySelectorAll('.js-imagewrapper'),
        ]
        wrappers.forEach(wrapper => (wrapper.style.width = '70%'))
      }

      const getCellCount = () => {
        if (window.innerWidth < 720) {
          resizeForMobile()
          return 1
        }
        return data.primary.cell_grouping === true ? 2 : 1
      }

      const flkty = new Flickity(galleryRef.current, {
        imagesLoaded: true,
        wrapAround: true,
        prevNextButtons: false,
        pageDots: false,
        groupCells: getCellCount(),
      })

      flickity.current = flkty
    }
    // eslint-disable-next-line
  }, [])

  const xBounds = useRef({
    furthestLeft: null,
    furthestRight: null,
  })

  // set bounds of "next", "prev", or "inside"
  const setXBounds = () => {
    if (flickity.current) {
      const centerRects = flickity.current.selectedCells.map(item =>
        item.element.getBoundingClientRect()
      )

      const furthestLeft = Math.min(...centerRects.map(rect => rect.x))
      const furthestRight = Math.max(
        ...centerRects.map(rect => rect.x + rect.width)
      )

      xBounds.current = { furthestRight, furthestLeft }
    }
  }

  // forward or backward
  const getDirectionIndex = (mouseX): DirectionIndex => {
    setXBounds()
    if (xBounds.current.furthestLeft > mouseX) return -1
    if (xBounds.current.furthestRight < mouseX) return 1
    return 0
  }

  // events
  useEffect(() => {
    if (flickity.current) {
      const flkty = flickity.current

      flkty.on('change', setXBounds)

      flkty.on('staticClick', event => {
        const indexChange = getDirectionIndex(event.clientX)
        flkty.select(flkty.selectedIndex + indexChange, true)
      })
    }
    // eslint-disable-next-line
  }, [flickity.current])

  const handleCursor = (x: number, y: number) => {
    if (galleryRef.current) {
      const galleryBounds = galleryRef.current.getBoundingClientRect()
      const [natX, natY] = [x - galleryBounds.x, y - galleryBounds.y]

      cursorRef.current.style.transform = `translate3d(${natX}px, ${natY}px, 0)`
    }
  }

  // for cursor
  const handleMouseOver = (e: React.MouseEvent) => {
    handleCursor(e.clientX, e.clientY)
    const directionIndexOfMouse = getDirectionIndex(e.clientX)

    if (directionIndexOfMouse !== directionIndex) {
      setDirectionIndex(directionIndexOfMouse)
    }
  }

  const isCursor = directionIndex !== 0

  return (
    <>
      <S.Cursor ref={cursorRef}>
        <S.CursorInner inverted={directionIndex === -1}>
          {isCursor && <ArrowSvg />}
        </S.CursorInner>
      </S.Cursor>
      <S.Wrapper
        onMouseMove={handleMouseOver}
        onMouseOut={() => setDirectionIndex(0)}
        ref={galleryRef}
        className="flexy-carousel "
        isCursor={isCursor}
      >
        {data.items.map(
          (item, i) =>
            item.image.url && (
              <S.ImageWrapper
                key={item.image.url}
                width={data.primary.cell_width}
                className="js-imagewrapper"
              >
                <img src={item.image.url} alt=""/>
              </S.ImageWrapper>
            )
        )}
      </S.Wrapper>
    </>
  )
}

const ArrowSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 195 67">
    <path
      fill="#fff"
      d="M161.5 0l-7.9 7.799L173.501 27.8H0v11.101h173.501L153.6 58.8l7.9 7.8 33.1-33.2-.1-.1.1-.1z"
      fill-rule="evenodd"
    />
  </svg>
)

export default PanningGallery
