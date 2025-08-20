import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import WebsiteFrame from 'components/WebsiteFrame/WebsiteFrame'
import WaypointVideo from 'components/WaypointVideo/WaypointVideo'
import { CsContext } from 'containers/CaseStudy/CaseStudy'
import Styled from './blocks'

const Website = ({
  layout,
  background,
  frameColor,
  dotColor,
  src,
  videoUrl,
}) => {
  const { alt } = useContext(CsContext)
  return (
    <Styled.Website {...{ background }}>
      <Styled.WebsiteInner {...{ layout }}>
        <WebsiteFrame {...{ frameColor, dotColor }}>
          {videoUrl ? (
            <WaypointVideo url={videoUrl} />
          ) : (
            <Styled.Img src={src} alt={alt} />
          )}
        </WebsiteFrame>
      </Styled.WebsiteInner>
    </Styled.Website>
  )
}

Website.defaultProps = {
  background: null,
  src: null,
  layout: null,
  videoUrl: null,
  frameColor: undefined,
  dotColor: undefined,
}

Website.propTypes = {
  videoUrl: PropTypes.string,
  background: PropTypes.string,
  src: PropTypes.string,
  layout: PropTypes.string,
  frameColor: PropTypes.string,
  dotColor: PropTypes.string,
}

export default React.memo(Website)
