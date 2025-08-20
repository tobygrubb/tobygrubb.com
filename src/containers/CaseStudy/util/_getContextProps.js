import PropTypes from 'prop-types'
import { RichText } from 'prismic-reactjs'

const _getContextProps = (data) => {
  const {
    title,
    copy,
    services,
    image2,
    image1,
    video2,
    video1,
    floating_media_width: auxWidth,
    mobileImage,
    layout2,
  } = data.header[0]

  const meta = {
    title: RichText.asText(title),
    description: RichText.asText(copy),
    image: data.thumbnail.url,
  }

  const header = {
    backgroundColor: data.color,
    title: RichText.asText(title),
    description: RichText.render(copy),
    services: RichText.render(services),
    auxItem: {
      videoUrl: video2.url,
      imageUrl: image2.url,
      width: auxWidth,
      position: layout2,
    },
    background: {
      videoUrl: video1.url,
      imageUrl: image1.url,
      mobileImage: mobileImage.url,
    },
  }
  const dark = data.preserve_white_nav === 'true'

  return { ...{ header, dark, meta } }
}

export const _contextPropTypes = {
  value: PropTypes.shape({
    header: PropTypes.shape({
      backgroundColor: PropTypes.string.isRequired,
      title: PropTypes.element.isRequired,
      description: PropTypes.element.isRequired,
      services: PropTypes.element.isRequired,
      auxItem: PropTypes.shape({
        videoUrl: PropTypes.string,
        imageUrl: PropTypes.string,
        width: PropTypes.number,
        position: PropTypes.string,
      }).isRequired,
      background: PropTypes.objectOf(PropTypes.string),
    }).isRequired,
    dark: PropTypes.bool.isRequired,
  }),
}
export default _getContextProps
