import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import isMobile from 'util/isMobile'
import { ApiDataCtx } from 'containers/App/App'
import { Homepage } from './Homepage'

function HomepageWrapper({ openingFromHome }) {
  const { siteInfo } = useContext(ApiDataCtx)

  const urls = siteInfo[isMobile() ? 'video_group_mobile' : 'video_group'].map(
    vid => vid.link.url
  )
  const randomUrl = urls[Math.floor(Math.random() * urls.length)]

  const reelEnabled = siteInfo.reel_enabled === 'True'
  const reelUrl = siteInfo.studio_reel.url

  return (
    <Homepage
      {...{
        reelEnabled,
        reelUrl,
        randomUrl,
        openingFromHome,
      }}
    />
  )
}

HomepageWrapper.propTypes = {
  openingFromHome: PropTypes.bool.isRequired,
}
export default HomepageWrapper
