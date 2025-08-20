import React from 'react'
import { RichText } from 'prismic-reactjs'
import WaypointAnim from 'components/WaypointAnim/WaypointAnim'
import Text from './Text/Text'
import Gallery from './Gallery/GalleryWrapper'
import Columns from './Columns/ColumnsWrapper'
import Image from './Image/ImageWrapper'
import Video from './Video/Video'
import Pullquote from './Pullquote/Pullquote'
import Website from './Website/WebsiteWrapper'
import Diptych from './Diptych/DiptychWrapper'
import PanningGallery from './PanningGallery/PanningGallery'
import YouTube from './YouTube'
import Iframe from './Iframe/Iframe'

const Slice = ({ children, type, spacing }) => (
  <WaypointAnim
    disabled={type === 'columns'}
    className={`casestudy__block casestudy__block--${type} -${spacing}`}
  >
    {children}
  </WaypointAnim>
)

const Slices = ({ sliceData, title }) => {
  const slices = sliceData.map((data) => {
    const atts = { data, title }
    let spacing = undefined
    switch (data.slice_type) {
      case 'text':
        return (
          <Text
            spacing="medium"
            value={RichText.render(data.value)}
            type="text"
          />
        )
      case 'text_v2':
        spacing = data?.primary?.spacing
        return (
          <Text
            {...atts}
            spacing={spacing}
            value={RichText.render(data.primary.text)}
            type="text"
          />
        )
      case 'columns':
      case 'columns-v2':
        spacing = data?.primary?.spacing
        return <Columns.Wrapper {...atts} spacing={spacing} type="columns" />
      case 'image':
      case 'image-v2':
        spacing = data?.primary?.spacing
        return <Image.Wrapper spacing={spacing} {...atts} type="image" />
      case 'diptych':
      case 'diptych-v2':
        spacing = data?.primary?.spacing
        return <Diptych.Wrapper spacing={spacing} {...atts} type="diptych" />
      case 'video':
        spacing = data.value[0] ? data.value[0].spacing : undefined
        return <Video {...atts} spacing={spacing} type="video" />
      case 'panning_gallery':
        spacing = data?.primary?.spacing
        return (
          <PanningGallery {...atts} spacing={spacing} type="panning-gallery" />
        )
      case 'gallery':
      case 'gallery-v2':
        spacing = data?.primary?.spacing
        return <Gallery.Wrapper {...atts} spacing={spacing} type="gallery" />
      case 'pullquote':
        spacing = data?.primary?.spacing
        return <Pullquote {...atts} spacing={spacing} type="pullquote" />
      case 'website':
        spacing = data?.primary?.spacing
        return <Website.Wrapper spacing={spacing} {...atts} />
      case 'iframe':
        spacing = data?.primary?.spacing
        return <Iframe.Wrapper spacing={spacing} {...atts} />
      case 'youtube_embed':
        spacing = data?.primary?.spacing
        return <YouTube.Wrapper spacing={spacing} {...atts} type="youtube" />
      case 'mobile':
        console.error('Mobile is depricated, please use columns')
        return <></>
      default:
        console.error('nothing built for', data.slice_type) //eslint-disable-line
        return <div type="notFound" />
    }
  })

  return slices.map((slice, i) => {
    return (
      <Slice
        type={slice.props.type}
        spacing={slice.props.spacing}
        key={`${slice.props.type}${i}`}
      >
        {slice}
      </Slice>
    )
  })
}

export default React.memo(Slices)
