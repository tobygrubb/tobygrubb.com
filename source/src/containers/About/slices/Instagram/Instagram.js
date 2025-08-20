import React, { useEffect } from 'react'
import { RichText } from 'prismic-reactjs'

import useFetch from 'util/useFetch'
import api from './api'
import './Instagram.scss'

function Instagram({ data }) {
  const { title, behold_id } = data.value[0]

  useEffect(() => {
    window.beholdWidgets.initialize()
  }, [])

  return (
    <div className="instagram__section">
      {RichText.render(title)}
      <figure data-behold-id={behold_id}></figure>
    </div>
  )
}

export default React.memo(Instagram)
