import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import isMobile from 'util/isMobile'
import Styled from './styled'
import { RichText } from 'prismic-reactjs'
import { CsContext } from '../../CaseStudy'
import Waypoint from 'react-waypoint'


const mobile = isMobile()

const Cover = () => {

  const context = useContext(CsContext)

  const { header, tags, date, credits, launch_site_text, launch_site_link, launch_site_background, launch_site_text1, svg, next, csTransitioning } = context
  const [panel, setPanel] = useState(false)

  const togglePanel = () => {
    setPanel(!panel)
  }

  const dateArr = date ? date.split('-') : []
  const [visible, setVisible] = useState(false)
  const [coverVisible, setCoverVisible] = useState(false)
  const classNames = [
    'casestudy__cta',
    visible ? 'wp-show' : '',
  ].join(' ')

  const backgroundcolor = launch_site_background ? launch_site_background : '#ffffff'
  const textcolor = launch_site_text1 ? launch_site_text1 : '#000000'
  const colorStyles = {
    color: textcolor, 
    backgroundColor: backgroundcolor
  }

  const hidePanelClass = next && !csTransitioning ? 'hide' : ''

  let targetAttr = {} as any
  if(launch_site_link?.target) {
    targetAttr.target = launch_site_link.target
  }
  

  return (
    <>
    <Waypoint onEnter={() => setCoverVisible(true)}>
  <div>
    <Styled.Cover coverVisible={coverVisible}>
      <Styled.Fill backgroundColor={header.backgroundColor} />
      <Styled.Header>
        <div>
          <Styled.Logo src={svg.url} alt={header.title} {...{ csTransitioning, next }}></Styled.Logo>
          <Styled.Title itemTitle {...{ csTransitioning, next }} className="h1">
            {header.description}
          </Styled.Title>
          <div className={`casestudy__details ${hidePanelClass}`}>
            <button onClick={() => togglePanel()}>{panel ? 'Close' : 'Show'} Details</button>
          </div>
        </div>
        <Waypoint
         onEnter={() => setVisible(true)}
         onLeave={() => setVisible(false)}
         topOffset="-100px"
         bottomOffset="40px"
        >
          <div className={classNames}>
            <div className={`casestudy__toggle-outer`}>
              <div className={`casestudy__toggle ${hidePanelClass} ${panel ? 'active' : ''}`}  onClick={() => togglePanel()}></div>
            </div>
            {launch_site_text && launch_site_link && 
              <a href={launch_site_link.url} style={colorStyles} target='_blank' rel="noopener noreferrer">
                {launch_site_text}
              </a>}
          </div>
        </Waypoint>
      </Styled.Header>
      <Splash />
    </Styled.Cover>
    </div>          
    </Waypoint>
    <div className={`casestudy__panel  ${panel ? 'active' : ''} dark`}>
      <div className="casestudy__panel-inner">
        <div className="casestudy__services">
          {tags && RichText.render(tags)}
          <div>
            <span>{dateArr[1]}_{dateArr[0]}</span>
          </div>
        </div>
        <div className="casestudy__intro">
          {credits && RichText.render(credits)}
        </div>
      </div>
    </div>
    {/* <div className={'casestudy__footer'} style={{backgroundColor: header.backgroundColor}}>
      
    </div> */}
    </>
  )
}

const Splash = () => {
  const { header } = useContext(CsContext)
  const { videoUrl, imageUrl, mobileImage } = header.background

  if (!mobile) {
    return (
      <Styled.Splash image={!videoUrl && imageUrl}>
        {videoUrl && <Video src={videoUrl} />}
        <AuxiliaryItem />
      </Styled.Splash>
    )
  }
  return <Styled.Splash image={mobileImage} />
}

const AuxiliaryItem = () => {
  const { header, alt } = useContext(CsContext)
  const { width, videoUrl, position, imageUrl } = header.auxItem
  return (
    <Styled.AuxWrapper
      width={width}
      position={position}
      data-name="Aux Item Container"
    >
      {imageUrl && <Styled.AuxImg src={imageUrl} alt={alt} />}
      {videoUrl && <Video src={videoUrl} />}
    </Styled.AuxWrapper>
  )
}

interface VideoProps {
  src: string
}

const Video: React.FC<VideoProps> = ({ src }) =>
  src ? (
    <Styled.Video autoPlay muted loop playsinline>
      <source src={src} />
    </Styled.Video>
  ) : null

Video.defaultProps = {
  src: null,
}

Video.propTypes = {
  src: PropTypes.string,
}

export default React.memo(Cover)
