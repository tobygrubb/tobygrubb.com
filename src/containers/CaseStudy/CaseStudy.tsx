import React, { useContext, useState } from 'react'
import { LayoutContext } from 'containers/Layout/Layout'
import Head from 'components/Head'

import './CaseStudy.scss'
import Styled from './styled'
import Posed, { getPose } from './posed'
import Partials from './partials/index'
import _getContextProps from './util/_getContextProps'
import { CaseStudyDoc } from 'types'
import Waypoint from 'react-waypoint'

/**
 * Types
 */

interface IProps {
  doc: CaseStudyDoc
  next: boolean
  initCsChange: () => void
  openingFromHome: boolean
  initHomeOpen: () => void
  csTransitioning: boolean
}

interface IContextProps {
  isHome: boolean
  next: boolean
  openingFromHome: boolean
  alt: string
  csTransitioning: boolean,
  svg: any,
  dark: boolean,
  credits: any, 
  tags: any,
  date: any, 
  launch_site_text: string, 
  launch_site_link: any,
  launch_site_background: any, 
  launch_site_text1: any, 
  meta: {
    description: string
    title: string
    image: string
  }
  header: {
    backgroundColor: string | null
    title: any
    description: React.FC
    services: React.FC
    auxItem: {
      videoUrl: string | void
      imageUrl: string | void
      width: number | void
      position: string
    }
    background: {
      videoUrl: string | void
      imageUrl: string | void
      mobileImage: string | void
    }
  }
}

/**
 *  Component
 */

export const CsContext = React.createContext<IContextProps | null>(null)

const CaseStudy: React.FC<IProps> = ({
  doc,
  next,
  initCsChange,
  openingFromHome,
  initHomeOpen,
  csTransitioning,
}) => {

  const [ready, setReady] = useState(false)

  const customStyle = {
    textColor: doc.data.text_color,
    background: doc.data.background_color,
  }

  const alt = `${doc.data.title} - This Design - Portland OR`
  const { csState } = useContext(LayoutContext)
  const isHome = !csState.caseStudySelected

  return (
    <CsContext.Provider
      value={{
        ..._getContextProps(doc.data),
        svg: doc.data.svg,
        credits: doc.data.credits,
        tags: doc.data.tags,
        date: doc.data.date,
        launch_site_text: doc.data.launch_site_text,
        launch_site_link: doc.data.launch_site_link,
        launch_site_background: doc.data.launch_site_background, 
        launch_site_text1: doc.data.launch_site_text1, 
        openingFromHome,
        isHome,
        next,
        alt,
        csTransitioning,
      }}
    >
      <HeadMeta />
      <Waypoint onEnter={() => setReady(true)}>
      
      <Posed.CaseStudy
        className={`casestudy casestudy_animation ${isHome ? 'from-home' : ''} ${ready ? 'active' :''}`}
        onClick={isHome ? initHomeOpen : null}
        pose={getPose({
          next,
          isHome,
          openingFromHome,
          csTransitioning,
        })}
        isShim={next || isHome}
        {...{
          next,
          openingFromHome,
          isHome,
        }}
      >
        <Styled.Inner {...customStyle}>
          <Partials.Cover />
          <Partials.Body {...{ next, isHome, doc }} />
        </Styled.Inner>
        <Partials.Shim {...{ initCsChange, isHome }} />
      </Posed.CaseStudy>
      
      </Waypoint>
    </CsContext.Provider>
  )
}

const lineBreak = /(\r\n|\n|\r)/gm
const sanitize = (str: string) => str.replace(lineBreak, ' ')

const HeadMeta = () => {
  const context = useContext(CsContext)
  const { isHome, next, meta } = context
  const { currentUid } = useContext(LayoutContext).csState

  if (!isHome && !next) {
    return (
      !isHome &&
      !next && (
        <Head
          description={sanitize(meta.description)}
          title={sanitize(meta.title)}
          path={`/work/${currentUid}`}
          image={meta.image}
        />
      )
    )
  }
  return null
}

export default React.memo(CaseStudy)
