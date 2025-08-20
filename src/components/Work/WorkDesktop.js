import React, { useContext, useEffect, useRef, useState } from 'react'
import ViewportApp from 'lib/ViewportApp'
import { ApiDataCtx } from 'containers/App/App'
import emmiter from 'tiny-emitter/instance'
import Loading from 'components/Loading/Loading'
import { withRouter } from 'react-router-dom'

function WorkDesktop(props) {
  const { setShowModal, projectLaunchStatus, history, location } = props

  const [showLoader, setShowLoader] = useState(true)

  useEffect(() => {
    if (location.pathname === '/') {
      emmiter.emit('overlay:hide')
      emmiter.emit('cards:show')
    }
  }, [location])

  useEffect(() => {
    emmiter.on('video:click', function (video, position) {
      setShowModal(true)
    })

    emmiter.on('route:update', function ({ uid }) {
      history.push(`/work/${uid}`)
    })
  }, [])

  const { contextCaseStudies, home } = useContext(ApiDataCtx)
  const preloadImages = contextCaseStudies.map((casestudy) => {
    return casestudy.data.header[0].image1.url
  })

  const el = useRef()
  useEffect(() => {
    if (!ViewportApp.isInited() && location.pathname === '/') {
      const app = ViewportApp.init()
      el.current.appendChild(app.view)
      ViewportApp.preload(preloadImages).then(() => {
        setShowLoader(false)
        ViewportApp.create(contextCaseStudies, home)
        ViewportApp.start()
      })
    }
  }, [el, location])

  return (
    <div>
      {showLoader && location.pahtname === '/' && <Loading hasBg={false} />}
      <div ref={(r) => (el.current = r)}></div>
    </div>
  )
}

export default withRouter(WorkDesktop)
