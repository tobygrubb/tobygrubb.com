import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'styled-components/macro'
import WebsiteFrame from 'components/WebsiteFrame/WebsiteFrame'
import MobileFrame from 'components/MobileFrame/MobileFrame'
import WaypointVideo from 'components/WaypointVideo/WaypointVideo'
import { CsContext } from 'containers/CaseStudy/CaseStudy'
import Styled from './styled'

const Columns = ({
  size,
  isRight,
  videoUrl,
  imageUrl,
  hasMute,
  text,
  layout,
  shadowOpacity,
}) => {
  const { alt } = useContext(CsContext)
  const columnItems = [
    <Styled.Media speed={-90} key="media">
      <MediaWrapper layout={layout} shadowOpacity={shadowOpacity}>
        {videoUrl ? (
          <WaypointVideo muteToggle={hasMute} url={videoUrl} poster={imageUrl}/>
        ) : (
          <img src={imageUrl} alt={alt} />
        )}
      </MediaWrapper>
    </Styled.Media>,
    <Styled.Text key="text">{text}</Styled.Text>,
  ]

  return (
    <ThemeProvider theme={{ size }}>
      <Styled.Columns>
        {isRight ? columnItems.reverse() : columnItems}
      </Styled.Columns>
    </ThemeProvider>
  )
}

const MediaWrapper = ({ children, layout, shadowOpacity }) => {
  switch (layout) {
    case '-website':
      return <WebsiteFrame>{children}</WebsiteFrame>
    case '-mobile':
      return <MobileFrame shadowOpacity={shadowOpacity}>{children}</MobileFrame>
    default:
      return children
  }
}

Columns.defaultProps = {
  isRight: false,
  size: null,
  text: <p />,
  hasMute: false,
  videoUrl: undefined,
  imageUrl: undefined,
  layout: undefined,
}

Columns.propTypes = {
  text: PropTypes.node,
  isRight: PropTypes.bool,
  size: PropTypes.string,
  hasMute: PropTypes.bool,
  videoUrl: PropTypes.string,
  imageUrl: PropTypes.string,
  layout: PropTypes.string,
}

export default React.memo(Columns)
