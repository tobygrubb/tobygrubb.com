import React from 'react'
import Diptych from './Diptych'

Diptych.Wrapper = props => {
  const api = props.data.value
    ? props.data.value[0] // v1 structure
    : props.data.primary // v2 structure

  const images = [
    {
      src: api.image1.url,
      offset: api.offset1,
    },
    {
      src: api.image2.url,
      offset: api.offset2,
    },
  ]

  return <Diptych images={images} {...props} />
}

export default Diptych
