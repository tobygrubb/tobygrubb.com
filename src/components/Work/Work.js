import React, { useContext, useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { ApiDataCtx } from 'containers/App/App'
import { LayoutContext } from 'containers/Layout/Layout'
import { Link, withRouter } from 'react-router-dom'

import useWindowSize from 'util/useWindowSize'

import { RichText } from 'prismic-reactjs'
import { Swiper, SwiperSlide } from 'swiper/react'
import { CSSTransition } from 'react-transition-group'

import VideoNode from '../VideoNode/VideoNode'
import FilterSvg from './Filter.svg'
import 'swiper/scss'
import './Work.scss'
import WorkDesktop from './WorkDesktop'

function Work({ projectLaunchStatus }) {
  const windowSize = useWindowSize()
  const [shouldBeVisible, setShouldBeVisible] = useState(true)
  const [showModal, setShowModal] = useState(false)

  const { contextCaseStudies, home } = useContext(ApiDataCtx)
  const { launchProject, filters } = useContext(LayoutContext)
  const [caseStudies] = useState(contextCaseStudies)

  useEffect(() => {
    setTimeout(() => {
      setShouldBeVisible(true)
    }, 250)
  }, [])
  return (
    <div className="work-overflow">
      <div
        className={`work__inner view__child -wrap-nav ${
          shouldBeVisible ? 'active' : ''
        }`}
      >
        {windowSize.width <= 475 && (
          <WorkMobile setShowModal={setShowModal} data={contextCaseStudies} />
        )}
        {windowSize.width > 475 && (
          <WorkDesktop
            projectLaunchStatus={projectLaunchStatus}
            setShowModal={setShowModal}
          />
        )}
      </div>
      <div id="expander" className="work__expander"></div>
      <CSSTransition
        in={showModal}
        timeout={400}
        classNames="fade-slide"
        mountOnEnter
        unmountOnExit
      >
        <WorkReelModal
          setShowModal={setShowModal}
          video={home.video_reel.url}
        />
      </CSSTransition>
    </div>
  )
}

const WorkMobile = ({ setShowModal, data }) => {
  const { home } = useContext(ApiDataCtx)

  const slider = useRef()
  useEffect(() => {
    return () => {
      slider.current.destroy()
    }
  }, [])

  return (
    <div>
      <Swiper
        speed={650}
        spaceBetween={20}
        slidesPerView={'auto'}
        centeredSlides={true}
        onSwiper={(swiper) => (slider.current = swiper)}
      >
        <SwiperSlide>
          <WorkVideoThumb
            video={home.video_reel_loop}
            setShowModal={setShowModal}
          />
        </SwiperSlide>
        {data
          .slice(0, 3)
          .map(({ uid, data: { thumbnail, svg, header } }, index) => {
            const mobileImage = header[0]?.mobileImage
            const joinedCopy = header[0].copy.map((item) => item.text).join('')

            return (
              <SwiperSlide key={`ss_${uid}`}>
                <WorkThumbnail
                  key={uid}
                  uid={uid}
                  featured={true}
                  thumbnail={mobileImage}
                  svg={svg}
                  title={joinedCopy}
                />
              </SwiperSlide>
            )
          })}
        <SwiperSlide>
          <WorkList items={data.slice(3, data.length)} />
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

const WorkVideoThumb = ({ left, top, dragging, setShowModal, video }) => {
  const ref = useRef()
  return (
    <div
      className="work__item__video"
      style={{ left, top }}
      onClick={() => {
        if (!(dragging && dragging.current === true)) {
          setShowModal(true)
        }
      }}
    >
      {video && video.url && (
        <div className="work__item__video--wrapper">
          <video autoPlay loop muted playsInline ref={ref}>
            <source src={video.url} type="video/mp4" />
          </video>
        </div>
      )}
      <img
        className="work__item__video--play"
        src={require('./Play.svg').default}
        alt=""
      />
    </div>
  )
}

const WorkList = ({ items }) => {
  const { filters, setFilters } = useContext(LayoutContext)

  return (
    <div className="work__list">
      <div className="work__list__filter">
        <button>Show All</button>
        <img
          className="work__list__filter__icon"
          src={FilterSvg}
          alt=""
          onClick={() => {
            setFilters({
              ...filters,
              active: true,
            })
          }}
        />
      </div>
      <div className="work__list__inner">
        <div className="work__list__container">
          <div className="work__list__items">
            {items.map((caseStudy, index) => {
              const hasTag = caseStudy.tags.includes(filters.tag)

              return (
                <Link
                  to={`/work/${caseStudy.uid}`}
                  key={`work-list-item${index}`}
                >
                  <div
                    className={`work__list__item ${hasTag ? 'disable' : ''}`}
                  >
                    <div className="work__list__item--thumb">
                      <img src={caseStudy.data.thumbnail.url} alt="" />
                    </div>
                    <div className="work__list__item--content">
                      <div className="work__list__item--content-inner">
                        <div className="work__list__item--title">
                          {caseStudy.data.title}
                        </div>
                        <div className="work__list__item--subtitle">
                          {RichText.asText(caseStudy.data.project_location)}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

const WorkReelModal = ({ setShowModal, video }) => {
  const containerRef = useRef()
  const windowSize = useWindowSize()
  const [dimensions, setDimensons] = useState({
    width: 'unset',
    height: 'unset',
  })

  useEffect(() => {
    if (windowSize.width !== undefined) {
      const rect = containerRef.current.getBoundingClientRect()
      const rectHeight = rect.height

      let maxWidth = windowSize.width > 1920 ? 1920 : windowSize.width
      let maxHeight = maxWidth * (9 / 16)

      if (maxHeight > rectHeight) {
        maxHeight = rectHeight
        maxWidth = rectHeight * (16 / 9)
      }

      setDimensons({ width: maxWidth + 'px', height: maxHeight + 'px' })
    }
  }, [windowSize, containerRef])

  return (
    <div className="work__modal">
      <div className="work__modal-wrapper" ref={containerRef}>
        <div className="react-player-wrapper" style={dimensions}>
          <VideoNode
            url={video}
            controls={true}
            poster={'/video/poster.jpg'}
            autoPlay={true}
            playing={true}
          />
        </div>
      </div>
      <button className="close" onClick={() => setShowModal(false)}>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="1.41431"
            width="14"
            height="2"
            transform="rotate(45 1.41431 0)"
            fill="white"
          />
          <rect
            y="10"
            width="14"
            height="2"
            transform="rotate(-45 0 10)"
            fill="white"
          />
        </svg>
      </button>
    </div>
  )
}

const WorkThumbnail = withRouter(
  ({
    history,
    uid,
    featured,
    thumbnail,
    video,
    svg,
    title,
    dragging,
    launchProject,
    top,
    left,
    delay,
    disable,
    expandAnimation,
  }) => {
    const styles = top && left ? { top, left } : {}
    styles.transitionDelay = `${delay}s`

    return (
      <Link
        className={`work__link ${disable ? 'disable' : ''}`}
        to={`/work/${uid}`}
        key={uid}
        style={styles}
      >
        <div className="work__link__wrapper">
          <img
            className="work__link__item"
            src={thumbnail.url}
            alt={thumbnail.alt}
            nopin="nopin"
          />
          {video && (
            <div className="work__link__item--wrapper">
              <video autoPlay loop muted playsInline>
                <source src={video.url} type="video/mp4" />
              </video>
            </div>
          )}
          <div className="work__link__item--outer">
            <img
              className={`work__link__item--svg ${featured ? 'featured' : ''} `}
              nopin="nopin"
              src={svg.url}
              alt={svg.alt}
            />
          </div>
        </div>
        <div className="work__link__content">
          <p className="work__link__item--title">{title}</p>
          <p className="work__link__item--subtitle">View Work</p>
        </div>
      </Link>
    )
  }
)

WorkThumbnail.propTypes = {
  uid: PropTypes.string.isRequired,
  thumbnail: PropTypes.object.isRequired,
  svg: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
}

export default React.memo(Work)
