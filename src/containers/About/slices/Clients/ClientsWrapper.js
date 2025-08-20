import React from 'react'
import { RichText } from 'prismic-reactjs'
import Clients from './Clients'

Clients.Wrapper = ({ data }) => {
  const imageUrls = data.items.map(img => img.image.url)
  const title = RichText.asText(data.primary.title1)
  return <Clients title={title} imageUrls={imageUrls} />
}

export default Clients
